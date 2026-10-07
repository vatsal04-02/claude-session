# Deploying FlowHQ to your Hostinger domain

## What this website is (read this first)

FlowHQ is a **static website**. Running `npm run build` turns it into a folder called `out/` that holds plain files: HTML, CSS, JavaScript and images.

- **No server code:** it has no backend, no database and no login.
- **The "Get My Free Audit" form** sends straight from the visitor's browser to your **Google Sheet** (through a Google Apps Script URL).
- **WhatsApp buttons** are ordinary `wa.me` links.

**So it can be hosted directly on any Hostinger web hosting plan.** You upload the files and you're done. You do **not** need Node.js hosting, a VPS, a separate backend or a database.

```
yourdomain.com  (DNS at Hostinger)
      ↓
Hostinger web hosting: the files from out/ in public_html  (HTTPS via Hostinger's free SSL)
      ↓  (visitor's browser only)
Google Apps Script → Google Sheet       ← audit form submissions
wa.me                                  ← WhatsApp chat links
```

You build the site on your computer and upload the result. Hostinger never runs `npm`.

---

## STEP 1 — What to buy/configure on Hostinger

1. Buy any **Web Hosting** plan, **Premium or higher**. Any plan that lets you use your own domain is enough; static sites need nothing special.
2. Buy or connect your domain, e.g. `yourdomain.com`. The free domain that comes with a yearly plan is fine.
3. In **hPanel**, add the website: **Websites → Add website**, choose your domain, and pick **"Empty website"** or **"Skip, I'll create an empty website"**. **Don't install WordPress or the Website Builder.**

On your own computer, install **Node.js 20 or newer** (22 LTS recommended) from https://nodejs.org. Check it in a terminal:

```bash
node -v      # should print v20.x or higher
```

---

## STEP 2 — How to connect the domain to the hosting

- **Domain bought at Hostinger:** it's connected automatically when you add the website. Skip to Step 3.
- **Domain bought elsewhere** (GoDaddy, Namecheap, …): at your registrar, change the **nameservers** to the two that hPanel shows you under **Websites → your site → Dashboard → "Domain" / DNS information**. They're usually:
  ```
  ns1.dns-parking.com
  ns2.dns-parking.com
  ```
  Use exactly what hPanel tells you.

**Make sure `www` works too.** In hPanel go to **Domains → yourdomain.com → DNS / Nameservers → DNS records**. There should be a `CNAME` record named `www` pointing to `yourdomain.com`. If it's missing, add it:

| Type  | Name | Points to        | TTL  |
|-------|------|------------------|------|
| CNAME | www  | yourdomain.com   | 3600 |

DNS changes can take from a few minutes up to 24 hours to work everywhere.

---

## STEP 3 — How to upload/deploy this project

**3a. Get the code onto your computer** (only the first time):

```bash
git clone https://github.com/vatsal04-02/claude-session.git flowhq
cd flowhq
git checkout claude/stoic-meitner-1n3ux3     # or whichever branch you deploy from
npm ci
```

**3b. Tell the build your domain.** Create a file called **`.env.production`** in the project folder, next to `package.json`, containing one line:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Use `https://`, **no `www.`** and **no slash at the end**. This file is already ignored by git.

**3c. Build:**

```bash
npm run build
```

This creates the `out/` folder. If you skipped 3b, the build stops with a message telling you to set `NEXT_PUBLIC_SITE_URL`. That's on purpose, so a site with the wrong domain never goes live.

**3d. Optional: preview the real build locally:**

```bash
npm run preview          # then open http://localhost:3000
```

**3e. Zip the *contents* of `out/`.** The zip must include the hidden `.htaccess` file.

- **macOS / Linux**
  ```bash
  cd out && zip -r ../site.zip . && cd ..
  ```
- **Windows (PowerShell or Command Prompt, in the project folder)**
  ```bash
  tar -a -cf site.zip -C out .
  ```

Don't right-click → "Compress" in Finder or Explorer. That can leave out `.htaccess` or put everything inside an extra `out/` folder.

**3f. Upload:**

