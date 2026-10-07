import { band, CtaAndRelated, Eyebrow, h2, PageHero, Shell, wrap } from "@/components/content";
import { CLUSTERS, getResource, inCluster } from "@/lib/resources";
import { breadcrumbs, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Automation Guides & Resources | Flow HQ",
  description:
    "Practical guides on business process automation and AI automation for small businesses: what to automate, what it costs, how to measure ROI and how it works.",
  path: "/resources/",
});

export default function Page() {
  return (
    <Shell>
      <JsonLd graph={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources/" }])]} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Resources" }]}
        eyebrow="Resources"
        title="Practical guides to automating your business"
        intro="Plain-language answers to the questions we hear most — what to automate, what it costs, how AI fits in and how to measure the result."
      >
        <span />
      </PageHero>
      {CLUSTERS.map((c, k) => {
        const pillar = getResource(c.pillar)!;
        const rest = inCluster(c.id).filter((r) => !r.pillar);
        return (
          <section key={c.id} className={`${band} ${k % 2 ? "bg-[#130c08]" : "bg-[#150e0a]"}`}>
            <div className={wrap}>
              <Eyebrow>{c.name}</Eyebrow>
              <h2 className={`${h2} mt-4 max-w-[24ch]`}>{c.blurb}</h2>
              <a
                href={`/resources/${pillar.slug}/`}
                className="group mt-10 block rounded-2xl border border-accent/40 bg-[linear-gradient(160deg,#2a170d,#1a100b_60%)] p-6 transition-colors hover:border-accent md:p-8"
              >
                <span className="label text-[10px] text-accent-2">Start here · {pillar.readMins} min guide</span>
                <h3 className="item-title mt-3 text-[24px] group-hover:text-accent">{pillar.title}</h3>
                <p className="mt-2 max-w-[60ch] text-[15.5px] leading-[1.7] text-muted">{pillar.description}</p>
              </a>
              <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((r) => (
                  <li key={r.slug}>
                    <a href={`/resources/${r.slug}/`} className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
                      <h3 className="item-title text-[19px] group-hover:text-accent">{r.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.65] text-muted">{r.description}</p>
                      <span className="label mt-auto pt-4 text-[10px] text-subtle">{r.readMins} min read</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
      <CtaAndRelated services={["business-process-automation", "ai-automation", "lead-automation"]} />
    </Shell>
  );
}
