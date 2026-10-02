"use client";

import { motion } from "motion/react";
import { EASE, Section, SectionHeading } from "./ui";

const ITEMS = ["Website / Lead Capture", "CRM", "AI Layer", "Automation", "Integrations", "Ongoing Support"];

export default function WhatYouGet() {
  return (
    <Section id="get" className="border-t border-border bg-bg-soft">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          size="sm"
          eyebrow="Implementation partner"
          title="What you get with FlowHQ."
          sub="We don't just hand you software. We design, build, connect and improve the system with you."
        />
        <ol className="grid grid-cols-2 gap-x-6 md:gap-x-8">
          {ITEMS.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
              className="flex items-baseline gap-3 border-t border-border py-4 md:gap-4 md:py-5"
            >
              <span className="label text-subtle">0{i + 1}</span>
              <span className="text-[15px] leading-snug text-text md:text-[17px]">{it}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
