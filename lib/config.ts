/**
 * Public site URL — the one place the domain is configured.
 *
 *   development:  http://localhost:3000            (default, no setup needed)
 *   production:   NEXT_PUBLIC_SITE_URL=https://yourdomain.com   (set before `npm run build`)
 *
 * It is baked into the static HTML at build time (canonical URL, Open Graph tags, sitemap, robots.txt),
 * so it must be set when building — changing it later means rebuilding and re-uploading.
 * On Vercel the project's production URL is used automatically if the variable is missing.
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";

  throw new Error(
    "NEXT_PUBLIC_SITE_URL is not set. Production builds need the live domain, e.g.\n" +
      "  NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run build\n" +
      "or put it in a .env.production file (see .env.example)."
  );
}

export const SITE_URL = resolveSiteUrl();
