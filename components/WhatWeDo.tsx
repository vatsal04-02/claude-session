"use client";

import { motion } from "motion/react";
import { Database, Plug, Sparkles, Workflow, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE, Highlight, Reveal, Section, SectionHeading, Stagger, StaggerItem } from "./ui";

const BLOCKS: { name: string; body: string; icon: LucideIcon }[] = [
  { icon: Sparkles, name: "AI", body: "Reads every message and knows what the customer wants." },
  { icon: Database, name: "CRM", body: "Every lead, chat and booking in one place. Nothing slips." },
  { icon: Zap, name: "Automation", body: "Follow-ups, reminders and nudges — without anyone having to remember." },
  { icon: Plug, name: "Integrations", body: "WhatsApp, calls, calendar, email — plugged into how your team already works." },
];

/* Gradient-bordered card: lifts and glows on hover. */
function GlowCard({ children, strong, className }: { children: React.ReactNode; strong?: boolean; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "group relative h-full rounded-2xl bg-gradient-to-br p-px transition-shadow duration-300 hover:shadow-[0_20px_55px_-18px_rgba(234,106,47,0.5)]",
        strong ? "from-accent/75 via-accent/20 to-accent/40" : "from-accent/45 via-border to-accent/10",
        className
      )}
    >
      <div className={cn("relative h-full overflow-hidden rounded-[15px]", strong ? "bg-[#1d130e]" : "bg-surface")}>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(234,106,47,0.14),transparent_62%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="relative h-full">{children}</div>
      </div>
    </motion.div>
  );
}

const iconBox = "grid shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-[0_0_20px_-6px_rgba(234,106,47,0.5)]";

/* One primary Workflows block, four supporting blocks wired into it. */
export default function WhatWeDo() {
  return (
    <Section
      id="systems"
      className="bg-[#160f0b] [background-image:radial-gradient(ellipse_55%_38%_at_22%_10%,rgba(234,106,47,0.11),transparent_72%)]"
    >
      <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <SectionHeading eyebrow="What FlowHQ does" title={<>Not more software. A system that <Highlight>sells for you.</Highlight></>} />
        <Reveal delay={0.12}>
          <p className="max-w-[30rem] text-[16px] leading-[1.75] text-muted md:text-[17px]">
            We turn the daily chaos of enquiries, chats and bookings into one <Highlight delay={0.2}>connected</Highlight> system. The CRM is just one part.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 md:mt-14 lg:grid-cols-[5fr_7fr] lg:gap-14">
        <Reveal y={24}>
          <div className="relative h-full">
            <GlowCard strong>
              <div className="flex h-full flex-col p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <span className={cn(iconBox, "h-11 w-11")}>
                    <Workflow className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="text-[28px] font-medium leading-tight tracking-[-0.01em]">Workflows</h3>
                </div>
                <p className="mt-3 max-w-[28ch] text-[16px] leading-[1.7] text-muted">
                  Every enquiry, chat, booking and follow-up — one connected flow.
                </p>
              </div>
            </GlowCard>
            {/* pipeline: Workflows feeds the trunk that runs to the four blocks */}
            <span aria-hidden className="absolute left-full top-1/2 hidden h-px w-7 bg-gradient-to-r from-accent/70 to-accent/40 lg:block" />
          </div>
        </Reveal>

        <span aria-hidden className="mx-auto h-6 w-px bg-gradient-to-b from-accent/60 to-transparent lg:hidden" />

        <div className="relative">
          {/* trunk linking the blocks, with junction nodes */}
          <span aria-hidden className="absolute -left-7 bottom-[25%] top-[25%] hidden w-px bg-gradient-to-b from-accent/70 via-accent/35 to-accent/70 lg:block" />
          {["25%", "50%", "75%"].map((t) => (
            <span
              key={t}
              aria-hidden
              className="absolute -left-[31px] hidden h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_10px_rgba(234,106,47,0.9)] lg:block"
              style={{ top: `calc(${t} - 3px)` }}
            />
          ))}
          <Stagger className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-rows-2">
            {BLOCKS.map((b, i) => (
              <StaggerItem key={b.name} className="h-full">
                <div className="relative h-full">
                  <GlowCard>
                    <div className="h-full p-5 md:p-6">
                      <div className="flex items-center gap-3">
                        <span className={cn(iconBox, "h-9 w-9")}>
                          <b.icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                        </span>
                        <h3 className="item-title">{b.name}</h3>
                      </div>
                      <p className="mt-3 text-[16px] leading-[1.7] text-muted">{b.body}</p>
                    </div>
                  </GlowCard>
                  {/* left column joins the trunk; right column joins its neighbour */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute right-full top-1/2 hidden h-px lg:block",
                      i % 2 === 0 ? "w-7 bg-gradient-to-r from-accent/40 to-accent/70" : "w-4 bg-accent/40"
                    )}
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
