"use client";

import { ArrowRight } from "lucide-react";
import { BOOKING_URL, PRIMARY_CTA } from "@/lib/content";
import { WA_LINK } from "@/lib/whatsapp";
import AuditForm from "./AuditForm";
import { Button, Reveal } from "./ui";
import { BAND, CONTAINER } from "@/lib/layout";

/** Closing band + the audit form. Every "free audit" CTA on the page lands here (#audit). */
export default function FinalCTA() {
  return (
    <section id="audit" className={`section-edge overflow-hidden bg-[#150e0a] ${BAND}`}>
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(234,106,47,0.07), transparent)" }} />
      <div className={`${CONTAINER} relative grid items-start gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-12`}>
        <Reveal>
          <span className="label inline-flex items-center gap-2.5 text-accent">
            <span aria-hidden className="h-px w-6 bg-accent/70" /> Get started
          </span>
          <h2 className="display mt-4 text-balance text-[clamp(1.875rem,4.2vw,3.25rem)] text-text">Ready to stop losing leads?</h2>
          <p className="mt-4 max-w-[30rem] text-[15.5px] leading-[1.65] text-muted md:text-[17px]">
            Tell us how enquiries reach you today. We&apos;ll reply with what to automate and a fixed quote — free, no obligation.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {BOOKING_URL ? (
              <Button size="lg" href={PRIMARY_CTA.href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                {PRIMARY_CTA.label}
              </Button>
            ) : null}
            <Button size="lg" variant="whatsapp" arrow={<ArrowRight className="h-4 w-4" />} {...WA_LINK} className="w-full sm:w-auto">
              Chat on WhatsApp
            </Button>
          </div>
          <a
            href="/calculator/"
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[14.5px] text-muted underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent"
          >
            Curious what manual work costs you? Try the calculator →
          </a>
        </Reveal>
        <Reveal delay={0.12}>
          <AuditForm />
        </Reveal>
      </div>
    </section>
  );
}
