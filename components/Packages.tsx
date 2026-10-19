import { Check } from "lucide-react";
import { monthlyLine, PACKAGES, POPULAR_TAG, priceLine } from "@/lib/content";
import { cn } from "@/lib/cn";
import Slot from "./Slot";
import { Button, Reveal, SectionHeading } from "./ui";
import { BAND, CONTAINER } from "@/lib/layout";

/** Pricing table: three tiers (setup + optional monthly care plan). Prices come from lib/content.ts; until set, production shows "Get a quote". */
export default function Packages() {
  return (
    <section id="packages" className={BAND}>
      <div className={CONTAINER}>
        <SectionHeading eyebrow="Packages" title="Pick a starting point." sub="Every system is built around your business. You get a fixed quote before anything starts." />
        <ul className="mt-6 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {PACKAGES.map((p, i) => {
            const setup = priceLine(p);
            const monthly = monthlyLine(p);
            const hot = !!p.featured;
            return (
              <li key={p.name} className="relative">
                {hot && POPULAR_TAG && (
                  <span className="absolute -top-3 left-5 z-10 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.08em] text-[#1a0a03]">{POPULAR_TAG}</span>
                )}
                <Reveal
                  delay={i * 0.06}
                  className={cn(
                    "flex h-full flex-col rounded-[14px] border p-5 md:p-6",
                    hot ? "border-accent/60 bg-accent/[0.05] shadow-[0_24px_60px_-30px_rgba(234,106,47,0.45)]" : "border-border bg-surface/60"
                  )}
                >
                  <h3 className="text-[19px] font-semibold leading-tight text-text">{p.name}</h3>
                  <p className="mt-1 text-[14.5px] text-muted">{p.blurb}</p>

                  <dl className="mt-5 rounded-[10px] border border-white/[0.08] bg-black/20 text-[14px]">
                    <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.08] px-3.5 py-3">
                      <dt className="text-subtle">Setup</dt>
                      <dd className="text-[19px] font-semibold text-text">{setup.placeholder ? <Slot value={setup.text} /> : setup.text}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 px-3.5 py-2.5">
                      <dt className="text-subtle">Monthly care plan</dt>
                      <dd className="text-muted">{monthly.placeholder ? <Slot value={monthly.text} /> : monthly.text}</dd>
                    </div>
                  </dl>

                  <ul className="mt-5 flex-1 space-y-2.5">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[14.5px] leading-[1.5] text-text">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button href="#audit" variant={hot ? "primary" : "ghost"} className="mt-6 w-full">
                    Get started
                  </Button>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[13.5px] text-subtle">No lock-in. An optional monthly care plan covers monitoring, updates and a monthly report.</p>
      </div>
    </section>
  );
}
