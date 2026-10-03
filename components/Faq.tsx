"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Reveal, Section, SectionHeading } from "./ui";

const FAQS = [
  ["Will WhatsApp ban my number?", "No. We use the official WhatsApp Business API, messages go only to people who opted in, and everything runs inside Meta's rules."],
  ["Does it replace my staff?", "No. It handles the repetitive work — replies, reminders, follow-ups. Your team steps in exactly where humans win."],
  ["Do you support Hindi?", "Yes. Hindi, English and Hinglish — whatever your customers speak."],
  ["What does it cost?", "Every project is scoped and quoted upfront after a free audit. WhatsApp message charges are pay-as-you-go at Meta's official rates — you see the cost before anything is sent."],
  ["How long does setup take?", "Most systems are live in 7–14 days."],
] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="bg-[#160f0b]">
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
