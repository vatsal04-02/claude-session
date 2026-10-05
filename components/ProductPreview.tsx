"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Globe, Mail, MessageCircle, Phone, PhoneMissed } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Counter, EASE, Reveal, Section, SectionHeading, StatusDot, Tag, Typewriter, useOnScreen, useTicker } from "./ui";

/* Fictional sample data, labelled as such in the UI. */
const LEADS = [
  {
    name: "New Service Enquiry",
    service: "Requested a callback",
    source: "Website form",
    icon: Globe,
    intent: "High",
    summary: "Customer is interested and expects a response today.",
    next: "Call within 15 minutes.",
  },
  {
    name: "Product Enquiry",
    service: "Asked about availability",
    source: "WhatsApp",
    icon: MessageCircle,
    intent: "Medium",
    summary: "Wants details and next steps before deciding.",
    next: "Send details on WhatsApp.",
  },
  {
    name: "Callback Request",
    service: "Missed call, no message",
    source: "Phone",
    icon: PhoneMissed,
    intent: "High",
    summary: "Called twice and left no message. Likely still interested.",
    next: "Call back and log the outcome.",
  },
  {
    name: "Website Lead",
    service: "Submitted the contact form",
    source: "Contact form",
    icon: Mail,
    intent: "Medium",
    summary: "Interested, but has not said what they need yet.",
    next: "Send a short qualifying message.",
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
    <Section id="product" space="lg" grid="soft" className="overflow-x-clip bg-[#150e0a]">
      <SectionHeading
        eyebrow="The control center"
        title="Everything important, in one place."
        sub="A shared system for leads, conversations, bookings and follow-up."
      />

      <Reveal y={30} className="relative mt-12 md:mt-14">
        {/* soft warm halo so the preview lifts off the page */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-12 -inset-y-14 bg-[radial-gradient(ellipse_at_center,rgba(160,75,35,0.28),transparent_65%)] blur-2xl"
        />
          <div ref={ref} className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-7">
              <span className="label text-[10px] text-subtle">Today</span>
              <span className="label text-[10px] text-subtle">Sample data</span>
            </div>

            <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={cn("px-5 py-4 md:px-7 md:py-6", i > 0 && "sm:border-l sm:border-border", i % 2 === 1 && "border-l border-border sm:border-l", i > 1 && "border-t border-border sm:border-t-0")}
                >
                  <div className="text-[12px] text-muted">{m.label}</div>
                  <div className={cn("mt-1 text-[26px] font-medium leading-none tracking-tight md:text-[32px]", m.warn && "text-accent")}>
                    <Counter to={m.value} prefix={m.prefix} duration={0.9} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <ul role="listbox" aria-label="Sample leads" className="no-scrollbar flex gap-2 overflow-x-auto border-b border-border p-2 md:block md:space-y-1 md:border-b-0 md:border-r">
                {LEADS.map((l, i) => {
                  const on = i === sel;
                  return (
                    <li key={l.name} className="w-[200px] shrink-0 md:w-auto">
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
                        <span className="relative min-w-0">
                          <span className="block truncate text-[14px] font-medium">{l.name}</span>
                          <span className="block truncate text-[12px] text-subtle">{l.service}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="p-5 md:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={lead.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <div className="item-title text-[24px]">{lead.name}</div>
                    <div className="text-sm text-muted">{lead.service}</div>
                    <div className="mt-1 text-[13px] text-subtle">{lead.intent} interest · {lead.source}</div>

                    <div className="mt-5">
                      <div className="label mb-1.5 flex items-center gap-2 text-[10px] text-accent">
                        <StatusDot tone="accent" /> AI Summary
                      </div>
                      <Typewriter text={lead.summary} className="text-[16px] leading-[1.7]" />
                    </div>

                    <div className="mt-4 rounded-lg border border-border bg-bg/50 px-4 py-3">
                      <div className="label text-[10px] text-subtle">Next step</div>
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
    </Section>
  );
}
