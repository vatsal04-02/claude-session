# Flow HQ — SEO launch checklist

Positioning everywhere: **custom AI + automation systems that put businesses on autopilot** — less manual work,
connected systems, automated operations, more capacity for growth. Not a booking, CRM-only, chatbot, lead-gen or
web-design agency.

Nothing here guarantees rankings. The plan is: clean technical SEO + genuinely useful commercial pages + original
guides + internal linking + real-world backlinks + fast, accessible pages — then iterate on Search Console data.

---

## 1. Keyword → page map

One primary intent per page. Don't add pages that compete with these.

| Page | Primary intent | Secondary terms |
|---|---|---|
| `/` | custom AI automation systems, AI automation agency | business automation, put business on autopilot |
| `/ai-automation/` | AI automation agency / services | custom AI automation, AI agents for business |
| `/business-process-automation/` | business process automation | business operations automation, process automation services |
| `/ai-workflow-automation/` | AI workflow automation | workflow automation, n8n automation agency |
| `/crm-automation/` | CRM automation | HubSpot / Zoho automation, keep CRM updated |
| `/lead-automation/` | lead automation | automated lead follow-up, lead response automation |
| `/ai-receptionist/` | AI receptionist | 24/7 enquiry assistant, WhatsApp AI receptionist |
| `/whatsapp-automation/` | WhatsApp automation | WhatsApp Business API automation |
| `/industries/healthcare/` | clinic automation | clinic front-desk automation |
| `/industries/real-estate/` | real estate automation | real estate lead follow-up |
| `/industries/home-services/` | home services automation | missed-call text-back, job scheduling automation |
| `/industries/professional-services/` | professional services automation | client onboarding automation |
| `/resources/business-process-automation-guide/` | what is business process automation | BPA guide |
| `/resources/ai-automation-for-small-businesses/` | AI automation for small businesses | AI for small business |
| Supporting articles (9) | question-style long-tail queries | each links to its pillar + a commercial page |

Old URL `/workflow-automation/` permanently redirects to `/ai-workflow-automation/` (vercel.json and .htaccess).

**Content rules:** no invented clients, reviews, ratings, results, prices or awards. Example numbers are labelled
as examples. No location doorway pages. Add new articles only when they answer a real question you're seeing in
Search Console or from customers.

---

## 2. Pre-launch (do once)

- [ ] **Domain** `flowhq.co.in` (GoDaddy) connected to Vercel: `A @` and `CNAME www` records — see DEPLOYMENT.md, Option A. Canonical host: `https://www.flowhq.co.in`; the bare domain 308-redirects to it (Vercel domain setting).
- [ ] **HTTPS** active on both `www` and the bare domain (Vercel issues certificates automatically).
- [ ] **Production env var** set in Vercel → Settings → Environment Variables → *Production only*:
      `NEXT_PUBLIC_SITE_URL=https://www.flowhq.co.in` (no trailing slash). Redeploy after setting it.
- [ ] Do **not** set `NEXT_PUBLIC_SITE_URL` for Preview — previews automatically become noindex.
- [ ] **Metadata:** every page has a unique title + description (checked by `npm run seo:check`).
- [ ] **Canonical** on every page = `https://www.flowhq.co.in/<path>/` (no `localhost`, no `*.vercel.app`, no bare domain).
- [ ] **robots.txt** at `/robots.txt` allows `/` and lists `Sitemap: https://www.flowhq.co.in/sitemap.xml`.
- [ ] **sitemap.xml** lists only canonical pages (home, 7 services, industries, resources) with absolute `https://www.flowhq.co.in/…` URLs.
- [ ] **Structured data** validates in the Rich Results Test / Schema Markup Validator:
      ProfessionalService (Organization), WebSite, Service, BreadcrumbList, FAQPage (only where the FAQ is visible),
      Article (resources).
- [ ] **OG preview:** paste the homepage into opengraph.xyz (or share on WhatsApp/LinkedIn) — title, description
      and the 1200×630 image appear.
- [ ] **Favicon** loads at `/favicon.ico`; app icon at `/icon.svg`.
- [ ] **404:** a made-up URL returns HTTP 404 with the branded page (and `noindex`).
- [ ] **Redirects:** `/workflow-automation/` → `/ai-workflow-automation/` (308), bare domain → `www` (308, Vercel).
- [ ] **Mobile test:** check the homepage, one service page and one article on a real phone.
- [ ] **PageSpeed:** run pagespeed.web.dev on `/`, `/ai-automation/` and one article. Field data appears only
      after real traffic; lab scores are a guide.
- [ ] **Analytics:** Vercel → Analytics → enable Web Analytics. Page views work on all plans; the custom events
      below need a plan that includes custom events.
- [ ] Run the automated check against production:
      `SEO_BASE=https://www.flowhq.co.in npm run seo:check` → "All SEO checks passed."

---

## 3. Google Search Console

1. **Verify the domain** — Search Console → Add property → *Domain* → add the TXT record at your DNS provider.
   (A Domain property covers `https://`, `http://`, apex and `www`.)
2. **Add the production property** — if you prefer a URL-prefix property too, add `https://www.flowhq.co.in/`.
3. **Submit the sitemap** — Sitemaps → enter `sitemap.xml` → Submit. Status should become "Success".
4. **Inspect the homepage** — URL Inspection → `https://www.flowhq.co.in/` → *Test live URL*: indexable, canonical
   = the URL itself, page renders.
5. **Request indexing** for the important pages: home, the 7 service pages, the 2 pillar guides.
   (Don't spam requests — the sitemap does the rest.)
6. **Monitor indexing** — Pages report weekly: "Indexed" should grow; investigate "Crawled – currently not indexed"
   and "Duplicate without user-selected canonical".
7. **Monitor queries** — Performance → Queries: which searches you appear for, and on which page.
8. **Monitor CTR** — pages with many impressions but low CTR need a clearer title/description, not more keywords.
9. **Monitor page performance** — Core Web Vitals report (needs traffic) and the Performance report by page.
10. **Expand content from real data** — when a query shows impressions but no matching page/section, answer it:
    add an FAQ, a section, or (if the intent is distinct) a new article in the right cluster.

Also: add the site to **Bing Webmaster Tools** (it can import from Search Console), and create a
**Google Business Profile** for Flow HQ (Lucknow) — real reviews from real clients over time are the strongest
local trust signal.

---

## 4. Analytics events (Vercel Web Analytics, cookieless)

| Event | When | Props |
|---|---|---|
| page view | every page | automatic |
| `cta_click` | any link to the audit form | `label`, `page` |
| `whatsapp_click` | any WhatsApp link | `page` |
| `audit_view` | audit form scrolled into view | — |
| `form_start` | first focus in the audit form | — |
| `form_submit` / `form_success` / `form_error` | audit form submission outcome | — |
| `section_view` | pipeline, workflow, calculator, Try It seen | `section` |

No personal data is sent. Analytics only loads on Vercel builds.

---

## 5. After launch (ongoing)

- [ ] Earn real backlinks: founder profiles, Indian startup directories, partner listings (n8n community,
      tool marketplaces), guest posts and podcasts about automation — never bought links.
- [ ] Add case studies **only** when a client agrees to be named and the numbers are real.
- [ ] Re-run `npm run seo:check` after every content change.
- [ ] Review Search Console monthly; update or merge pages that don't earn impressions after 3–6 months.
