import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaAndRelated, Eyebrow, Shell } from "@/components/content";
import { clusterOf, getResource, inCluster, RESOURCES, type Block } from "@/lib/resources";
import { article, breadcrumbs, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getResource((await params).slug);
  if (!r) return {};
  return pageMetadata({ title: `${r.metaTitle} | Flow HQ`, description: r.description, path: `/resources/${r.slug}/`, type: "article", publishedTime: r.published });
}

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function BlockView({ b }: { b: Block }) {
  if (typeof b === "string") return <p>{b}</p>;
  if ("list" in b) return <ul>{b.list.map((x) => <li key={x}>{x}</li>)}</ul>;
  if ("steps" in b) return <ol>{b.steps.map((x) => <li key={x}>{x}</li>)}</ol>;
  return <p className="prose-note">{b.note}</p>;
}

export default async function Page({ params }: Props) {
  const r = getResource((await params).slug);
  if (!r) notFound();
  const path = `/resources/${r.slug}/`;
  const cluster = clusterOf(r.cluster);
  const pillar = getResource(cluster.pillar)!;
  // pillar pages link down to every article in the cluster; articles link back up to the pillar and to siblings
  const siblings = inCluster(r.cluster).filter((x) => x.slug !== r.slug);
  return (
    <Shell>
      <JsonLd
        graph={[
          article({ title: r.title, description: r.description, path, datePublished: r.published, dateModified: r.updated }),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources/" },
            { name: r.title, path },
          ]),
        ]}
      />
      <article>
        <header className="hero-atmos relative overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-16 md:pt-36">
          <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.5 } as React.CSSProperties} />
          <div className="relative mx-auto w-full max-w-[780px]">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources/" }, { name: r.pillar ? "Guide" : "Article" }]} />
            <Eyebrow>{r.pillar ? `Guide · ${cluster.name}` : cluster.name}</Eyebrow>
            <h1 className="display mt-5 text-balance text-[clamp(2.1rem,4.4vw,3.4rem)] text-text" style={{ fontWeight: 760, lineHeight: 1.08 }}>
              {r.title}
            </h1>
            <p className="label mt-6 text-[10.5px] text-subtle">
              Flow HQ · <time dateTime={r.updated}>{fmt(r.updated)}</time> · {r.readMins} min read
            </p>
          </div>
        </header>

        <div className="px-5 pb-20 md:px-8 md:pb-28">
          <div className="relative mx-auto w-full max-w-[780px]">
            <div className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-6 md:p-7">
              <div className="label text-[10px] text-accent-2">The short answer</div>
              <p className="mt-2 text-[17px] leading-[1.7] text-text">{r.summary}</p>
            </div>

            <div className="prose-flow mt-12">
              {r.sections.map((s) => (
                <section key={s.h2}>
                  <h2>{s.h2}</h2>
                  {s.body.map((b, i) => (
                    <BlockView key={i} b={b} />
                  ))}
                </section>
              ))}
            </div>

            <nav aria-label="More in this topic" className="mt-14 rounded-2xl border border-border bg-surface p-6 md:p-7">
              <div className="label text-[10px] text-subtle">{r.pillar ? "In this guide's topic" : "Part of the guide"}</div>
              {!r.pillar && (
                <a href={`/resources/${pillar.slug}/`} className="mt-3 block text-[17px] font-medium text-text transition-colors hover:text-accent">
                  {pillar.title} →
                </a>
              )}
              <ul className="mt-4 space-y-2">
                {siblings
                  .filter((x) => !x.pillar)
                  .map((x) => (
                    <li key={x.slug}>
                      <a href={`/resources/${x.slug}/`} className="inline-flex min-h-8 items-center text-[15.5px] text-muted underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent">
                        {x.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      </article>
      <CtaAndRelated services={r.services} title="Want this done for your business?" />
    </Shell>
  );
}
