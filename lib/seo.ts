import type { Metadata } from "next";
import { INDEXABLE } from "./config";

export const SITE_NAME = "Flow HQ";
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Flow HQ — Put your business on autopilot. Custom AI + automation systems.",
};

/** Previews/dev builds are never indexable; production pages are. */
export const ROBOTS: Metadata["robots"] = INDEXABLE ? { index: true, follow: true } : { index: false, follow: false };

/** Per-page metadata: unique title + description, self-referencing canonical, matching OG/Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const t = socialTitle ?? title;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: ROBOTS,
    openGraph: {
      title: t,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: t, description, images: [OG_IMAGE.url] },
  };
}
