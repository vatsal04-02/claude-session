import { Check } from "lucide-react";
import { PACKAGES, priceLine } from "@/lib/content";
import { cn } from "@/lib/cn";
import Slot from "./Slot";
import { Button, Reveal, SectionHeading } from "./ui";

/** Three packages. Prices come from lib/content.ts; until one is set, production shows "Get a quote". */
export default function Packages() {
  return (
    <section id="packages" className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeading eyebrow="Packages" title="Pick a starting point." sub="Every system is built around your business. You get a fixed quote before anything starts." />
        <ul className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-3">
          {PACKAGES.map((p, i) => {
            const price = priceLine(p);
            return (
              <li key={p.name}>
                <Reveal
                  delay={i * 0.08}
                  className={cn(
                    "flex h-full flex-col rounded-2xl border p-6 md:p-7",
                    p.featured ? "border-accent/40 bg-accent/[0.04]" : "border-border bg-surface/60"
                  )}
                >
                  <h3 className="text-[20px] font-semibold leading-tight text-text">{p.name}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{p.blurb}</p>
                  <div className="mt-6 text-[clamp(1.5rem,2.4vw,1.9rem)] font-semibold leading-none text-text">
                    {price.placeholder ? <Slot value={price.text} /> : price.text}
                  </div>
                  <p className="mt-2 text-[13.5px] leading-[1.5] text-subtle">{p.terms}</p>
                  <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] leading-[1.5] text-text">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button href="#audit" variant={p.featured ? "primary" : "ghost"} className="mt-8 w-full">
                    Get started
                  </Button>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[14px] text-subtle">No lock-in. An optional monthly care plan covers monitoring, updates and a monthly report.</p>
      </div>
    </section>
  );
}
