import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { breadcrumbs, faqPage, JsonLd, service } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getService, SERVICES } from "@/lib/services";

type Props = { params: Promise<{ service: string }> };

// static export: one HTML file per service page; any other path is a 404
export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).service);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/${s.slug}/` });
}

export default async function Page({ params }: Props) {
  const s = getService((await params).service);
  if (!s) notFound();
  const path = `/${s.slug}/`;
  return (
    <>
      <JsonLd
        graph={[
          service({ ...s.schema, path }),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: s.nav, path },
          ]),
          faqPage(s.faqs, path),
        ]}
      />
      <ServicePage s={s} />
    </>
  );
}
