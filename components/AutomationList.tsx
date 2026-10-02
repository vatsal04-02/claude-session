"use client";

import { motion } from "motion/react";
import { EASE, Section, SectionHeading } from "./ui";

const ITEMS = [
  ["New enquiry", "Captured and assigned"],
  ["Missed call", "Callback task created"],
  ["No response", "Follow-up triggered"],
  ["New booking", "Confirmation sent"],
  ["Upcoming appointment", "Reminder sent"],
  ["No-show", "Recovery workflow started"],
  ["Completed service", "Review / follow-up requested"],
  ["Dormant customer", "Reactivation workflow"],
] as const;

/* A plain trigger → outcome list; a thin orange line sweeps each row as it enters. */
export default function AutomationList() {
  return (
    <Section id="automations" space="lg" className="border-t border-border bg-bg-soft">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Automation examples"
            title="What can actually be automated?"
            sub="Real triggers, and what happens next without anyone having to remember."
          />
        </div>

        <ol>
          {ITEMS.map(([trigger, outcome], i) => (
            <li key={trigger} className="relative border-t border-border py-4 last:border-b">
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.05 + i * 0.1 }}
                className="absolute -top-px left-0 h-px w-full origin-left bg-accent/50"
              />
              <div className="flex items-baseline justify-between gap-6">
                <span className="text-[17px] text-text">{trigger}</span>
                <span className="text-right text-[15px] text-muted">
                  <span aria-hidden className="mr-2 text-accent">→</span>
                  {outcome}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
