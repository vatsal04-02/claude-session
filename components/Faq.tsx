"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Reveal, Section, SectionHeading } from "./ui";

const FAQS = [
  ["How much does it cost?", "Every business is different. The free audit ends with a fixed quote for your setup — no hidden fees, no forced retainers. You approve the number before anything starts."],
  ["How long does setup take?", "Most systems go live within a few weeks. Your free audit includes an exact timeline for your business — connecting your tools, building the automations, and one onboarding call."],
  ["Is the WhatsApp automation legal?", "Yes. We use the official WhatsApp Business API, messages go only to customers who opted in, and everything runs inside Meta's rules. No spam, no bans."],
  ["What do you need from me to start?", "Access to the tools you already use, a walkthrough of the work you want automated, and one hour for an onboarding call. We handle everything else."],
  ["Who is this NOT for?", "If your work is already fully handled and nothing eats your team's day, you don't need us. We're also not a fit for enterprise custom builds."],
] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="bg-[#150e0a]">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow="FAQ" title="Fair questions." />
        </div>
        <Reveal>
          <ul className="border-b border-border">
            {FAQS.map(([q, a], i) => {
              const on = open === i;
              return (
                <li key={q} className="border-t border-border">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(on ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[18px] font-medium text-text transition-colors hover:text-accent md:text-[20px]"
                    >
                      {q}
                      <Plus className={cn("h-5 w-5 shrink-0 text-accent transition-transform duration-300", on && "rotate-45")} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`faq-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[40rem] pb-6 text-[16px] leading-[1.75] text-muted md:text-[17px]">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
