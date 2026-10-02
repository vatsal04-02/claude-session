"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
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
  useOnScreen,
  useTicker,
} from "./ui";

type Status = "In Progress" | "Prototype" | "Live";

/* ---------- Project 1: Physiotherapy clinic — workflow chain ---------- */

function ChainVisual({ steps }: { steps: string[] }) {
  const [ref, inView] = useOnScreen<HTMLDivElement>();
  const tick = useTicker(1000, inView);
  const active = tick % (steps.length + 2);
  return (
    <div ref={ref} className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1.5">
          <motion.span
            animate={{
              borderColor: i === active ? "#5EE7F7" : i < active ? "rgba(99,214,160,0.5)" : "#293548",
              color: i === active ? "#5EE7F7" : i < active ? "#63D6A0" : "#A8B3C2",
              backgroundColor: i === active ? "rgba(94,231,247,0.1)" : "rgba(13,17,23,0.6)",
            }}
            transition={{ duration: 0.35 }}
            className="rounded-lg border px-2.5 py-1.5 text-[12px] font-medium"
          >
            {s}
          </motion.span>
          {i < steps.length - 1 && <ArrowRight className="h-3 w-3 text-border-bright" />}
        </div>
      ))}
    </div>
  );
}

/* ---------- Project 2: Lead pipeline kanban (cards migrate across) ---------- */

