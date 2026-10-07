import { Eyebrow, band, CtaAndRelated, h2, PageHero, Shell, wrap } from "@/components/content";
import { INDUSTRIES } from "@/lib/industries";
import { breadcrumbs, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Automation by Industry | Flow HQ",
  description:
    "How Flow HQ applies custom AI and automation in clinics, real estate, home services and professional firms — the workflows that differ in each.",
  path: "/industries/",
});

export default function Page() {
  return (
    <Shell>
      <JsonLd graph={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries/" }])]} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Industries" }]}
        eyebrow="Industries"
        title="Automation built around how your industry works"
        intro="The building blocks are the same — capture, understand, route, automate. The workflows aren't. Here's how they look in the industries we work with most."
      />
      <section className={`${band} bg-[#150e0a]`}>
        <div className={wrap}>
          <Eyebrow>Choose your industry</Eyebrow>
          <h2 className={`${h2} mt-4`}>Industry guides</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <a href={`/industries/${i.slug}/`} className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50 md:p-7">
                  <h3 className="item-title group-hover:text-accent">{i.name}</h3>
                  <p className="mt-2 text-[15.5px] leading-[1.7] text-muted">{i.metaDescription}</p>
                  <span className="mt-4 text-[14px] text-accent">Read the guide →</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-muted">Not listed? The same approach works for most service businesses — the free audit maps it to yours.</p>
        </div>
      </section>
      <CtaAndRelated services={["business-process-automation", "ai-workflow-automation", "ai-automation"]} />
    </Shell>
  );
}
