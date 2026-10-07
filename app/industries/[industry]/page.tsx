import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { band, CardGrid, Chips, CtaAndRelated, Eyebrow, FaqList, Flows, h2, PageHero, Shell, wrap } from "@/components/content";
import { getIndustry, INDUSTRIES } from "@/lib/industries";
import { breadcrumbs, faqPage, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ industry: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = getIndustry((await params).industry);
  if (!i) return {};
  return pageMetadata({ title: i.metaTitle, description: i.metaDescription, path: `/industries/${i.slug}/` });
}

export default async function Page({ params }: Props) {
  const i = getIndustry((await params).industry);
  if (!i) notFound();
  const path = `/industries/${i.slug}/`;
  return (
    <Shell>
      <JsonLd
        graph={[
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries/" },
            { name: i.name, path },
          ]),
          faqPage(i.faqs, path),
        ]}
      />
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Industries", href: "/industries/" }, { name: i.name }]} eyebrow={i.name} title={i.h1} intro={i.intro} />

      <section className={`${band} bg-[#150e0a]`}>
        <div className={wrap}>
          <Eyebrow>The problem</Eyebrow>
          <h2 className={`${h2} mt-4`}>Where the time goes</h2>
          <CardGrid items={i.problems} />
        </div>
      </section>

      <section className={`${band} warm-a bg-[#130c08]`}>
        <div className={wrap}>
          <Eyebrow>What we automate</Eyebrow>
          <h2 className={`${h2} mt-4`}>Workflows we build for {i.name.toLowerCase()}</h2>
          <Flows items={i.workflows} />
          <p className="mt-6 text-[14px] text-subtle">Illustrative workflows — every system is built around your own process.</p>
        </div>
      </section>

      <section className={`${band} bg-[#150e0a]`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <Eyebrow>Integrations</Eyebrow>
            <h2 className={`${h2} mt-4`}>Tools we connect</h2>
            <Chips items={i.tools} />
          </div>
          <div className="self-start rounded-2xl border border-accent/30 bg-accent/[0.05] p-6 md:p-8">
            <h2 className="item-title text-text">{i.care.title}</h2>
            <p className="mt-3 text-[16px] leading-[1.75] text-muted">{i.care.body}</p>
          </div>
        </div>
      </section>

      <FaqList title={`Automation for ${i.name.toLowerCase()}: common questions`} faqs={i.faqs} />
      <CtaAndRelated services={i.services} resources={i.resources} />
    </Shell>
  );
}
