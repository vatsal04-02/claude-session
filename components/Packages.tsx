import { Check } from "lucide-react";
import { monthlyLine, PACKAGES, POPULAR_TAG, priceLine } from "@/lib/content";
import { cn } from "@/lib/cn";
import Slot from "./Slot";
import { Button, Reveal, SectionHeading } from "./ui";
import { BAND, CONTAINER } from "@/lib/layout";

/** Pricing: three tiers (setup + optional monthly care plan); the featured tier sits in ink. Prices come from lib/content.ts; until set, production shows "Get a quote". */
export default function Packages() {
  return (
    <section id="packages" className={`${BAND} bg-bg-soft`}>
      <div className={CONTAINER}>
        <SectionHeading
          index="05"
          eyebrow="Packages"
          title={
            <>
              Pick a <em>starting</em> point.
            </>
          }
          sub="Every system is built around your business. You get a fixed quote before anything starts."
        />
        <ul className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-3 lg:items-stretch">
          {PACKAGES.map((p, i) => {
            const setup = priceLine(p);
            const monthly = monthlyLine(p);
            const hot = !!p.featured;
            return (
              <li key={p.name} className="relative">
                <Reveal delay={i * 0.06} className={cn("flex h-full flex-col rounded-[24px] p-6 md:p-8", hot ? "theme-ink lg:-my-4 lg:py-12" : "border border-border bg-surface")}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[12px] text-subtle">0{i + 1}</span>
                    {hot && POPULAR_TAG && <span className="rounded-full bg-signal px-3 py-1.5 text-[11.5px] font-semibold leading-none text-ink">{POPULAR_TAG}</span>}
                  </div>
                  <h3 className="display mt-6 text-[28px] text-text md:text-[30px]" style={{ letterSpacing: "-0.035em", lineHeight: 1.02 }}>
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[15px] text-muted">{p.blurb}</p>

                  <div className="mt-8 border-y border-border py-5">
                    <div className="display text-[34px] text-text md:text-[38px]" style={{ letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {setup.placeholder ? <Slot value={setup.text} /> : setup.text}
                    </div>
                    <div className="mt-2 flex items-baseline justify-between gap-3 text-[14px]">
                      <span className="text-subtle">One-time setup</span>
                      <span className="text-muted">Care plan · {monthly.placeholder ? <Slot value={monthly.text} /> : monthly.text}</span>
                    </div>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] leading-[1.5] text-text">
                        <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", hot ? "bg-signal text-ink" : "bg-text text-bg")}>
                          <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button href="#audit" size="lg" variant={hot ? "primary" : "ghost"} className="mt-8 w-full">
                    Get started
                  </Button>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-[14px] text-subtle">No lock-in. An optional monthly care plan covers monitoring, updates and a monthly report.</p>
      </div>
    </section>
  );
}
