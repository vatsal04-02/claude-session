"use client";

import { FlowChain, Reveal, Section, SectionHeading, Stagger, StaggerItem, Tag } from "./ui";

type Status = "Prototype" | "In Progress" | "Live";

/* Illustrative workflows, not client case studies.
   Add `status` only when it is accurate; a badge then appears on that row. */
const SYSTEMS: { name: string; flow: string[]; status?: Status }[] = [
  { name: "Lead Management", flow: ["Website", "Lead", "AI", "Assignment", "Follow-up"] },
  { name: "Customer Communication", flow: ["WhatsApp", "AI Context", "Human Handoff", "Follow-up"] },
  { name: "Booking Automation", flow: ["Booking", "Confirmation", "Reminder", "Reschedule", "Recovery"] },
  { name: "Revenue Recovery", flow: ["Missed Lead", "Detection", "Follow-up", "Recovery"] },
];

export default function Work() {
  return (
    <Section id="work" className="">
      <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <SectionHeading size="sm" eyebrow="Selected systems" title="How the pieces come together." />
        <Reveal delay={0.12}>
          <span className="label text-accent">Illustrative workflow</span>
          <p className="mt-2 max-w-[30rem] text-[16px] leading-[1.75] text-muted">
            Examples of how the pieces connect, not client case studies.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-10 grid gap-x-16 md:mt-12 md:grid-cols-2">
        {SYSTEMS.map((s) => (
          <StaggerItem key={s.name} className="border-t border-border py-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="item-title">{s.name}</h3>
              {s.status && <Tag tone={s.status === "Live" ? "success" : "warning"}>{s.status}</Tag>}
            </div>
            <FlowChain steps={s.flow} className="mt-4" />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
