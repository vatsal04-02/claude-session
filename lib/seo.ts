import type { Metadata } from "next";

export const SITE_NAME = "FlowHQ";
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "FlowHQ — Put your business on autopilot. Custom AI + automation systems.",
};

/** Per-page metadata: unique title + description, self-referencing canonical, matching OG/Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
}: {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
}): Metadata {
  const t = socialTitle ?? title;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title: t, description, url: path, siteName: SITE_NAME, locale: "en_IN", type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: t, description, images: [OG_IMAGE.url] },
  };
}
