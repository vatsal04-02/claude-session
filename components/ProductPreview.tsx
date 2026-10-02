"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Counter, EASE, Reveal, Section, SectionHeading, StatusDot, Tag, Typewriter, useOnScreen, useTicker } from "./ui";

/* Fictional sample data, labelled as such in the UI. */
const LEADS = [
  {
    name: "Rahul Sharma",
    service: "Physiotherapy Consultation",
    summary: "High-intent enquiry. Requested evening appointment.",
    next: "Call within 15 minutes.",
  },
  {
    name: "Ananya Mehta",
    service: "Gym trial pass",
    summary: "Asked about trial timings and pricing. Prefers mornings.",
    next: "Send trial slots on WhatsApp.",
  },
  {
    name: "Vikram Rao",
    service: "3BHK site visit",
    summary: "Called twice this week. Viewed two listings.",
    next: "Call back and offer Saturday.",
  },
];

export default function ProductPreview() {
  const reduce = useReducedMotion();
  const [ref, inView] = useOnScreen<HTMLDivElement>();
  const [sel, setSel] = useState(0);
  const tick = useTicker(3600, inView && !reduce);
  const lead = LEADS[sel];

  const metrics = [
    { label: "New Leads", value: 12 + Math.floor(tick / 2) },
    { label: "Follow-ups Due", value: 8 + Math.floor(tick / 4) },
    { label: "Appointments", value: 5 + Math.floor(tick / 3) },
    { label: "Revenue at Risk", value: 42500 - Math.floor(tick / 3) * 3500, prefix: "₹", warn: true },
  ];

  return (
    <Section id="product" className="border-t border-border">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-12">
        <SectionHeading
          eyebrow="The shared workspace"
          title={
            <>
              Everything important, <em>in one place.</em>
            </>
          }
          sub={
            <>
              <p>
                Behind the automation is a shared system for leads, customers, conversations, tasks and
                bookings.
              </p>
              <ul className="mt-4 hidden flex-wrap gap-1.5 sm:flex">
                {["Leads", "Customers", "Conversations", "Tasks", "Bookings"].map((t) => (
                  <li key={t}>
                    <Tag tone="muted">{t}</Tag>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-subtle">Pick a lead to see what the AI prepared.</p>
            </>
          }
        />

        <Reveal y={30}>
          <div ref={ref} className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="label text-accent">Today</span>
              <Tag tone="muted">Sample data</Tag>
            </div>

            <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={cn("px-4 py-3 md:px-5 md:py-4", i > 0 && "sm:border-l sm:border-border", i % 2 === 1 && "border-l border-border sm:border-l", i > 1 && "border-t border-border sm:border-t-0")}
                >
                  <div className="text-[12px] text-muted">{m.label}</div>
                  <div className={cn("mt-1 font-serif text-[26px] leading-none md:text-[32px]", m.warn && "text-accent")}>
                    <Counter to={m.value} prefix={m.prefix} duration={0.9} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <ul role="listbox" aria-label="Sample leads" className="border-b border-border p-2 md:border-b-0 md:border-r">
                {LEADS.map((l, i) => {
                  const on = i === sel;
                  return (
                    <li key={l.name}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={on}
                        onClick={() => setSel(i)}
                        className={cn(
                          "relative flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors md:py-3",
                          on ? "text-text" : "text-muted hover:bg-surface-2"
                        )}
                      >
                        {on && (
                          <motion.span
                            layoutId="lead-hl"
                            className="absolute inset-0 rounded-lg border border-accent/40 bg-accent/[0.08]"
                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                          />
                        )}
                        <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-[11px] text-accent">
                          {l.name.split(" ").map((p) => p[0]).join("")}
                        </span>
                        <span className="relative min-w-0">
                          <span className="block truncate text-[14px] font-medium">{l.name}</span>
                          <span className="block truncate text-[12px] text-subtle">{l.service}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="p-4 md:p-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={lead.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <div className="font-serif text-[28px] leading-tight">{lead.name}</div>
                    <div className="text-sm text-muted">{lead.service}</div>

                    <div className="mt-5">
                      <div className="label mb-1.5 flex items-center gap-2 text-[10px] text-accent">
                        <StatusDot tone="accent" /> AI Summary
                      </div>
                      <Typewriter text={lead.summary} className="text-[15px] leading-relaxed" />
                    </div>

                    <div className="mt-4 rounded-lg border border-border bg-bg/50 px-4 py-3">
                      <div className="label text-[10px] text-subtle">Next action</div>
                      <div className="mt-0.5 text-[15px]">{lead.next}</div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <span className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-[13px] font-medium text-[#1a0a03]">
                        <Phone className="h-3.5 w-3.5" /> Call
                      </span>
                      <span className="inline-flex h-9 items-center gap-2 rounded-full border border-border-bright px-4 text-[13px] text-text">
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
