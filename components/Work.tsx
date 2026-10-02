"use client";

import { FlowChain, Reveal, Section, SectionHeading, Stagger, StaggerItem, Tag } from "./ui";

type Status = "Prototype" | "In Progress" | "Live";

/* Illustrative workflows, not client case studies.
   Set `status` only when it is accurate; until then each reads "Illustrative workflow". */
const SYSTEMS: { name: string; flow: string[]; status?: Status }[] = [
  { name: "Lead Management", flow: ["Website", "Lead", "AI", "Assignment", "Follow-up"] },
  { name: "Customer Communication", flow: ["WhatsApp", "AI Context", "Human Handoff", "Follow-up"] },
  { name: "Booking Automation", flow: ["Booking", "Confirmation", "Reminder", "Reschedule", "Recovery"] },
  { name: "Revenue Recovery", flow: ["Missed Lead", "Detection", "Follow-up", "Recovery"] },
];

export default function Work() {
  return (
    <Section id="work" className="border-t border-border">
      <div className="grid items-end gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <SectionHeading size="sm" eyebrow="Selected systems" title="How the pieces come together." />
        <Reveal delay={0.12}>
          <p className="max-w-md text-[15px] leading-relaxed text-muted">
            Examples of systems assembled from our services. Not client case studies.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-6 grid gap-x-10 md:grid-cols-2">
        {SYSTEMS.map((s, i) => (
          <StaggerItem key={s.name} className="group border-t border-border py-4 md:py-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-baseline gap-3">
                <span className="label text-accent">0{i + 1}</span>
                <h3 className="font-serif text-[24px] leading-none transition-colors group-hover:text-accent">
                  {s.name}
                </h3>
              </div>
              <Tag tone={s.status === "Live" ? "success" : s.status ? "warning" : "muted"}>
                {s.status ?? "Illustrative workflow"}
              </Tag>
            </div>
            <FlowChain steps={s.flow} className="mt-4" />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
