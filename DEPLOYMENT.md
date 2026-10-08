# Deploying Flow HQ

Two supported hosts — pick one:

- **Vercel (recommended)** — connect the GitHub repo; every push deploys. See **Option A** below.
- **Hostinger (or any static host)** — build locally and upload `out/`. See **Option B** (the rest of this file).

Either way the site is a static export (`output: "export"` in `next.config.ts`): no server, no database, no secrets.

---

## Option A — Vercel + flowhq.co.in (domain registered at GoDaddy)

The domain stays registered at GoDaddy, and GoDaddy keeps handling its DNS (so email records, if you add any
later, stay there too). We only point two records at Vercel. The site's canonical address is the bare domain
**https://flowhq.co.in**; `www.flowhq.co.in` redirects to it.

### A1. Vercel project

1. **Import the repo.** vercel.com → Add New → Project → import `vatsal04-02/claude-session`.
   Framework preset **Next.js** (auto-detected); leave Build Command and Output Directory at their defaults.
   The repo's default branch (`claude/stoic-meitner-1n3ux3`) becomes the **production branch** — every push
   to it deploys flowhq.co.in. Node.js 20.x or newer (`engines` in package.json says `>=20.9.0`).
2. **Environment variable.** Project → Settings → Environment Variables → add
   `NEXT_PUBLIC_SITE_URL` = `https://flowhq.co.in` (no trailing slash), environment **Production only**.
   Don't add it to Preview: preview deployments are automatically `noindex` with a disallow-all robots.txt.
   (Even without it, production builds use https://flowhq.co.in, never the `*.vercel.app` hostname, and
   `npm run build` fails if any `*.vercel.app` URL reaches the sitemap, robots.txt or the pages.)
3. **Add the domains.** Project → Settings → Domains → add `flowhq.co.in`. When Vercel offers to add
   `www.flowhq.co.in` too, accept and choose **redirect www.flowhq.co.in → flowhq.co.in** (308).
   Vercel now shows each domain as "Invalid Configuration" with the exact records it wants — keep this tab open.

### A2. GoDaddy DNS

4. **Open DNS.** godaddy.com → sign in → **Domain Portfolio** (My Products → Domains) → `flowhq.co.in` →
   **DNS** → DNS Records. Take a screenshot of the existing records first.
   If the records are read-only, the domain is using other nameservers: under **Nameservers** choose
   **GoDaddy's default nameservers**, then continue.
5. **Turn off anything that overrides DNS:** Domain Portfolio → flowhq.co.in → **Forwarding** (remove any
   domain forwarding) and disconnect any GoDaddy Website Builder / parked page.
6. **Apex record (flowhq.co.in).** Edit the existing `A` record with Name `@` (often "Parked") so it points to
   the IP Vercel shows for flowhq.co.in — usually `76.76.21.21`, sometimes `216.198.79.1`; **use the value on
   your Vercel domain card**. TTL: 600 seconds (or the lowest offered). Delete any *other* `A` records and any
   `AAAA` records whose Name is `@`.
7. **www record.** Edit the existing `CNAME` with Name `www` (GoDaddy's default points it to `@`) so its value is
   the target Vercel shows for www.flowhq.co.in — a project-specific alias like `xxxxxxxx.vercel-dns-017.com`
   (older projects show `cname.vercel-dns.com`). There must be only one record named `www`.
8. **Only if Vercel asks for it:** add the `TXT` record it shows (Name `_vercel`, value `vc-domain-verify=…`).
   This happens when the domain was used in another Vercel account. If a `CAA` record exists for `@`, it must
   allow `letsencrypt.org`.
9. **Leave everything else alone:** `NS`, `SOA`, `MX`, the `_domainconnect` CNAME and any `TXT` records.

| Type | Name | Value (copy from Vercel) | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` *(or the IP your Vercel card shows)* | 600 |
| CNAME | `www` | `xxxxxxxx.vercel-dns-017.com` *(project-specific)* | 600 |

### A3. Go live and check

10. **Verify.** Back in Vercel → Domains → **Refresh**. Usually "Valid Configuration" within minutes; DNS can take
    up to 24–48 h to reach every network. Vercel then issues the HTTPS certificates automatically.
11. **Redeploy** the latest production deployment (Deployments → ⋯ → Redeploy) so it's built with
    `NEXT_PUBLIC_SITE_URL`.
12. **Check:** `https://flowhq.co.in` loads with a padlock; `https://www.flowhq.co.in` and
    `http://flowhq.co.in` redirect to it; `https://flowhq.co.in/robots.txt` says `Allow: /` and
    `Sitemap: https://flowhq.co.in/sitemap.xml`; the sitemap lists ~25 URLs on flowhq.co.in; the homepage source has
    `<link rel="canonical" href="https://flowhq.co.in/"/>`. Or run all of it at once: `npm run seo:check`
    (it checks https://flowhq.co.in by default).
13. **Search Console** — add a **Domain** property for `flowhq.co.in`; verify with the `TXT` record Google gives you
    (Type TXT, Name `@`, at GoDaddy — or use the one-click GoDaddy option if Google offers it), then submit
    `sitemap.xml`. Full steps: [SEO_LAUNCH_CHECKLIST.md](SEO_LAUNCH_CHECKLIST.md).

Also enable **Analytics** in the Vercel project (Web Analytics). `vercel.json` already sets security headers,
asset caching, trailing slashes and the `/workflow-automation/` → `/ai-workflow-automation/` redirect.

**Alternative:** you can instead switch GoDaddy's nameservers to Vercel (`ns1.vercel-dns.com`,
`ns2.vercel-dns.com`) and manage all DNS in Vercel — but then every other record (email, verification TXT)
has to be recreated in Vercel first. The two-record setup above is simpler.

---

## Option B — Hostinger (static upload)

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

This creates the `out/` folder. If you skipped 3b, the build uses `https://flowhq.co.in` — so for any other domain, set `NEXT_PUBLIC_SITE_URL` first.

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
| `NEXT_PUBLIC_SITE_URL` | Only if the domain isn't `flowhq.co.in` | `https://yourdomain.com` | Canonical URL, social-share tags, `sitemap.xml` and `robots.txt` |

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

---

## Adding the founders video (when it's ready)

The founder section already has a 16:9 slot for it. Until the video exists, the slot shows "Founders video · coming soon".

1. Export the video as **MP4 (H.264 video + AAC audio)**. Phones and every major browser play that. Keep it under ~20 MB if you can.
2. Save it as **`public/founders.mp4`**.
3. In `components/Founder.tsx`, change `ready: false` to **`ready: true`** (the line `const FOUNDERS_VIDEO = { src: "/founders.mp4", ready: false };`).
4. Rebuild and upload (Step 3: `npm run build`, zip `out/`, upload).

It plays only when clicked, with sound, and doesn't loop.
