"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  CalendarClock,
  Database,
  MessageCircle,
  RefreshCcw,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import {
  EASE,
  Section,
  SectionHeading,
  SpotlightCard,
  Stagger,
  StaggerItem,
  StatusDot,
  Tag,
  Typewriter,
  useOnScreen,
  useTicker,
} from "./ui";

/* ---------- mini visuals ---------- */

function CrmVisual() {
  const cols = [
    { name: "New", n: [3, 2] },
    { name: "Contacted", n: [2, 1] },
    { name: "Booked", n: [1, 2] },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {cols.map((c, ci) => (
        <div key={c.name} className="rounded-lg border border-border bg-bg/60 p-2">
          <div className="label mb-2 text-[9px] text-subtle">{c.name}</div>
          <div className="space-y-1.5">
            {c.n.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + ci * 0.12 + i * 0.08, duration: 0.5, ease: EASE }}
                className="rounded-md bg-surface-2 p-1.5"
              >
                <div className="h-1.5 rounded-full bg-border-bright" style={{ width: `${40 + w * 15}%` }} />
                <div className="mt-1.5 h-1 w-1/2 rounded-full bg-border" />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LeadStreamVisual() {
  const [ref, inView] = useOnScreen<HTMLDivElement>();
  const tick = useTicker(2200, inView);
  const pool = ["Website form", "Missed call", "WhatsApp", "Instagram DM", "Landing page"];
  const rows = Array.from({ length: 3 }, (_, i) => tick - i).filter((t) => t >= 0);
  return (
    <div ref={ref} className="space-y-2">
      <AnimatePresence initial={false}>
        {rows.map((t) => (
          <motion.div
            key={t}
            layout
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1 - rows.indexOf(t) * 0.3, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex items-center justify-between rounded-lg border border-border bg-bg/60 px-3 py-2"
          >
            <span className="flex items-center gap-2 text-[13px] text-muted">
              <StatusDot tone="accent" pulse={rows.indexOf(t) === 0} />
              {pool[t % pool.length]}
            </span>
            <span className="label text-[9px] text-success">
              {rows.indexOf(t) === 0 ? "Assigned" : "Notified"}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppVisual() {
  const msgs = [
    { me: false, t: "Hi, is a 6pm slot free?" },
    { me: true, t: "Yes! Booking you in for 6pm." },
    { me: true, t: "Reminder set for tomorrow." },
  ];
  return (
    <div className="space-y-1.5">
      {msgs.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.45, duration: 0.5, ease: EASE }}
          className={cn(
            "max-w-[85%] rounded-xl px-3 py-1.5 text-[12px]",
            m.me ? "ml-auto bg-success/15 text-success" : "bg-surface-2 text-muted"
          )}
        >
          {m.t}
        </motion.div>
      ))}
    </div>
  );
}

function BookingVisual() {
  const [ref, inView] = useOnScreen<HTMLDivElement>();
  const tick = useTicker(1400, inView);
  const days = ["M", "T", "W", "T", "F"];
  const picked = tick % 15;
  return (
    <div ref={ref} className="grid grid-cols-5 gap-1.5">
      {days.map((d, c) => (
        <div key={c} className="space-y-1.5">
          <div className="label text-center text-[9px] text-subtle">{d}</div>
          {[0, 1, 2].map((r) => {
            const idx = c * 3 + r;
            const filled = idx % 4 === 1 || idx % 5 === 0;
            const isNew = idx === picked;
            return (
              <motion.div
                key={r}
                animate={{ scale: isNew ? 1.06 : 1 }}
                className={cn(
                  "h-5 rounded-md border transition-colors duration-500",
                  isNew
                    ? "border-accent bg-accent/30"
                    : filled
                    ? "border-accent/20 bg-accent/10"
                    : "border-border bg-bg/60"
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function RecoveryVisual() {
  const items = [
    ["Missed call", "Call back queued", "warning"],
    ["Stale lead · 6d", "Nudge scheduled", "warning"],
    ["No-show", "Reschedule sent", "success"],
    ["Pending payment", "Reminder sent", "success"],
  ] as const;
  return (
    <div className="space-y-1.5">
      {items.map(([a, b, tone], i) => (
        <motion.div
          key={a}
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: EASE }}
          className="flex items-center justify-between rounded-lg border border-border bg-bg/60 px-3 py-1.5 text-[12px]"
        >
          <span className="flex items-center gap-2 text-muted">
            <StatusDot tone={tone} pulse={tone === "warning"} />
            {a}
          </span>
          <span className={tone === "success" ? "text-success" : "text-warning"}>{b}</span>
        </motion.div>
      ))}
    </div>
  );
}

function AssistantVisual() {
  return (
    <div className="space-y-2 text-[12px]">
      <div className="rounded-lg border border-border bg-bg/60 p-3">
        <div className="label mb-1 flex items-center gap-1.5 text-[9px] text-accent">
          <Bot className="h-3 w-3" /> AI summary
        </div>
        <Typewriter
          className="text-muted"
          text="Asked about weekend slots. Prefers mornings. Ready to book."
        />
      </div>
      <div className="rounded-lg border border-accent/25 bg-accent/10 px-3 py-2 text-accent">
        Next: Offer Saturday 10:00 →
      </div>
    </div>
  );
}

/* ---------- data ---------- */

type Solution = {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tags: string[];
  span: string;
  visual: React.ReactNode;
};

const SOLUTIONS: Solution[] = [
  {
    id: "crm",
    icon: Database,
    title: "AI CRM",
    body: "Lead management, customer timelines, pipeline, tasks, bookings and reports in one place.",
    tags: ["CRM", "AI", "DASHBOARD"],
    span: "lg:col-span-7",
    visual: <CrmVisual />,
  },
  {
    id: "lead",
    icon: UserPlus,
    title: "Lead Automation",
    body: "Capture, assign, notify and follow up with every new enquiry.",
    tags: ["LEADS", "FOLLOW-UP", "AUTOMATION"],
    span: "lg:col-span-5",
    visual: <LeadStreamVisual />,
  },
  {
    id: "wa",
    icon: MessageCircle,
    title: "WhatsApp Automation",
    body: "Central inbox, approved templates, reminders and human handoff.",
    tags: ["WHATSAPP", "MESSAGING"],
    span: "lg:col-span-4",
    visual: <WhatsAppVisual />,
  },
  {
    id: "booking",
    icon: CalendarClock,
    title: "Booking Automation",
    body: "Bookings, confirmations, reminders and no-show recovery.",
    tags: ["BOOKING", "CALENDAR"],
    span: "lg:col-span-4",
    visual: <BookingVisual />,
  },
  {
    id: "recovery",
    icon: RefreshCcw,
    title: "Revenue Recovery",
    body: "Surface missed calls, stale leads, no-shows, pending payments and review opportunities.",
    tags: ["RECOVERY", "REVENUE"],
    span: "lg:col-span-4",
    visual: <RecoveryVisual />,
  },
  {
    id: "assistant",
    icon: Bot,
    title: "AI Business Assistant",
    body: "Conversation summaries, reply drafts and next-action suggestions for your team.",
    tags: ["AI", "ASSISTANT"],
    span: "lg:col-span-12",
    visual: <AssistantVisual />,
  },
];

export default function Solutions() {
  return (
    <Section id="solutions">
      <SectionHeading
        eyebrow="Solutions"
        title={
          <>
            Systems that <span className="grad-text">do the repeat work</span>.
          </>
        }
        sub="Automate the work your team repeats every day. Pick one system, or connect them all."
      />

      <Stagger className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-12">
        {SOLUTIONS.map((s) => {
          const wide = s.id === "assistant";
          return (
            <StaggerItem key={s.id} className={cn("h-full", s.span)}>
              <SpotlightCard
                className={cn(
                  "flex h-full gap-6 p-6 md:p-7",
                  wide ? "flex-col md:flex-row md:items-center md:gap-12" : "flex-col"
                )}
              >
                <div className={cn(wide && "md:w-1/2")}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                      <s.icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <Tag key={t} tone="muted">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
                <div
                  className={cn(
                    "mt-auto rounded-xl border border-border/70 bg-bg/40 p-4",
                    wide && "md:mt-0 md:w-1/2"
                  )}
                >
                  {s.visual}
                </div>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
