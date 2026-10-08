#!/usr/bin/env node
/**
 * Post-build guard (runs after `next build`, locally and on Vercel): the generated site must never expose a
 * non-canonical origin. Fails the build if any HTML/XML/TXT file in out/ contains a *.vercel.app URL, or if
 * the sitemap, robots.txt or a canonical tag uses an origin other than the expected one.
 *
 * Expected origin = NEXT_PUBLIC_SITE_URL (unless it's a *.vercel.app host) → otherwise https://flowhq.co.in.
 * Preview builds (VERCEL_ENV=preview/development) are noindex with an empty sitemap; they're checked for
 * *.vercel.app leaks only.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
if (!existsSync(OUT)) {
  console.error("check-build-urls: ./out not found — run `next build` first.");
  process.exit(1);
}

const env = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
const EXPECTED = env && !/\.vercel\.app(\/|$)/i.test(env) ? env : "https://flowhq.co.in";
const indexable = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|xml|txt|webmanifest)$/.test(e.name)) files.push(p);
  }
})(OUT);

const problems = [];
for (const f of files) {
  const s = readFileSync(f, "utf8");
  const leak = s.match(/https?:\/\/[a-z0-9.-]*\.vercel\.app[^\s"'<]*/i);
  if (leak) problems.push(`${f}: contains ${leak[0]}`);
}

if (indexable) {
  const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) problems.push("sitemap.xml has no URLs");
  for (const l of locs) if (!l.startsWith(EXPECTED + "/")) problems.push(`sitemap.xml: ${l} is not on ${EXPECTED}`);
  const robots = readFileSync(join(OUT, "robots.txt"), "utf8");
  if (!robots.includes(`Sitemap: ${EXPECTED}/sitemap.xml`)) problems.push(`robots.txt does not reference ${EXPECTED}/sitemap.xml`);
  for (const f of files.filter((x) => x.endsWith(".html"))) {
    const c = readFileSync(f, "utf8").match(/<link rel="canonical" href="([^"]+)"/);
    if (c && !c[1].startsWith(EXPECTED + "/")) problems.push(`${f}: canonical ${c[1]} is not on ${EXPECTED}`);
  }
  console.log(`check-build-urls: ${locs.length} sitemap URLs, ${files.length} files scanned, expected origin ${EXPECTED}`);
} else {
  console.log(`check-build-urls: preview build (noindex) — ${files.length} files scanned for *.vercel.app leaks`);
}

if (problems.length) {
  console.error(`\ncheck-build-urls: FAILED\n  ${problems.slice(0, 20).join("\n  ")}${problems.length > 20 ? `\n  …and ${problems.length - 20} more` : ""}`);
  process.exit(1);
}
console.log("check-build-urls: OK — no *.vercel.app URLs, all SEO URLs on the canonical origin.");
