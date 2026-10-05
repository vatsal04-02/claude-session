"use client";

import { motion } from "motion/react";
import { EASE, Highlight, Section, SectionHeading } from "./ui";

const POINTS = [
  "Works with the tools you already use",
  "Built around how your team operates",
  "People stay in control where it matters",
];

export default function WhyFlowHQ() {
  return (
    <Section id="why" grid="soft" className="warm-b bg-[#160f0b]">
      <SectionHeading
        eyebrow="Why FlowHQ"
        title={
          <>
            You&apos;ve got enough tools. You need them to <Highlight>work as one.</Highlight>
          </>
        }
        sub="Most businesses don't need more software. They need their existing tools and workflows to work together."
      />
      <ul className="mt-8 space-y-3">
        {POINTS.map((p, i) => (
          <motion.li
            key={p}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: EASE }}
            className="text-[16px] text-muted"
          >
            {p}
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
