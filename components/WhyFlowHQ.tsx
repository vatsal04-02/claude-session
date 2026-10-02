"use client";

import { motion } from "motion/react";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE, Highlight, Reveal, Section, SectionHeading } from "./ui";

const WITHOUT = ["Website", "WhatsApp", "Spreadsheet", "Calendar", "Manual follow-up", "Missed context"];
const WITH = ["Website", "AI", "CRM", "Automation", "Communication", "Human action"];
const JITTER = [0, 14, -10, 10, -6, 6]; // the "without" column is deliberately untidy

const POINTS = [
  "Works with the tools you already use",
  "Built around how your team operates",
  "People stay in control where it matters",
];

export default function WhyFlowHQ() {
  return (
    <Section id="why" className="warm-b bg-[#160f0b]">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Why FlowHQ"
            title={
              <>
                Not another tool. A <Highlight>system</Highlight> built around your business.
              </>
            }
            sub="Most businesses don't need more software. They need their existing tools and workflows to work together."
          />
          <ul className="mt-8 hidden space-y-3 sm:block">
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
        </div>

        <Reveal y={28}>
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-surface">
            <Column label="Without FlowHQ" items={WITHOUT} broken />
            <Column label="With FlowHQ" items={WITH} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Column({ label, items, broken }: { label: string; items: string[]; broken?: boolean }) {
  const last = items.length - 1;
  return (
    <div className={cn("px-3 pb-7 pt-6 md:px-8", !broken && "border-l border-border bg-accent/[0.04]")}>
      <div className={cn("label mb-5 text-center text-[10px]", broken ? "text-subtle" : "text-accent")}>{label}</div>
      <ol className="flex flex-col items-center">
        {items.map((it, i) => (
          <li key={it} className="flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (broken ? 0.1 : 0.5) + i * 0.12, duration: 0.5, ease: EASE }}
              style={broken ? { x: JITTER[i] } : undefined}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-[13px]",
                broken
                  ? i === last
                    ? "border-dashed border-danger/60 text-danger"
                    : "border-dashed border-border-bright text-muted"
                  : i === last
                  ? "border-accent bg-accent font-medium text-[#1a0a03]"
                  : "border-accent/50 bg-accent/10 text-text"
              )}
            >
              {broken && i === last && <TriangleAlert className="h-3.5 w-3.5" />}
              {it}
            </motion.span>
            {i < last &&
              (broken ? (
                <span aria-hidden className="h-3 border-l border-dashed border-border-bright" />
              ) : (
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.35 }}
                  className="h-3 w-px origin-top bg-accent"
                />
              ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
