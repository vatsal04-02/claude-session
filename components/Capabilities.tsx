"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import {
  EASE,
  Section,
  SectionHeading,
  SpotlightCard,
  Stagger,
  StaggerItem,
  StatusDot,
  Typewriter,
} from "./ui";

const row = "flex items-center justify-between rounded-lg border border-border bg-bg/50 px-3 py-2 text-[12.5px]";

function CrmUi() {
  const rows = [
    ["Rahul S.", "New", "accent"],
    ["Ananya M.", "Contacted", "warning"],
    ["Vikram R.", "Booked", "success"],
  ] as const;
  return (
    <div className="space-y-1.5">
      {rows.map(([n, st, tone], i) => (
        <motion.div
          key={n}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: EASE }}
          className={row}
        >
          <span className="text-muted">{n}</span>
          <span className="flex items-center gap-2 text-text">
            <StatusDot tone={tone} pulse={false} /> {st}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function WhatsAppUi() {
  return (
    <div className="space-y-1.5 text-[12.5px]">
      {[
        ["Can I move to Friday?", false],
        ["Friday 5 PM works. Confirm?", true],
      ].map(([t, me], i) => (
        <motion.div
          key={String(t)}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.5, duration: 0.5, ease: EASE }}
          className={cn(
            "max-w-[88%] rounded-xl px-3 py-1.5",
            me ? "ml-auto bg-accent/15 text-accent" : "bg-surface-2 text-muted"
          )}
        >
          {t}
        </motion.div>
      ))}
      <div className="label pt-0.5 text-[9.5px] text-subtle">Human can take over any time</div>
    </div>
  );
}

function BookingUi() {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {["10:00", "11:30", "2:00", "4:30"].map((t, i) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
          className={cn(
            "rounded-lg border py-2 text-center text-[12px]",
            i === 2 ? "border-accent bg-accent/15 text-accent" : "border-border text-subtle"
          )}
        >
          {t}
        </motion.div>
      ))}
    </div>
  );
}

function RecoveryUi() {
  const items = [
    ["Missed call", "Call-back queued"],
    ["No-show", "Reschedule sent"],
    ["Stale lead", "Nudge scheduled"],
  ];
  return (
    <div className="space-y-1.5">
      {items.map(([a, b], i) => (
        <motion.div
          key={a}
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: EASE }}
          className={row}
        >
          <span className="text-muted">{a}</span>
          <span className="text-accent">{b}</span>
        </motion.div>
      ))}
    </div>
  );
}

function AssistantUi() {
  return (
    <div className="space-y-1.5 text-[12.5px]">
      <div className="rounded-lg border border-border bg-bg/50 px-3 py-2 text-muted">
        Who needs a follow-up today?
      </div>
      <div className="rounded-lg border border-accent/30 bg-accent/[0.07] px-3 py-2 text-text">
        <Typewriter text="Three leads are waiting. Replies drafted for review." speed={22} />
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: "Lead & CRM automation",
    body: "Every enquiry gets an owner, a status and a next step.",
    span: "lg:col-span-7",
    ui: <CrmUi />,
  },
  {
    title: "Customer communication",
    body: "WhatsApp replies with context, and a person when it matters.",
    span: "lg:col-span-5",
    ui: <WhatsAppUi />,
  },
  {
    title: "Booking & follow-up",
    body: "Confirmations and reminders that send themselves.",
    span: "lg:col-span-4",
    ui: <BookingUi />,
  },
  {
    title: "Revenue recovery",
    body: "Missed calls, no-shows and stale leads, brought back.",
    span: "lg:col-span-4",
    ui: <RecoveryUi />,
  },
  {
    title: "Internal AI assistants",
    body: "Summaries, drafts and next steps for your team.",
    span: "lg:col-span-4",
    ui: <AssistantUi />,
  },
];

export default function Capabilities() {
  return (
    <Section id="capabilities" className="border-t border-border">
      <SectionHeading
        eyebrow="Capabilities"
        title={
          <>
            Where automation pays for itself <em>fastest.</em>
          </>
        }
      />
      <Stagger className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-12">
        {CARDS.map((c, i) => (
          <StaggerItem key={c.title} className={cn("h-full", c.span)}>
            <SpotlightCard className="flex h-full flex-col p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-[28px] leading-tight">{c.title}</h3>
                <span className="label text-[10px] text-subtle">0{i + 1}</span>
              </div>
              <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-muted">{c.body}</p>
              <div className="mt-auto pt-6">{c.ui}</div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
