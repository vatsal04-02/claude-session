"use client";

import { motion } from "motion/react";
import { Clock, Layers, PhoneMissed, TrendingDown } from "lucide-react";
import { Section, SectionHeading, SpotlightCard, Stagger, StaggerItem, StatusDot } from "./ui";

/* ----- tiny animated indicators, one per problem ----- */

function MissedIndicator() {
  const sources = ["Form", "Call", "WhatsApp"];
  return (
    <div className="flex items-center gap-2">
      {sources.map((s, i) => (
        <motion.span
          key={s}
          animate={{ opacity: [1, 1, 0.35, 1], y: [0, 0, 3, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.8, times: [0, 0.5, 0.7, 1] }}
          className="label flex items-center gap-1.5 rounded-md border border-border bg-bg/60 px-2 py-1 text-[10px] text-muted"
        >
          <StatusDot tone="warning" /> {s}
        </motion.span>
      ))}
    </div>
  );
}

function SlowIndicator() {
  return (
    <div className="w-full">
      <div className="label mb-2 flex justify-between text-[10px] text-subtle">
        <span>Enquiry</span>
        <span className="text-warning">Going cold</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-border/70">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-success via-warning to-danger"
          initial={{ width: "8%" }}
          animate={{ width: ["8%", "100%"] }}
          transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function ContextIndicator() {
  const tools = ["Sheets", "Inbox", "Notes", "Phone"];
  return (
    <div className="relative h-9 w-full">
      {tools.map((t, i) => (
        <motion.span
          key={t}
          className="label absolute top-0 rounded-md border border-dashed border-border-bright bg-bg/60 px-2 py-1 text-[10px] text-subtle"
          style={{ left: `${i * 25}%` }}
          animate={{ y: [0, i % 2 ? 6 : -4, 0] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
}

function RevenueIndicator() {
  return (
    <div className="flex h-9 w-full items-end gap-1.5">
      {[70, 90, 60, 80, 45, 30, 18].map((h, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-danger/60 to-warning/40"
          initial={{ height: `${h}%` }}
          animate={{ height: [`${h}%`, `${Math.max(h - 18, 8)}%`, `${h}%`] }}
          transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const PROBLEMS = [
  {
    icon: PhoneMissed,
    title: "Missed enquiries",
    body: "Leads are scattered across forms, calls and WhatsApp, so some never get a reply.",
    visual: <MissedIndicator />,
  },
  {
    icon: Clock,
    title: "Slow follow-ups",
    body: "Good prospects go cold while your team is busy with everything else.",
    visual: <SlowIndicator />,
  },
  {
    icon: Layers,
    title: "No customer context",
    body: "Information lives across disconnected tools, so nobody sees the full story.",
    visual: <ContextIndicator />,
  },
  {
    icon: TrendingDown,
    title: "Missed revenue",
    body: "Stale leads, missed calls and no-shows quietly slip away without being recovered.",
    visual: <RevenueIndicator />,
  },
];

export default function ProblemSection() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow="The problem"
        title={
          <>
            Most businesses don&apos;t have a lead problem.{" "}
            <span className="text-muted">They have a follow-up problem.</span>
          </>
        }
      />

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
        {PROBLEMS.map((p) => (
          <StaggerItem key={p.title} className="h-full">
            <SpotlightCard className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-warning">
                  <p.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <StatusDot tone="warning" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.body}</p>
              <div className="mt-6 flex min-h-9 items-end border-t border-border/70 pt-5">{p.visual}</div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
