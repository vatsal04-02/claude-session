/**
 * Public site URL + indexability — the ONE place the canonical domain is decided.
 *
 * Every SEO URL is built from SITE_URL: metadataBase, canonicals, Open Graph/Twitter, sitemap.xml,
 * robots.txt and all JSON-LD. It is baked into the static HTML at build time.
 *
 *   production   NEXT_PUBLIC_SITE_URL if it is set to a real domain, otherwise https://www.flowhq.co.in
 *   development  http://localhost:3000 (or NEXT_PUBLIC_SITE_URL if set)
 *
 * Vercel's own hostnames (*.vercel.app, e.g. the auto-generated project/deployment URLs) are NEVER used:
 * not from VERCEL_URL / VERCEL_PROJECT_PRODUCTION_URL, and not even if NEXT_PUBLIC_SITE_URL is set to one by mistake.
 * Preview deployments still point canonicals at production, and are noindex (see INDEXABLE).
 */
export const PRODUCTION_URL = "https://www.flowhq.co.in";

const isVercelHost = (url: string) => /(^|\.)vercel\.app$/i.test(url.replace(/^https?:\/\//i, "").split(/[/:]/)[0]);

/** www is the single canonical host (Vercel 308-redirects the bare domain to it), so a bare-domain value means www. */
const toCanonicalHost = (url: string) => url.replace(/^https?:\/\/flowhq\.co\.in$/i, PRODUCTION_URL);

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (fromEnv && !isVercelHost(fromEnv)) return toCanonicalHost(fromEnv);
  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";
  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();

/** Only real production builds may be indexed. On Vercel, preview and development deployments are noindex
    (robots.txt disallows everything and every page carries <meta name="robots" content="noindex">). */
export const INDEXABLE = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";

/** True when built on Vercel (enables Vercel Web Analytics). */
export const ON_VERCEL = !!process.env.VERCEL;
