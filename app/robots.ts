import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/config";

export const dynamic = "force-static";

/** Production: everything public is crawlable (CSS/JS/images included). Previews: nothing is. */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
