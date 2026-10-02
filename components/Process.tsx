"use client";

import { motion } from "motion/react";
import { EASE, Section, SectionHeading } from "./ui";

const STEPS = [
  ["Understand", "We map how your business handles customers and repetitive work."],
  ["Design", "We design the workflow and decide what to automate."],
  ["Build", "We build the website, CRM, AI and integrations."],
  ["Launch", "We launch it, then improve it from real usage."],
] as const;

export default function Process() {
  return (
    <Section id="process" grid="soft" className="warm-a bg-[#160f0b]">
      <SectionHeading size="sm" eyebrow="Process" title="How we build it." />
      <ol className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-14 lg:grid-cols-4 lg:gap-x-8">
        {STEPS.map(([name, body], i) => (
          <motion.li
            key={name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            className="relative border-t border-border pt-7"
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.25 }}
              className="absolute -top-px left-0 h-px w-full origin-left bg-accent"
            />
            <span className="absolute -top-[4px] left-0 h-[7px] w-[7px] rounded-full bg-accent" />
            <span className="label text-subtle">0{i + 1}</span>
            <h3 className="item-title mt-3">{name}</h3>
            <p className="mt-2 max-w-[30ch] text-[14.5px] leading-[1.7] text-muted md:text-[16px]">{body}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
