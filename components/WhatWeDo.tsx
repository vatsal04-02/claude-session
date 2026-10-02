"use client";

import { motion } from "motion/react";
import { EASE, Highlight, Reveal, Section, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "./ui";

const BLOCKS = [
  { name: "AI", body: "Reads every message and knows what the customer wants." },
  { name: "CRM", body: "Every lead, chat and booking in one place. Nothing slips." },
  { name: "Automation", body: "Follow-ups, reminders and nudges — without anyone having to remember." },
  { name: "Integrations", body: "WhatsApp, calls, calendar, email — plugged into how your team already works." },
];
const STEPS = ["Capture", "Understand", "Manage", "Automate", "Act"];

/* One primary Workflows block, four supporting blocks wired into it. */
export default function WhatWeDo() {
  return (
    <Section id="systems" className="bg-[#160f0b]">
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
          <div className="flex h-full flex-col rounded-2xl border border-accent/40 bg-accent/[0.04] p-6 md:p-8">
            <h3 className="text-[28px] font-medium leading-tight tracking-[-0.01em]">Workflows</h3>
            <p className="mt-2 max-w-[28ch] text-[16px] leading-[1.7] text-muted">
              Every enquiry, chat, booking and follow-up — one connected flow.
            </p>
            <ol className="relative mt-8 flex flex-wrap gap-x-5 gap-y-2 lg:block lg:space-y-2.5">
              <span aria-hidden className="absolute bottom-2 left-[3px] top-2 hidden w-px bg-accent/40 lg:block" />
              {STEPS.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: EASE }}
                  className="relative flex items-center gap-3 text-[15px] text-text"
                >
                  <span className="h-[7px] w-[7px] rounded-full bg-accent" />
                  {s}
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-rows-2">
          {BLOCKS.map((b, i) => (
            <StaggerItem key={b.name} className="h-full">
              <SpotlightCard className="relative h-full p-5 md:p-6">
                <h3 className="item-title">{b.name}</h3>
                <p className="mt-2 text-[16px] leading-[1.7] text-muted">{b.body}</p>
                <span
                  aria-hidden
                  className={`absolute right-full top-1/2 hidden h-px bg-border lg:block ${i % 2 === 0 ? "w-14" : "w-4"}`}
                />
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
