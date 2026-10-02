"use client";

import { Database, Plug, Sparkles, Workflow, Zap, type LucideIcon } from "lucide-react";
import { FlowChain, Reveal, Section, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "./ui";

const BLOCKS: { icon: LucideIcon; name: string; body: string }[] = [
  { icon: Sparkles, name: "AI", body: "Understands enquiries and business context." },
  { icon: Database, name: "CRM", body: "Keeps leads, customers and conversations organized." },
  { icon: Zap, name: "Automation", body: "Moves repetitive work forward automatically." },
  { icon: Plug, name: "Integrations", body: "Connects WhatsApp, email, calendar and other tools." },
];

export default function WhatWeDo() {
  return (
    <Section id="systems" className="border-t border-border">
      <div className="grid items-end gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <SectionHeading
          eyebrow="What FlowHQ does"
          title={
            <>
              What we actually <em>build.</em>
            </>
          }
        />
        <Reveal delay={0.12}>
          <p className="text-[17px] leading-relaxed text-text">
            We turn repetitive business processes into connected systems.
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            A CRM is one block. The system is all five working together.
          </p>
        </Reveal>
      </div>

      <div className="mt-7">
        <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {BLOCKS.map((b, i) => (
            <StaggerItem key={b.name} className="h-full">
              <SpotlightCard className="relative h-full p-4 md:p-5">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
                    <b.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="label text-[10px] text-subtle">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-serif text-[26px] leading-none">{b.name}</h3>
                <p className="mt-2 text-[14.5px] leading-snug text-muted">{b.body}</p>

                {/* connector down into the Workflows layer (desktop) */}
                <span aria-hidden className="absolute left-1/2 top-full hidden h-8 w-px bg-border lg:block">
                  <span className="drip absolute -left-[2px] top-0 h-[5px] w-[5px] rounded-full bg-accent" style={{ "--d": `${i * 0.7}s` } as React.CSSProperties} />
                </span>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-3 lg:mt-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-accent/40 bg-accent/[0.06] p-4 md:flex-row md:items-center md:justify-between md:p-5">
            <div className="flex items-center gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-[#1a0a03]">
                <Workflow className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-serif text-[26px] leading-none">Workflows</h3>
                <p className="mt-1.5 text-[14.5px] leading-snug text-muted">
                  Turns the entire process into one connected system.
                </p>
              </div>
            </div>
            <FlowChain
              className="hidden md:flex"
              steps={["Capture", "Understand", "Manage", "Automate", "Act"]}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
