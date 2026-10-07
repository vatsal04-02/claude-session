# Google Sheets lead capture

The "Get My Free Audit" form posts JSON straight to a Google Apps Script Web app, which appends one row per submission.
The Web app URL lives in `lib/site.ts` as `GOOGLE_SHEET_URL`.

Sheet headers (row 1, A–F): `Timestamp | Name | Phone | Business Type | Message | Source`

Posted body: `{ name, phone, businessType, message, source: "FlowHQ website" }` (sent as `text/plain` to avoid a CORS preflight).
`message` is the free-text message from the audit form.

## Apps Script (Extensions → Apps Script)

```js
const SHEET_NAME = "Sheet1";

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse(e.postData.contents);
    // server-side check: the browser validates too, but anyone can post to this URL directly
    const digits = String(data.phone || "").replace(/\D/g, "");
    if (!String(data.name || "").trim() || digits.length < 8 || digits.length > 15) {
      return json({ ok: false, error: "invalid" });
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    const safe = (v) => {
      v = v == null ? "" : String(v).slice(0, 2000);
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    };
    sheet.appendRow([new Date(), safe(data.name), "", safe(data.businessType), safe(data.message), safe(data.source)]);
    sheet.getRange(sheet.getLastRow(), 3).setNumberFormat("@").setValue(String(data.phone || ""));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return json({ ok: true, status: "FlowHQ lead webhook is running" }); }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
```

Deploy → New deployment → Web app → Execute as **Me** → Who has access **Anyone**. After editing the script use
Deploy → Manage deployments → Edit → New version (the URL stays the same).

The Web app URL is visible in the site's JavaScript (that is unavoidable for a browser form), so treat the sheet as
publicly writable. The script above rejects rows without a name and a real-looking phone number, and the website adds an
invisible honeypot field so simple bots never send anything. It is not a secret and needs no environment variable.

If you change the script, the live site keeps working only if the URL stays the same: always use
Deploy → Manage deployments → Edit (pencil) → Version: **New version** → Deploy. Creating a *new deployment* gives a new
URL, which you would then have to paste into `lib/site.ts` (`GOOGLE_SHEET_URL`) and rebuild.
