import { INDUSTRIES } from "@/lib/industries";
import { PROCESS, type ServiceContent } from "@/lib/services";
import { band, CardGrid, Checklist, Chips, CtaAndRelated, Eyebrow, FaqList, Flows, h2, PageHero, Shell, wrap } from "./content";

/* Service landing page. Server-rendered and animation-free on purpose: every word is in the HTML.
   Order: problem → what we build → how it works → examples → integrations + who it's for → approach → process → FAQ → CTA + related. */
export default function ServicePage({ s }: { s: ServiceContent }) {
  const industries = INDUSTRIES.filter((i) => i.services.includes(s.slug));
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: s.nav }]} eyebrow={s.eyebrow} title={s.h1} intro={s.intro} />

      {/* the problem */}
      <section className={`${band} bg-[#150e0a]`}>
        <div className={wrap}>
          <Eyebrow>The problem</Eyebrow>
          <h2 className={`${h2} mt-4`}>{s.signsTitle}</h2>
          <CardGrid items={s.signs} />
        </div>
      </section>

      {/* what the system does */}
      <section className={`${band} warm-a bg-[#130c08]`}>
        <div className={wrap}>
          <Eyebrow>What we build</Eyebrow>
          <h2 className={`${h2} mt-4`}>{s.buildsTitle}</h2>
          <CardGrid items={s.builds} cols={3} />
        </div>
      </section>

      {/* how it works */}
      <section className={`${band} bg-[#150e0a]`}>
        <div className={wrap}>
          <Eyebrow>How it works</Eyebrow>
          <h2 className={`${h2} mt-4`}>How {s.topic} works, step by step</h2>
          <CardGrid items={s.how} cols={4} />
        </div>
      </section>

      {/* examples */}
      <section className={`${band} bg-[#130c08]`}>
        <div className={wrap}>
          <Eyebrow>Examples</Eyebrow>
          <h2 className={`${h2} mt-4`}>What it looks like in practice</h2>
          <Flows items={s.examples} />
          <p className="mt-6 text-[14px] text-subtle">Illustrative workflows — every system is built around your own process.</p>
        </div>
      </section>

      {/* integrations + who it's for */}
      <section className={`${band} bg-[#150e0a]`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <Eyebrow>Integrations</Eyebrow>
            <h2 className={`${h2} mt-4`}>Works with the tools you already use</h2>
            <Chips items={s.integrations} />
            <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
              Anything with an API or webhook can usually be connected. We confirm what&apos;s possible for your setup in the free audit.
            </p>
          </div>
          <div>
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className={`${h2} mt-4`}>A good fit if you are…</h2>
            <Checklist items={s.whoFor} />
            {industries.length > 0 && (
              <p className="mt-6 text-[15px] text-muted">
                Industry guides:{" "}
                {industries.map((i, k) => (
                  <span key={i.slug}>
                    {k > 0 && " · "}
                    <a href={`/industries/${i.slug}/`} className="text-text underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent">
                      {i.name}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* approach */}
      <section className={`${band} bg-[#130c08]`}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16`}>
          <div>
            <h2 className={h2}>{s.deepTitle}</h2>
            {s.deep.map((p) => (
              <p key={p.slice(0, 24)} className="mt-6 max-w-[62ch] text-[16.5px] leading-[1.75] text-muted">
                {p}
              </p>
            ))}
          </div>
          {s.deepPoints && (
            <div className="self-center rounded-2xl border border-accent/30 bg-accent/[0.05] p-6 md:p-8">
              <Checklist items={s.deepPoints} />
            </div>
          )}
        </div>
      </section>

      {/* implementation process */}
      <section className={`${band} bg-[#150e0a]`}>
        <div className={wrap}>
          <Eyebrow>Implementation</Eyebrow>
          <h2 className={`${h2} mt-4`}>From free audit to a system that runs itself</h2>
          <CardGrid items={PROCESS} cols={4} />
          <p className="mt-8 text-[15.5px] text-muted">
            Want to see it running?{" "}
            <a href="/#try-it" className="text-text underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent">
              Try the live demo
            </a>{" "}
            or{" "}
            <a href="/#calculator" className="text-text underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent">
              estimate what manual work costs you
            </a>
            .
          </p>
        </div>
      </section>

      <FaqList title={`Questions about ${s.topic}`} faqs={s.faqs} />
      <CtaAndRelated services={s.related} resources={s.resources} />
    </Shell>
  );
}