1. Go to hPanel → **Websites → your site → File Manager**, and open **`public_html`**.
2. Delete what's already there (for example `default.php`). If an old version of this site is there, delete it too.
3. Click **Upload**, choose `site.zip`, then right-click it → **Extract**. Extract **into `public_html` itself**, not into a subfolder.
4. Delete `site.zip` afterwards.
5. Turn on **"Show hidden files"** (in File Manager settings) and confirm `public_html` now directly contains:
   ```
   .htaccess   404.html   index.html   _next/   icon.svg   og-image.png   robots.txt   sitemap.xml   …
   ```

**Updating the site later:** pull or edit the code, run `npm run build`, zip and upload again (repeat 3c–3f).

---

## STEP 4 — Which environment variables I need to add

Only **one**, and it's used **at build time on your computer**, not in hPanel:

| Variable               | Required | Example                  | What it's for |
|------------------------|----------|--------------------------|---------------|
| `NEXT_PUBLIC_SITE_URL` | Yes, for `npm run build` | `https://yourdomain.com` | Canonical URL, social-share tags, `sitemap.xml` and `robots.txt` |

- Put it in `.env.production` (Step 3b). `.env.example` in the project shows the format.
- `npm run dev` needs nothing; it uses `http://localhost:3000` automatically.
- If you ever change domain, change this value, **rebuild and re-upload**.
- Hostinger has **no environment variables to set**, because static files don't read any.

**Not needed for this project:** `NEXT_PUBLIC_API_URL`, `AUTH_SECRET`, `DATABASE_URL`. There's no API server, no login and no database.

Two other settings live in code, not in environment variables, because they're public anyway (every visitor's browser can see them):

- **WhatsApp number:** `lib/whatsapp.ts` → `WHATSAPP_NUMBER`. ⚠️ **It's marked as a wrong number. Replace it before launch**, then rebuild.
- **Google Sheet form URL:** `lib/site.ts` → `GOOGLE_SHEET_URL`.

---

## STEP 5 — How to configure authentication

**Nothing to do.** The site has no accounts, no login and no admin area. It's a public marketing page, so it doesn't need any. There are no login redirects or callback URLs to configure.

