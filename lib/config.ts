/**
 * Public site URL + indexability — the one place the domain is configured.
 *
 *   NEXT_PUBLIC_SITE_URL      the live domain: https://flowhq.co.in   (set it in Vercel → Production)
 *   VERCEL_PROJECT_PRODUCTION_URL   Vercel's own production domain, used only if the variable above is missing
 *   development               http://localhost:3000
 *
 * It is baked into the static HTML at build time (canonical URLs, Open Graph, sitemap, robots.txt, JSON-LD),
 * so changing it means rebuilding. Preview deployments always point canonicals at production and are noindex.
 */
const FALLBACK_PRODUCTION_URL = "https://flowhq.co.in"; // used only when no env var is set on a production build

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";
  return FALLBACK_PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();

/** Only real production builds may be indexed. On Vercel, preview and development deployments are noindex
    (robots.txt disallows everything and every page carries <meta name="robots" content="noindex">). */
export const INDEXABLE = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";

/** True when built on Vercel (enables Vercel Web Analytics). */
export const ON_VERCEL = !!process.env.VERCEL;
