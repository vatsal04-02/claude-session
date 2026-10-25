"use client";

import { ArrowRight } from "lucide-react";
import { BOOKING_URL, PRIMARY_CTA } from "@/lib/content";
import { WA_LINK } from "@/lib/whatsapp";
import AuditForm from "./AuditForm";
import { Parallax } from "./motion-fx";
import { Button, Magnetic, Reveal } from "./ui";
import { BAND, CONTAINER } from "@/lib/layout";

/** Closing band: the one orange band on the page, with the audit form on a paper card. Every "free audit" CTA lands here (#audit). */
export default function FinalCTA() {
  return (
    <section id="audit" className={`theme-signal relative overflow-hidden ${BAND}`}>
      <div aria-hidden className="grain" />
      {/* depth: ink rings drifting at two speeds behind the copy */}
      <Parallax speed={80} className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] md:h-[620px] md:w-[620px]">
        <div aria-hidden className="h-full w-full rounded-full border-[2px] border-ink/15" />
      </Parallax>
      <Parallax speed={40} className="pointer-events-none absolute -bottom-40 left-[30%] hidden h-[380px] w-[380px] md:block">
        <div aria-hidden className="h-full w-full rounded-full bg-ink/[0.06]" />
      </Parallax>
      <div className={`${CONTAINER} relative grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <Reveal>
          <span className="kicker [&::before]:!bg-ink">Get started</span>
          <h2 className="display mt-6 text-balance text-[clamp(3rem,8vw,7rem)] text-text" style={{ lineHeight: 0.92, letterSpacing: "-0.055em" }}>
            Ready to stop losing <span className="font-serif font-normal italic tracking-[-0.02em]">leads?</span>
          </h2>
          <p className="mt-6 max-w-[30rem] text-[16.5px] leading-[1.6] text-muted md:text-[19px]">
            Tell us how enquiries reach you today. We&apos;ll reply with what to automate and a fixed quote — free, no obligation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {BOOKING_URL ? (
              <Button size="lg" variant="ink" href={PRIMARY_CTA.href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                {PRIMARY_CTA.label}
              </Button>
            ) : null}
            <Magnetic strength={0.3} max={10} className="w-full sm:w-auto">
              <Button size="lg" variant="ink" arrow={<ArrowRight className="h-4 w-4" />} {...WA_LINK} className="w-full sm:w-auto">
                Chat on WhatsApp
              </Button>
            </Magnetic>
          </div>
          <a
            href="/calculator/"
            className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-text underline decoration-text/40 underline-offset-4 transition-colors hover:decoration-text"
          >
            Curious what manual work costs you? Try the calculator →
          </a>
        </Reveal>
        <Reveal delay={0.12} className="theme-paper">
          <AuditForm />
        </Reveal>
      </div>
    </section>
  );
}
