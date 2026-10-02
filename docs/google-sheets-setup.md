# Google Sheets lead capture

Flow: **Demo form → `POST /api/demo-lead` → Google Apps Script Web App → Google Sheet** (one row per lead).
The browser never talks to Google; only the server route does.

## 1. Create the sheet
Create a Google Sheet (any name). On the first tab, put these headers in row 1, columns A–J:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Business Name | Phone / WhatsApp | Email | Requirement | Preferred Date | Preferred Time | Source | Status |

## 2. Add the webhook
Open **Extensions → Apps Script**, replace the contents of `Code.gs` with:

```js
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var d = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // stop values such as "=SUM(...)" being treated as formulas
    var safe = function (v) {
      v = v == null ? "" : String(v);
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    };

    sheet.appendRow([
      d.submittedAt || new Date().toISOString(), // Timestamp
      safe(d.name),                              // Name
      safe(d.businessName),                      // Business Name
      "",                                        // Phone (set as text below)
      safe(d.email),                             // Email
      safe(d.requirement),                       // Requirement
      safe(d.preferredDate),                     // Preferred Date
      safe(d.preferredTime),                     // Preferred Time
      safe(d.source),                            // Source
      "New"                                      // Status
    ]);
    // keep "+91…" as text instead of letting Sheets turn it into a number
    sheet.getRange(sheet.getLastRow(), 4).setNumberFormat("@").setValue(String(d.phone || ""));

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## 3. Deploy as a Web App
1. **Deploy → New deployment → type: Web app**
2. *Execute as:* **Me**
3. *Who has access:* **Anyone**
4. **Deploy**, authorize when asked, and copy the **Web app URL** (ends in `/exec`).

After changing the script later, use **Deploy → Manage deployments → Edit → New version** (the URL stays the same).

## 4. Connect the site
Create `.env.local` (never committed) next to `package.json`:

```
DEMO_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

Restart the dev server (`npm run dev`) or redeploy. On Vercel/Netlify, add `DEMO_WEBHOOK_URL` in the project's environment variables.

## Notes
- If `DEMO_WEBHOOK_URL` is missing or the script fails, the form shows an error with a WhatsApp fallback. It never shows success without a saved row.
- The server stamps `submittedAt` (UTC ISO) and sets `source = "FlowHQ Website"`; the script sets `Status = "New"`.
- Treat the Web app URL as a secret: anyone who has it can add rows.
