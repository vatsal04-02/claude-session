"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
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

/* A trigger → outcome list. Each row's orange line sweeps across, then its check lights up. */
export default function AutomationList() {
  return (
    <Section id="automations" className="border-t border-border">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            eyebrow="Automation examples"
            title="What can actually be automated?"
            sub="Real triggers, and what happens next without anyone having to remember."
          />
        </div>

        <ol>
          {ITEMS.map(([trigger, outcome], i) => (
            <li key={trigger} className="relative border-t border-border py-2.5 last:border-b">
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.05 + i * 0.12 }}
                className="absolute -top-px left-0 h-px w-full origin-left bg-accent/60"
              />
              <div className="flex items-center gap-x-3">
                <motion.span
                  initial={{ backgroundColor: "rgba(234,106,45,0)", borderColor: "rgba(255,235,215,0.2)" }}
                  whileInView={{ backgroundColor: "rgba(234,106,45,1)", borderColor: "rgba(234,106,45,1)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[#1a0a03]"
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </motion.span>
                <span className="text-[15px] text-text sm:text-[16px]">{trigger}</span>
                <span aria-hidden className="hidden h-px flex-1 bg-border sm:block" />
                <span className="ml-auto text-right text-[13px] text-accent sm:ml-0 sm:text-left sm:text-[14.5px]">
                  <span aria-hidden className="mr-1.5 hidden text-muted sm:inline">→</span>
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
