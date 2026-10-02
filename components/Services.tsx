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

type Service = {
  n: string;
  name: string;
  body: string;
  span: string;
  flow?: string[];
  chips?: string[];
  cta?: boolean;
};

const SERVICES: Service[] = [
  {
    n: "01",
    name: "AI CRM Systems",
    body: "One connected workspace for leads, customers, conversations, tasks and bookings.",
    flow: ["Lead", "Contact", "Pipeline", "Action"],
    span: "lg:col-span-7",
  },
  {
    n: "02",
    name: "Lead Automation",
    body: "Capture enquiries, assign ownership and trigger the next step automatically.",
    flow: ["Form", "AI", "Assign", "Follow-up"],
    span: "lg:col-span-5",
  },
  {
    n: "03",
    name: "WhatsApp Automation",
    body: "Turn customer conversations into structured workflows instead of scattered chats.",
    flow: ["Message", "Context", "Reply / Handoff", "Follow-up"],
    span: "lg:col-span-5",
  },
  {
    n: "04",
    name: "Booking Automation",
    body: "Automate confirmations, reminders, rescheduling and follow-up.",
    flow: ["Booking", "Confirm", "Remind", "Outcome"],
    span: "lg:col-span-7",
  },
  {
    n: "05",
    name: "Revenue Recovery",
    body: "Recover opportunities that disappear through missed calls, stale leads, no-shows and delayed follow-ups.",
    flow: ["Missed", "Detect", "Follow-up", "Recover"],
    span: "lg:col-span-7",
  },
  {
    n: "06",
    name: "AI Business Assistants",
    body: "AI assistants that understand your business information and help your team work faster.",
    flow: ["Question", "Context", "AI", "Human"],
    span: "lg:col-span-5",
  },
  {
    n: "07",
    name: "Integrations",
    body: "Connect the tools your team already uses.",
    chips: ["WhatsApp", "Email", "Calendar", "Forms", "Payments", "CRM", "Internal tools"],
    span: "lg:col-span-5",
  },
  {
    n: "08",
    name: "Custom Automation",
    body: "Have a repetitive process? We can map it, build it and automate it.",
    cta: true,
    span: "lg:col-span-7",
  },
];

export default function Services() {
  const { open } = useDemo();
  return (
    <Section id="services" className="border-t border-border">
      <div className="grid items-end gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Systems that do the <em>repeat work.</em>
            </>
          }
        />
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
                s.cta && "border-accent/40 bg-accent/[0.05]"
              )}
            >
              <div className="flex items-baseline gap-3">
                <span className="label text-accent">{s.n}</span>
                <h3 className="font-serif text-[26px] leading-none">{s.name}</h3>
              </div>
              <p className="mt-3 max-w-[48ch] text-[14.5px] leading-snug text-muted">{s.body}</p>

              <div className="mt-auto pt-3.5">
                {s.flow && <FlowChain steps={s.flow} />}
                {s.chips && (
                  <ul className="flex flex-wrap gap-1.5">
                    {s.chips.map((c) => (
                      <li key={c}>
                        <Tag tone="muted">{c}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
                {s.cta && (
                  <button
                    type="button"
                    onClick={open}
                    className="group inline-flex cursor-pointer items-center gap-2 text-left text-[15px] text-accent transition-colors hover:text-accent-2"
                  >
                    Tell us what you want to automate
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                )}
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
      <SwipeHint>Swipe · 8 services</SwipeHint>
    </Section>
  );
}
