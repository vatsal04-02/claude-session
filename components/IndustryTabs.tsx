"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Reveal, Section, SectionHeading } from "./ui";
import RoiCalculator from "./RoiCalculator";

const INDUSTRIES = [
  {
    id: "clinics",
    label: "Clinics",
    items: [
      "Appointment booking on WhatsApp, no reply needed",
      "Reminders that cut no-shows",
      "Automatic follow-up for reports and Google reviews",
    ],
  },
  {
    id: "salons",
    label: "Salons & Spas",
    items: [
      "Booking confirmations in seconds",
      "Birthday and festival offers on autopilot",
      "Rebooking reminders that bring clients back",
    ],
  },
  {
    id: "restaurants",
    label: "Restaurants & Cafés",
    items: [
      "Table reservations over WhatsApp",
      "Festival and weekend offers to past visitors",
      "Review requests after every visit",
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    items: [
      "Instant replies to portal enquiries — before competitors call",
      "Site-visit scheduling with reminders",
      "Follow-up sequences for cold leads",
    ],
  },
  {
    id: "coaching",
    label: "Coaching",
    items: [
      "Admission enquiries answered instantly",
      "Fee follow-ups without awkward calls",
      "Batch and schedule reminders",
    ],
  },
] as const;

export default function IndustryTabs() {
  const [idx, setIdx] = useState(0);
  const cur = INDUSTRIES[idx];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (idx + (e.key === "ArrowRight" ? 1 : -1) + INDUSTRIES.length) % INDUSTRIES.length;
    setIdx(next);
    document.getElementById(`tab-${INDUSTRIES[next].id}`)?.focus();
  };

  return (
    <Section id="industries" className="bg-[#160f0b]">
      <SectionHeading
        eyebrow="Industries"
        title="Pick your business."
        sub="See exactly what FlowHQ would automate for you."
      />

      <Reveal className="mt-12 md:mt-14">
        <div
          role="tablist"
          aria-label="Industries"
          onKeyDown={onKey}
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          {INDUSTRIES.map((t, i) => {
            const on = i === idx;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                aria-selected={on}
                aria-controls="industry-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setIdx(i)}
                className={cn(
                  "relative shrink-0 cursor-pointer rounded-full border px-5 py-2.5 text-[15px] font-medium transition-colors",
                  on ? "border-transparent text-[#1a0a03]" : "border-border text-muted hover:border-accent/50 hover:text-text"
                )}
              >
                {on && (
                  <motion.span
                    layoutId="industry-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div
          id="industry-panel"
          role="tabpanel"
          aria-labelledby={`tab-${cur.id}`}
          className="mt-5 rounded-2xl border border-border bg-surface p-6 md:p-10"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="label text-accent">What FlowHQ automates · {cur.label}</div>
              <ul className="mt-6 divide-y divide-border">
                {cur.items.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.08, duration: 0.45, ease: EASE }}
                    className="flex items-start gap-4 py-4 text-[17px] leading-[1.6] text-text md:text-[19px]"
                  >
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent/10 text-accent">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {it}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      <RoiCalculator />
    </Section>
  );
}
