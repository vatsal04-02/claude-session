import type { NextConfig } from "next";

/** Same rule as lib/config.ts: only real production builds are indexable (and hide content placeholders). It is inlined here so
    the browser bundle agrees with the server-rendered HTML — VERCEL_ENV itself is not exposed to client code. */
const indexable = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_INDEXABLE: String(indexable) },
  reactStrictMode: true,
  // Static export: `npm run build` writes a plain-HTML site to ./out that any web host
  // (Hostinger shared hosting included) can serve — no Node.js server required.
  output: "export",
  // No server means no on-the-fly image optimisation; serve images as-is.
  images: { unoptimized: true },
  // every page is written as <route>/index.html and linked as /<route>/ — works on any static host
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