If you add a members area or dashboard one day, that will need a server (Hostinger's Node.js hosting, or a service like Vercel) and an auth provider. That's a separate project step.

---

## STEP 6 — How to configure database/backend if required

There's **no database or backend to deploy.** The only "backend" is your Google Apps Script, which saves form submissions to your Google Sheet. It already works from any domain, and there's no CORS setting to change.

- Setup and the recommended script: `docs/google-sheets-setup.md`.
- **Recommended once:** paste the updated script from that file (it rejects junk submissions). Then go to **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. This keeps the **same URL**.
- Don't use "New deployment". That creates a new URL, and the website would keep sending to the old one.

---

## STEP 7 — How to enable HTTPS/SSL

1. In hPanel go to **Websites → your site → Security → SSL**. It may also be listed as **SSL** in the sidebar.
2. Install the **free SSL (Let's Encrypt)** for `yourdomain.com`, including `www`. It usually takes 5–30 minutes after DNS is working.
3. Wait until the status says **Active**.

You don't need to turn on Hostinger's "Force HTTPS" toggle. The site's `.htaccess` already does all of this:

- sends `http://` to `https://`
- sends `www.yourdomain.com` to `yourdomain.com`, in a single redirect
- shows the custom 404 page for unknown URLs
- adds security headers and HSTS (browsers will remember to always use HTTPS)
- sets long caching for build files

⚠️ Get SSL **Active before** uploading (or before testing). Otherwise the HTTPS redirect sends visitors to a page that can't load yet.

**Prefer `www.yourdomain.com` as the main address?** Set `NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com` and swap rule 1 in `public/.htaccess` as explained in its comment. Then rebuild and re-upload.

---

## STEP 8 — How to test the production website

Open these in a browser. A private/incognito window avoids old cache.

| Check | Expected |
|---|---|
| `http://yourdomain.com` | Ends on `https://yourdomain.com/` with a padlock |
| `https://www.yourdomain.com` | Ends on `https://yourdomain.com/` |
| `https://yourdomain.com/#faq`, then press refresh | Page reloads at the FAQ, no error |
| `https://yourdomain.com/anything-made-up` | Branded "Page not found." page |
| `https://yourdomain.com/robots.txt` and `/sitemap.xml` | Text/XML showing **your** domain |
| Submit the audit form with your own details | "Thanks! We'll reach out soon." and a new row in your Google Sheet |
| Tap the WhatsApp bubble | WhatsApp opens with "Hi FlowHQ, I want the free audit." to **your** number |
| Open the site on your phone | Everything fits, no sideways scrolling |
| Paste your URL into https://www.opengraph.xyz | Preview card with the FlowHQ image and title |

Or from a terminal:

```bash
curl -sI http://yourdomain.com      | grep -i location     # → https://yourdomain.com/
curl -sI https://www.yourdomain.com | grep -i location     # → https://yourdomain.com/
curl -sI https://yourdomain.com     | grep -iE "HTTP/|strict-transport"
```

**Optional:** add the site to **Google Search Console** (https://search.google.com/search-console) and submit `https://yourdomain.com/sitemap.xml`.

---

## STEP 9 — Common errors and exactly how to fix them

| What you see | Cause | Fix |
|---|---|---|
| Build stops: **"NEXT_PUBLIC_SITE_URL is not set"** | Step 3b was skipped | Create `.env.production` with `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`, then run `npm run build` again |
| `npm run build` fails on install or "Unsupported engine" | Node.js too old | Install Node 20+ (Step 1), then run `npm ci` again |
| Hostinger default/"parked" page or **403 Forbidden** | Files are in the wrong place: inside `public_html/out/` or a subfolder, or `index.html` is missing | Make sure `index.html`, `_next/` and `.htaccess` sit **directly** in `public_html`. Delete `default.php` |
| Page loads but has **no styling**, just plain text | The `_next/` folder wasn't uploaded | Re-zip with the command in 3e and upload again |
| **ERR_TOO_MANY_REDIRECTS** | Usually Cloudflare set to "Flexible" SSL, or two "force HTTPS" rules fighting | If you use Cloudflare, set SSL/TLS mode to **Full**. Also turn off any extra HTTPS-redirect toggle in hPanel |
| "Your connection is not private" | SSL not issued yet, or DNS still propagating | Wait, then check **Security → SSL** shows Active for both `yourdomain.com` and `www` (Step 7) |
| `www.yourdomain.com` doesn't open | No `www` DNS record | Add the `CNAME www → yourdomain.com` record (Step 2) |
| Old version still showing after an update | Browser or LiteSpeed cache | Hard refresh (Ctrl/Cmd + Shift + R). In hPanel, **Clear/Purge cache** (Advanced → Cache Manager) |
| Unknown URLs show Hostinger's own 404, not FlowHQ's | `.htaccess` missing (hidden files are easy to lose) | Turn on "Show hidden files". If `.htaccess` is missing, re-zip with the 3e command and upload again |
| Form shows **"Something went wrong — please reach us on WhatsApp instead."** | Apps Script isn't reachable or is rejecting the post | Open the `GOOGLE_SHEET_URL` from `lib/site.ts` in a browser. It should say `FlowHQ lead webhook is running`. If not: in Apps Script, check the deployment has **Who has access: Anyone**, then use **Manage deployments → Edit → New version**. A URL that changed must be pasted into `lib/site.ts`, then rebuild and upload |
| Form says "Thanks" but no row appears | Script writes to another sheet, or the sheet tab was renamed | Check `SHEET_NAME` in the script matches your tab name (default `Sheet1`) |
| WhatsApp opens the wrong person | The number placeholder in `lib/whatsapp.ts` | Set `WHATSAPP_NUMBER` (country code + number, digits only, e.g. `91XXXXXXXXXX`), then rebuild and upload |
| Facebook/WhatsApp share shows an old preview | Their preview cache | Re-scrape at https://developers.facebook.com/tools/debug/ (WhatsApp uses the same cache) |
