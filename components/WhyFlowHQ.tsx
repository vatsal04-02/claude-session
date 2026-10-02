"use client";

import { Handshake, Link2, Sparkles, Target } from "lucide-react";
import { Section, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "./ui";

const POINTS = [
  { icon: Target, title: "Built around your business", body: "We start from how you actually work, not a template." },
  { icon: Sparkles, title: "AI with a purpose", body: "AI only where it saves time or improves a decision." },
  { icon: Link2, title: "One connected system", body: "Website, CRM, WhatsApp and bookings talk to each other." },
  { icon: Handshake, title: "Human when it matters", body: "Your team steps in at the moments that need a person." },
];

export default function WhyFlowHQ() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why FlowHQ"
        title={
          <>
            Practical systems, <span className="grad-text">built with care</span>.
          </>
        }
      />
      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20">
        {POINTS.map((p, i) => (
          <StaggerItem key={p.title} className="h-full">
            <SpotlightCard className="relative flex h-full gap-5 overflow-hidden p-7 md:p-8">
              <span className="label absolute right-6 top-5 text-[11px] text-border-bright">0{i + 1}</span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                <p.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
