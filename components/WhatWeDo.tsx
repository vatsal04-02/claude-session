"use client";

import { motion } from "motion/react";
import { Database, Plug, Sparkles, Workflow, Zap, type LucideIcon } from "lucide-react";
import { EASE, Reveal, Section, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "./ui";

const BLOCKS: { icon: LucideIcon; name: string; body: string; role: string }[] = [
  { icon: Sparkles, name: "AI", role: "Understands", body: "Understands enquiries and business context." },
  { icon: Database, name: "CRM", role: "Remembers", body: "Keeps leads, customers and conversations organized." },
  { icon: Zap, name: "Automation", role: "Acts", body: "Moves repetitive work forward automatically." },
  { icon: Plug, name: "Integrations", role: "Connects", body: "Connects WhatsApp, email, calendar and other tools." },
];
const STEPS = ["Capture", "Understand", "Manage", "Automate", "Act"];

/* Systems-architecture view: one primary Workflows layer, four smaller blocks wired into it. */
export default function WhatWeDo() {
  return (
    <Section id="systems" className="border-t border-border">
      <div className="grid items-end gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <SectionHeading eyebrow="What FlowHQ does" title="What we actually build." />
        <Reveal delay={0.12}>
          <p className="text-[17px] leading-relaxed text-text">
            We turn repetitive business processes into connected systems.
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            A CRM is one block. The system is all five working together.
          </p>
        </Reveal>
      </div>

      <div className="mt-7 grid gap-3 lg:grid-cols-[5fr_7fr] lg:gap-14">
        {/* primary block */}
        <Reveal y={24}>
          <div className="relative flex h-full flex-col rounded-2xl border border-accent/40 bg-accent/[0.05] p-5 md:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-[#1a0a03]">
                <Workflow className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="label text-accent">The core · 05</span>
            </div>
            <h3 className="mt-4 font-serif text-[36px] leading-none md:text-[40px]">Workflows</h3>
            <p className="mt-2 max-w-[30ch] text-[15px] leading-snug text-muted">
              Turns the entire process into one connected system.
            </p>
            <ol className="relative mt-4 flex flex-wrap gap-x-4 gap-y-1.5 lg:block lg:space-y-1.5">
              <span aria-hidden className="absolute bottom-2 left-[3px] top-2 hidden w-px bg-accent/40 lg:block" />
              {STEPS.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: EASE }}
                  className="relative flex items-center gap-3 text-[14px] text-text"
                >
                  <span className="relative h-[7px] w-[7px] rounded-full bg-accent" />
                  {s}
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* four supporting blocks, wired to the core */}
        <Stagger className="grid grid-cols-2 gap-3 lg:grid-rows-2">
          {BLOCKS.map((b, i) => (
            <StaggerItem key={b.name} className="h-full">
              <SpotlightCard className="relative h-full p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
                    <b.icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-serif text-[24px] leading-none">{b.name}</h3>
                </div>
                <p className="mt-3 text-[14px] leading-snug text-muted">{b.body}</p>
                <div className="label absolute bottom-3.5 left-4 hidden items-center gap-2 text-[10px] text-accent/80 lg:flex">
                  <span className="h-1 w-1 rounded-full bg-accent" /> {b.role}
                </div>

                {/* connector: left column wires into the core, right column into its neighbour */}
                <span
                  aria-hidden
                  className={`absolute right-full top-1/2 hidden h-px bg-border lg:block ${i % 2 === 0 ? "w-14" : "w-3"}`}
                >
                  {i % 2 === 0 && (
                    <span
                      className="drip-x absolute left-0 top-[-2px] h-[5px] w-[5px] rounded-full bg-accent"
                      style={{ "--d": `${i * 0.6}s` } as React.CSSProperties}
                    />
                  )}
                </span>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
