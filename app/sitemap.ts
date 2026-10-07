import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/config";
import { INDUSTRIES } from "@/lib/industries";
import { RESOURCES } from "@/lib/resources";
import { SERVICES } from "@/lib/services";

export const dynamic = "force-static";

/** Canonical, indexable pages only (absolute URLs, trailing slash = the canonical form). Previews get an empty sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return [];
  const u = (path: string) => `${SITE_URL}${path}`;
  return [
    { url: u("/"), changeFrequency: "monthly", priority: 1 },
    ...SERVICES.map((s) => ({ url: u(`/${s.slug}/`), changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: u("/industries/"), changeFrequency: "monthly", priority: 0.6 },
    ...INDUSTRIES.map((i) => ({ url: u(`/industries/${i.slug}/`), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: u("/resources/"), changeFrequency: "weekly", priority: 0.6 },
    ...RESOURCES.map((r) => ({ url: u(`/resources/${r.slug}/`), lastModified: r.updated, changeFrequency: "monthly" as const, priority: r.pillar ? 0.7 : 0.5 })),
  ];
}
