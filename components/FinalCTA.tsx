"use client";

import { Check } from "lucide-react";
import AuditForm from "./AuditForm";
import { Highlight, Reveal } from "./ui";

const GET = ["We map the work eating your team's day", "A fixed quote with no surprises", "An automation plan for your business"];

/** The audit section: every "Get My Free Audit" button on the site scrolls here. */
export default function FinalCTA() {
  return (
    <section id="audit" className="section-edge relative overflow-hidden bg-[#1a110b] px-5 py-24 md:px-8 md:py-[150px]">
      <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.5 } as React.CSSProperties} />
      <div aria-hidden className="anim-glow pointer-events-none absolute -left-20 bottom-0 h-[380px] w-[380px] rounded-full bg-[rgba(234,106,47,0.14)] blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1140px] items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="label inline-flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent/70" /> Free audit
            </span>
            <h2 className="display mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)]">
              Tell us what your team does manually.
              <span className="mt-4 block text-[0.5em] font-semibold leading-[1.2] text-accent">
                We&apos;ll show you what can be <Highlight>automated.</Highlight>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[30rem] text-[17px] leading-[1.75] text-muted">
              Get a free audit and we&apos;ll map a workflow around your business.
            </p>
            <ul className="mt-6 space-y-3">
              {GET.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[16px] leading-[1.5] text-text">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent/10 text-accent">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <AuditForm />
        </Reveal>
      </div>
    </section>
  );
}
