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
} from "./ui";

const SERVICES = [
  {
    name: "Operations Automation",
    body: "The back-office work nobody wants: data entry, approvals, document handling, routine reports.",
    flow: ["Request", "AI", "Approval", "Done"],
  },
  {
    name: "AI Business Assistants",
    body: "An assistant trained on your business, not a generic chatbot. It answers, decides and hands off to your team.",
    flow: ["Question", "Context", "AI", "Human"],
  },
  {
    name: "Internal Tools & Dashboards",
    body: "Custom screens for your team: jobs, orders, stock and staff in one view.",
    flow: ["Data", "Rules", "Screen", "Action"],
  },
  {
    name: "Integrations & Data Sync",
    body: "WhatsApp, CRM, sheets, accounting and calendar kept in sync without copy-paste.",
    flow: ["Tool A", "Sync", "Tool B", "Check"],
  },
  {
    name: "Customer Communication",
    body: "WhatsApp and email flows that confirm, remind, answer and hand off to a person.",
    flow: ["Message", "Context", "Handoff", "Follow-up"],
  },
  {
    name: "Reporting & Alerts",
    body: "Daily and weekly numbers delivered to you, with an alert the moment something breaks.",
    flow: ["Data", "Rollup", "Report", "Alert"],
  },
];

export default function Services() {
  const { open } = useDemo();
  return (
    <Section id="services" grid="strong" className="warm-a bg-[#140e0a]">
      <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <SectionHeading title="Custom systems for repeat work." />
        <Reveal delay={0.12}>
          <p className="max-w-[30rem] text-[16px] leading-[1.75] text-text md:text-[17px]">
            We automate the work that eats your day. Each system is scoped to your business and built around the way you already operate.
          </p>
        </Reveal>
      </div>

      <Stagger className={cn("mt-12 md:mt-14", SWIPE_ROW, "md:grid-cols-2 md:gap-5 lg:grid-cols-3")}>
        {SERVICES.map((s, i) => (
          <StaggerItem key={s.name} className={SWIPE_ITEM}>
            <SpotlightCard className="group relative flex h-full flex-col overflow-hidden p-7 md:p-8">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-accent/50 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="label flex items-center gap-2 text-subtle">
                <span className="h-1.5 w-1.5 rounded-full bg-border-bright transition-colors duration-300 group-hover:bg-accent" />
                0{i + 1}
              </span>
              <h3 className="item-title mt-4">{s.name}</h3>
              <p className="mt-2 max-w-[34ch] text-[16px] leading-[1.7] text-muted">{s.body}</p>
              <FlowChain steps={s.flow} className="mt-auto pt-6" />
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
      <SwipeHint>Swipe · 6 services</SwipeHint>

      <Reveal delay={0.1} className="mt-8 md:mt-10">
        <p className="max-w-[40rem] text-[16px] leading-[1.75] text-muted">
          Connects with WhatsApp, email, calendar, forms, payments, accounting and your CRM.{" "}
          <button
            type="button"
            onClick={open}
            className="group inline-flex cursor-pointer items-center gap-1.5 text-text underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent"
          >
            Something else? Tell us what to automate
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </p>
      </Reveal>
    </Section>
  );
}
