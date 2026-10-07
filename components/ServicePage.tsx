import { Check } from "lucide-react";
import { PROCESS, SERVICES, type ServiceContent } from "@/lib/services";
import { WA_LINK } from "@/lib/whatsapp";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Button } from "./ui";

/* Service landing page. Server-rendered and animation-free on purpose: every word is in the HTML. */

const wrap = "relative mx-auto w-full max-w-[1140px]";
const band = "section-edge relative px-5 py-20 md:px-8 md:py-28";
const h2 = "display text-balance text-[clamp(1.9rem,3.6vw,2.9rem)] text-text";
const eyebrowCls = "label inline-flex items-center gap-2.5 text-accent";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className={eyebrowCls}>
      <span aria-hidden className="h-px w-6 bg-accent/70" />
      {children}
    </span>
  );
}

export default function ServicePage({ s }: { s: ServiceContent }) {
  const related = SERVICES.filter((x) => x.slug !== s.slug);
  return (
    <>
      <Navbar base="/" />
      <main id="main">
        {/* hero */}
        <section className="hero-atmos relative overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-36">
          <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.8 } as React.CSSProperties} />
          <div className={wrap}>
            <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-subtle">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/" className="transition-colors hover:text-accent">Home</a>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-muted">{s.nav}</li>
              </ol>
            </nav>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h1 className="display mt-5 max-w-[18ch] text-balance text-[clamp(2.4rem,5vw,4.1rem)] text-text" style={{ fontWeight: 760, lineHeight: 1.04 }}>
              {s.h1}
            </h1>
            <p className="mt-7 max-w-[640px] text-[17px] leading-[1.7] text-muted md:text-[19px]">{s.intro}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button size="lg" href="/#audit">
                Get My Free Audit
              </Button>
              <Button size="lg" variant="whatsapp" {...WA_LINK}>
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* signs */}
        <section className={`${band} bg-[#150e0a]`}>
          <div className={wrap}>
            <h2 className={h2}>{s.signsTitle}</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {s.signs.map((x) => (
                <li key={x.title} className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="item-title">{x.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-[1.7] text-muted">{x.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* what we build */}
        <section className={`${band} warm-a bg-[#130c08]`}>
          <div className={wrap}>
            <Eyebrow>What we build</Eyebrow>
            <h2 className={`${h2} mt-4`}>{s.buildsTitle}</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {s.builds.map((x) => (
                <li key={x.title} className="rounded-2xl border border-border bg-surface p-6 md:p-7">
                  <h3 className="item-title">{x.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-[1.7] text-muted">{x.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* depth */}
        <section className={`${band} bg-[#150e0a]`}>
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
              <ul className="space-y-3.5 self-center rounded-2xl border border-accent/30 bg-accent/[0.05] p-6 md:p-8">
                {s.deepPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[16px] leading-[1.5] text-text">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent/10 text-accent">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* process */}
        <section className={`${band} bg-[#130c08]`}>
          <div className={wrap}>
            <Eyebrow>How we work</Eyebrow>
            <h2 className={`${h2} mt-4`}>From free audit to a system that runs itself</h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((x, i) => (
                <li key={x.title} className="rounded-2xl border border-border bg-surface p-6">
                  <span className="label text-subtle">0{i + 1}</span>
                  <h3 className="item-title mt-3">{x.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-muted">{x.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[15.5px] text-muted">
              Want to see it running?{" "}
              <a href="/#try-it" className="text-text underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent">
                Try the live demo
              </a>{" "}
              or{" "}
              <a href="/#calculator" className="text-text underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent">
                estimate what slow follow-up costs you
              </a>
              .
            </p>
          </div>
        </section>

        {/* FAQ — native <details>: crawlable, keyboard-friendly, no JavaScript */}
        <section className={`${band} bg-[#150e0a]`}>
          <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className={`${h2} mt-4`}>Questions about {s.topic}</h2>
            </div>
            <div className="border-b border-border">
              {s.faqs.map(([q, a], i) => (
                <details key={q} className="faq-item group border-t border-border" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-medium text-text transition-colors hover:text-accent md:text-[19px]">
                    <h3>{q}</h3>
                    <span aria-hidden className="text-[22px] leading-none text-accent transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[40rem] pb-6 text-[16px] leading-[1.75] text-muted">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* related + CTA */}
        <section className={`${band} bg-[#18100a]`}>
          <div className={wrap}>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <Eyebrow>Free audit</Eyebrow>
                <h2 className={`${h2} mt-4`}>Find out what&apos;s worth automating in your business</h2>
                <p className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.75] text-muted">
                  Tell us what your team does by hand. We&apos;ll map what can be automated and give you a fixed quote — free. If
                  the audit finds nothing worth automating, we&apos;ll tell you straight.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" href="/#audit">
                    Get My Free Audit
                  </Button>
                </div>
              </div>
              <nav aria-label="Related services">
                <h2 className="label text-subtle">Related services</h2>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <a href={`/${r.slug}/`} className="group flex min-h-14 items-center justify-between gap-4 py-3 text-[17px] text-text transition-colors hover:text-accent">
                        {r.nav}
                        <span aria-hidden className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
