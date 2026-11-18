"use client";

import { motion } from "motion/react";
import { EASE, Section, SectionHeading } from "./ui";

const ITEMS = ["A system built around your process, not a template", "One place for every request, customer and task", "AI that understands your business", "Routine work that runs itself", "Connected to your WhatsApp, calendar, email and tools", "We keep improving it with you"];

export default function WhatYouGet() {
  return (
    <Section id="get" grid="soft" className="warm-a bg-[#140e0a]">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          size="sm"
          title="A system that works while you sleep."
          sub="We design it, build it, connect it — and keep improving it with you."
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
