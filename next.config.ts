import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
