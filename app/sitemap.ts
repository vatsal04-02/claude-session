import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { SERVICES } from "@/lib/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...SERVICES.map((s) => ({ url: `${SITE_URL}/${s.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