function PipelineVisual() {
  const [ref, inView] = useOnScreen<HTMLDivElement>();
  const reduce = useReducedMotion();
  const cols = ["Capture", "Assign", "Qualify", "Follow-up"];
  const [stages, setStages] = useState([0, 0, 1, 2, 3]);
  const tick = useTicker(1900, inView && !reduce);

  useEffect(() => {
    if (tick === 0) return;
    setStages((prev) => {
      const next = [...prev];
      const i = (tick - 1) % next.length;
      next[i] = (next[i] + 1) % cols.length;
      return next;
    });
  }, [tick, cols.length]);

  const names = ["Priya", "Arjun", "Meera", "Kabir", "Isha"];
  return (
    <div ref={ref} className="grid grid-cols-4 gap-1.5">
      {cols.map((c, ci) => (
        <div key={c} className="min-h-[104px] rounded-lg border border-border bg-bg/60 p-1.5">
          <div className="label mb-1.5 truncate text-[8.5px] text-subtle">{c}</div>
          <div className="space-y-1">
            {stages.map((st, li) =>
              st === ci ? (
                <motion.div
                  key={li}
                  layoutId={`lead-${li}`}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  className="flex items-center gap-1 rounded-md bg-surface-2 px-1.5 py-1 text-[10px] text-muted"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="truncate">{names[li]}</span>
                </motion.div>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Project 3: Calendar + recovery queue ---------- */

function BookingRecoveryVisual() {
  const [ref, inView] = useOnScreen<HTMLDivElement>();
  const tick = useTicker(1600, inView);
  const phase = tick % 4; // 0 booked, 1 reminder, 2 no-show, 3 recovered
  const labels = ["Booked", "Reminder sent", "No-show", "Recovery sent"];
  const tones = ["accent", "accent", "warning", "success"] as const;
  const slotColor = [
    "border-accent/40 bg-accent/15",
    "border-accent/40 bg-accent/15",
    "border-warning/50 bg-warning/20",
    "border-success/50 bg-success/20",
  ][phase];

  return (
    <div ref={ref} className="grid grid-cols-[1.2fr_1fr] gap-2">
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 12 }).map((_, i) => {
          const hero = i === 6;
          const filled = [1, 4, 8, 10].includes(i);
          return (
            <div
              key={i}
              className={cn(
                "h-6 rounded-md border transition-colors duration-500",
                hero ? slotColor : filled ? "border-accent/20 bg-accent/10" : "border-border bg-bg/60"
              )}
            />
          );
        })}
      </div>
      <div className="rounded-lg border border-border bg-bg/60 p-2">
        <div className="label mb-1.5 text-[8.5px] text-subtle">Recovery queue</div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 text-[11px] text-muted"
          >
            <StatusDot tone={tones[phase]} pulse={phase === 2} />
            {labels[phase]}
          </motion.div>
        </AnimatePresence>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-border/60">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
            animate={{ width: `${(phase + 1) * 25}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Project 4: WhatsApp inbox + handoff ---------- */

function WhatsAppSystemVisual() {
  const [ref, inView] = useOnScreen<HTMLDivElement>();
  const tick = useTicker(1300, inView);
  const step = tick % 7; // 0..5 reveal, 6 hold
  const shown = Math.min(step, 4);
  return (
    <div ref={ref} className="space-y-1.5 text-[12px]">
      <AnimatePresence initial={false}>
        {shown >= 1 && (
          <motion.div
            key="m1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[85%] rounded-xl bg-surface-2 px-3 py-1.5 text-muted"
          >
            Can I move my slot to Friday?
          </motion.div>
        )}
        {shown >= 2 && (
          <motion.div
            key="m2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="label inline-flex items-center gap-1.5 rounded-md border border-accent/25 bg-accent/10 px-2 py-1 text-[9px] text-accent"
          >
            AI context · reschedule request
          </motion.div>
        )}
        {shown >= 3 && (
          <motion.div
            key="m3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-auto max-w-[85%] rounded-xl bg-success/15 px-3 py-1.5 text-success"
          >
            Sure — Friday 5pm works. Confirm?
          </motion.div>
        )}
        {shown >= 4 && (
          <motion.div
            key="m4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="label flex items-center gap-1.5 text-[9px] text-warning"
          >
            <StatusDot tone="warning" /> Handed to team · follow-up set
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- data ---------- */

const PROJECTS: {
  title: string;
  tags: string[];
  status: Status;
  flow: string[];
  blurb: string;
  visual: React.ReactNode;
}[] = [
  {
    title: "Physiotherapy Clinic",
    tags: ["AI CRM"],
    status: "In Progress",
    flow: ["Enquiry", "AI", "CRM", "Appointment", "Reminder", "Follow-up"],
    blurb: "From first enquiry to follow-up after the session, tracked in one patient timeline.",
    visual: null,
  },
  {
    title: "Lead Management System",
    tags: ["LEAD AUTOMATION"],
    status: "Prototype",
    flow: ["Capture", "Assign", "Qualify", "Follow-up"],
    blurb: "Every lead gets an owner, a status and a next step the moment it arrives.",
    visual: <PipelineVisual />,
  },
  {
    title: "Booking & Recovery System",
    tags: ["BOOKING", "AUTOMATION"],
    status: "Prototype",
    flow: ["Booking", "Reminder", "No-show", "Recovery"],
    blurb: "Confirmations and reminders go out on their own, and missed visits get a recovery nudge.",
    visual: <BookingRecoveryVisual />,
  },
  {
    title: "WhatsApp Business System",
    tags: ["WHATSAPP", "AI"],
    status: "In Progress",
    flow: ["Message", "AI Context", "Human Handoff", "Follow-up"],
    blurb: "A shared inbox where AI adds context and people step in when it matters.",
    visual: <WhatsAppSystemVisual />,
  },
];

const statusTone = { "In Progress": "warning", Prototype: "accent", Live: "success" } as const;

export default function Projects() {
  return (
    <Section id="projects" className="bg-bg-soft/70">
      <SectionHeading
        eyebrow="Projects"
        title={
          <>
            Systems we&apos;re <span className="grad-text">building</span>.
          </>
        }
        sub="Real workflows, shown honestly. Status labels reflect where each system actually is today."
      />

      <Stagger className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <StaggerItem key={p.title} className="h-full">
            <SpotlightCard className="flex h-full flex-col p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <span className="label flex items-center gap-2 text-[11px] text-muted">
                  <StatusDot tone={statusTone[p.status]} /> {p.status}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-[28px]">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.blurb}</p>

              <div className="mt-auto pt-8">
                <div className="rounded-xl border border-border/70 bg-bg/40 p-4">
                  {i === 0 ? (
                    <ChainVisual steps={p.flow} />
                  ) : (
                    <>
                      <div className="label mb-3 text-[9px] text-subtle">{p.flow.join(" → ")}</div>
                      {p.visual}
                    </>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
