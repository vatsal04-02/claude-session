/**
 * Public site URL — the one place the domain is configured.
 *
 *   development:  http://localhost:3000                      (default, no setup needed)
 *   production:   NEXT_PUBLIC_SITE_URL if set, else Vercel's production URL, else https://flowhq.in
 *
 * It is baked into the static HTML at build time (canonical URL, Open Graph tags, sitemap, robots.txt),
 * so changing it later means rebuilding and re-uploading.
 */
const PRODUCTION_URL = "https://flowhq.in";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";

  // the live domain; deploying somewhere else? set NEXT_PUBLIC_SITE_URL (see .env.example)
  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();
