#!/usr/bin/env node
/**
 * Flow HQ — production SEO checks. No dependencies (Node 20+).
 *
 *   npm run seo:check                                   # checks https://www.flowhq.co.in (or SEO_BASE)
 *   SEO_BASE=https://www.flowhq.co.in npm run seo:check
 *   SEO_BASE=http://localhost:3000 SEO_ORIGIN=https://www.flowhq.co.in npm run seo:check   # a local build
 *
 * SEO_BASE   where to fetch pages from
 * SEO_ORIGIN the origin canonical/OG/sitemap URLs must use (defaults to SEO_BASE)
 *
 * Checks every URL in sitemap.xml plus the required pages: HTTP 200, <title>, meta description, canonical
 * (absolute, right origin, self-referencing), exactly one <h1>, <html lang>, indexable robots meta,
 * og:title / og:description / og:image, and no localhost or *.vercel.app URLs. Also robots.txt,
 * sitemap.xml, favicon.ico and a real 404. Exits 1 if anything fails.
 */
const BASE = (process.env.SEO_BASE || "https://www.flowhq.co.in").replace(/\/+$/, "");
const ORIGIN = (process.env.SEO_ORIGIN || BASE).replace(/\/+$/, "");
const HEADERS = process.env.SEO_HEADERS ? JSON.parse(process.env.SEO_HEADERS) : {};

const REQUIRED = [
  "/",
  "/ai-automation/",
  "/business-process-automation/",
  "/ai-workflow-automation/",
  "/crm-automation/",
  "/lead-automation/",
  "/ai-receptionist/",
  "/whatsapp-automation/",
  "/industries/",
  "/industries/healthcare/",
  "/industries/real-estate/",
  "/industries/home-services/",
  "/industries/professional-services/",
  "/resources/",
];

let failures = 0;
const fail = (where, msg) => {
  failures++;
  console.log(`  ✗ ${where}: ${msg}`);
};
const get = (path, opts = {}) => fetch(BASE + path, { redirect: "manual", headers: HEADERS, ...opts });
const attr = (html, re) => (html.match(re) || [])[1];
const meta = (html, key) =>
  attr(html, new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]+content="([^"]*)"`, "i")) ??
  attr(html, new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${key}"`, "i"));

async function checkPage(path) {
  const res = await get(path);
  if (res.status !== 200) return fail(path, `HTTP ${res.status}`);
  const html = await res.text();
  const title = attr(html, /<title>([^<]*)<\/title>/i);
  if (!title) fail(path, "missing <title>");
  else if (title.length > 70) console.log(`  ! ${path}: title is ${title.length} chars (may be truncated)`);
  const desc = meta(html, "description");
  if (!desc) fail(path, "missing meta description");
  else if (desc.length > 170) console.log(`  ! ${path}: description is ${desc.length} chars`);
  const canonical = attr(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  if (!canonical) fail(path, "missing canonical");
  else if (canonical !== ORIGIN + path) fail(path, `canonical is ${canonical}, expected ${ORIGIN + path}`);
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1s !== 1) fail(path, `${h1s} <h1> elements (expected 1)`);
  if (!/<html[^>]+lang="[a-z]{2}/i.test(html)) fail(path, "missing <html lang>");
  const robots = meta(html, "robots");
  if (robots && /noindex/i.test(robots)) fail(path, `robots meta is "${robots}"`);
  for (const k of ["og:title", "og:description", "og:image"]) if (!meta(html, k)) fail(path, `missing ${k}`);
  const ogImage = meta(html, "og:image");
  if (ogImage && !ogImage.startsWith(ORIGIN)) fail(path, `og:image not on ${ORIGIN}: ${ogImage}`);
  if (/https?:\/\/(localhost|127\.0\.0\.1)[:/]/.test(canonical + (ogImage || ""))) fail(path, "localhost URL in canonical/og");
  if (/\.vercel\.app/.test(canonical || "")) fail(path, "vercel.app URL in canonical");
  const ogUrl = meta(html, "og:url");
  if (ogUrl && ogUrl !== ORIGIN + path) fail(path, `og:url is ${ogUrl}, expected ${ORIGIN + path}`);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const m of ld) {
    try {
      JSON.parse(m[1]);
    } catch {
      fail(path, "invalid JSON-LD");
    }
  }
  console.log(`  ✓ ${path}  —  ${title}`);
}

console.log(`Flow HQ SEO check · base ${BASE} · origin ${ORIGIN}\n`);

// robots.txt
{
  const res = await get("/robots.txt");
  const txt = res.status === 200 ? await res.text() : "";
  if (res.status !== 200) fail("/robots.txt", `HTTP ${res.status}`);
  else {
    if (/^Disallow:\s*\/\s*$/im.test(txt)) fail("/robots.txt", "disallows the whole site (preview build?)");
    if (!txt.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail("/robots.txt", `no "Sitemap: ${ORIGIN}/sitemap.xml"`);
    console.log("  ✓ /robots.txt");
  }
}

// sitemap.xml
let paths = [];
{
  const res = await get("/sitemap.xml");
  if (res.status !== 200) fail("/sitemap.xml", `HTTP ${res.status}`);
  else {
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (!locs.length) fail("/sitemap.xml", "no URLs");
    for (const l of locs) if (!l.startsWith(ORIGIN + "/")) fail("/sitemap.xml", `URL not on ${ORIGIN}: ${l}`);
    if (locs.some((l) => /[?#]/.test(l))) fail("/sitemap.xml", "contains parameter or fragment URLs");
    paths = locs.map((l) => l.slice(ORIGIN.length));
    for (const r of REQUIRED) if (!paths.includes(r)) fail("/sitemap.xml", `missing ${r}`);
    console.log(`  ✓ /sitemap.xml (${locs.length} URLs)`);
  }
}

// favicon
{
  const res = await get("/favicon.ico");
  if (res.status !== 200) fail("/favicon.ico", `HTTP ${res.status}`);
  else console.log("  ✓ /favicon.ico");
}

// pages
console.log("");
for (const p of [...new Set([...REQUIRED, ...paths])]) await checkPage(p);

// 404
{
  const res = await get("/this-page-does-not-exist-404-check/");
  const html = await res.text();
  if (res.status !== 404) fail("404", `unknown URL returned HTTP ${res.status}`);
  else if (!/noindex/i.test(meta(html, "robots") || "")) fail("404", "404 page is not noindex");
  else console.log("\n  ✓ unknown URL → 404 (noindex)");
}

console.log(failures ? `\n${failures} problem(s) found.` : "\nAll SEO checks passed.");
process.exit(failures ? 1 : 0);
