"use client";

import { cn } from "@/lib/cn";
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

type Status = "Prototype" | "In Progress" | "Live";

/* Examples of how the services assemble into systems, not client case studies.
   Set `status` only when it is accurate; until then a card reads "Example workflow". */
const SYSTEMS: { name: string; flow: string[]; span: string; status?: Status }[] = [
  {
    name: "Lead Management System",
    flow: ["Website", "Lead", "AI", "Assignment", "Follow-up"],
    span: "lg:col-span-7",
  },
  {
    name: "Customer Communication System",
    flow: ["WhatsApp", "AI Context", "Human Handoff", "Follow-up"],
    span: "lg:col-span-5",
  },
  {
    name: "Booking Automation",
    flow: ["Booking", "Confirmation", "Reminder", "Reschedule", "Recovery"],
    span: "lg:col-span-7",
  },
  {
    name: "Revenue Recovery System",
    flow: ["Missed Lead", "Detection", "Follow-up", "Recovery"],
    span: "lg:col-span-5",
  },
];

export default function Work() {
  return (
    <Section id="work" className="border-t border-border">
      <div className="grid items-end gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <SectionHeading
          eyebrow="Selected systems"
          title={
            <>
              How the pieces <em>come together.</em>
            </>
          }
        />
        <Reveal delay={0.12}>
          <p className="max-w-md text-[16px] leading-relaxed text-muted md:text-[17px]">
            Example systems assembled from the services above. Illustrative workflows, not client case studies.
          </p>
        </Reveal>
      </div>
      <Stagger className={cn("mt-7", SWIPE_ROW, "md:grid-cols-2 lg:grid-cols-12")}>
        {SYSTEMS.map((s, i) => (
          <StaggerItem key={s.name} className={cn(SWIPE_ITEM, s.span)}>
            <SpotlightCard className="group flex h-full flex-col p-4 md:p-5">
              <div className="flex items-center justify-between">
                <span className="label text-accent">0{i + 1}</span>
                <Tag tone={s.status === "Live" ? "success" : s.status ? "warning" : "muted"}>
                  {s.status ?? "Example workflow"}
                </Tag>
              </div>
              <h3 className="mt-3 font-serif text-[26px] leading-tight transition-colors group-hover:text-accent">
                {s.name}
              </h3>
              <FlowChain steps={s.flow} className="mt-auto pt-4" />
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
      <SwipeHint>Swipe · 4 systems</SwipeHint>
    </Section>
  );
}
