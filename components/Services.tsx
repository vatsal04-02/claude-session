"use client";

import { cn } from "@/lib/cn";
import { useDemo } from "@/lib/demo-context";
import {
  FlowChain,
  Reveal,
  Section,
  SectionHeading,
  SpotlightCard,
  Stagger,
  StaggerItem,
  SWIPE_ITEM,
  SWIPE_ROW,
  SwipeHint,
  Tag,
} from "./ui";

type Service = { n: string; name: string; body: string; flow: string[]; span: string; wide?: boolean };

const SERVICES: Service[] = [
  {
    n: "01",
    name: "AI CRM Systems",
    body: "Lead, customer, conversation, task and booking management.",
    flow: ["Lead", "Contact", "Pipeline", "Action"],
    span: "lg:col-span-7",
  },
  {
    n: "02",
    name: "Lead Automation",
    body: "Capture, assign, notify and follow up with new enquiries.",
    flow: ["Form", "AI", "Assign", "Follow-up"],
    span: "lg:col-span-5",
  },
  {
    n: "03",
    name: "WhatsApp Automation",
    body: "Turn conversations into structured business workflows.",
    flow: ["Message", "Context", "Reply / Handoff", "Follow-up"],
    span: "lg:col-span-4",
  },
  {
    n: "04",
    name: "Booking Automation",
    body: "Confirmations, reminders, rescheduling and follow-up.",
    flow: ["Booking", "Confirm", "Reminder", "Outcome"],
    span: "lg:col-span-4",
  },
  {
    n: "05",
    name: "Revenue Recovery",
    body: "Recover missed calls, stale leads, no-shows and delayed follow-ups.",
    flow: ["Missed", "Detect", "Follow-up", "Recover"],
    span: "lg:col-span-4",
  },
  {
    n: "06",
    name: "AI Business Assistants",
    body: "AI helpers built around business knowledge and internal workflows.",
    flow: ["Question", "Context", "AI", "Human"],
    span: "md:col-span-2 lg:col-span-12",
    wide: true,
  },
];

const TOOLS = ["WhatsApp", "Email", "Calendar", "Forms", "Payments", "CRM"];

export default function Services() {
  const { open } = useDemo();
  return (
    <Section id="services" className="border-t border-border">
      <div className="grid items-end gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <SectionHeading eyebrow="Services" title="Systems that do the repeat work." />
        <Reveal delay={0.12}>
          <p className="max-w-md text-[16px] leading-relaxed text-muted md:text-[17px]">
            We build the automation layer around the way your business already operates.
          </p>
        </Reveal>
      </div>

      <Stagger className={cn("mt-7", SWIPE_ROW, "md:grid-cols-2 lg:grid-cols-12")}>
        {SERVICES.map((s) => (
          <StaggerItem key={s.n} className={cn(SWIPE_ITEM, s.span)}>
            <SpotlightCard
              className={cn(
                "flex h-full flex-col p-4 md:p-5",
                s.wide && "md:flex-row md:items-center md:justify-between md:gap-8"
              )}
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="label text-accent">{s.n}</span>
                  <h3 className="font-serif text-[26px] leading-none">{s.name}</h3>
                </div>
                <p className="mt-3 max-w-[48ch] text-[14.5px] leading-snug text-muted">{s.body}</p>
              </div>
              <FlowChain steps={s.flow} className={cn("mt-auto pt-3.5", s.wide && "md:mt-0 md:pt-0")} />
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
      <SwipeHint>Swipe · 6 services</SwipeHint>

      {/* integrations strip */}
      <Reveal delay={0.1} className="mt-3 md:mt-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border border-border px-4 py-3">
          <span className="label text-accent">Connects with</span>
          <ul className="flex flex-wrap gap-1.5">
            {TOOLS.map((t) => (
              <li key={t}>
                <Tag tone="muted">{t}</Tag>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={open}
            className="group ml-auto inline-flex cursor-pointer items-center gap-2 text-[14px] text-text transition-colors hover:text-accent"
          >
            Something else? Tell us what to automate
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
