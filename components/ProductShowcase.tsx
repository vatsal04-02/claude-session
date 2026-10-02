"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Bell,
  CalendarDays,
  Gauge,
  Inbox,
  LayoutDashboard,
  MessageCircle,
  Phone,
  Search,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  Counter,
  EASE,
  Reveal,
  Section,
  SectionHeading,
  StatusDot,
  Tag,
  Typewriter,
  useOnScreen,
  useTicker,
} from "./ui";

type Lead = {
  name: string;
  service: string;
  source: string;
  intent: "High" | "Medium";
  summary: string;
  next: string;
  age: string;
};

/* Fictional sample data, clearly labelled as such in the UI. */
const LEADS: Lead[] = [
  {
    name: "Rahul Sharma",
    service: "Physiotherapy Consultation",
    source: "Website form",
    intent: "High",
    summary: "High-intent enquiry. Requested evening appointment.",
    next: "Call within 15 minutes.",
    age: "2 min ago",
  },
  {
    name: "Ananya Mehta",
    service: "Gym trial pass",
    source: "WhatsApp",
    intent: "Medium",
    summary: "Asked about trial timings and monthly pricing. Prefers mornings.",
    next: "Send trial slot options on WhatsApp.",
    age: "14 min ago",
  },
  {
    name: "Vikram Rao",
    service: "3BHK site visit",
    source: "Missed call",
    intent: "High",
    summary: "Called twice this week and viewed two listings. Likely ready to visit.",
    next: "Call back and offer a Saturday site visit.",
    age: "38 min ago",
  },
  {
    name: "Sneha Kulkarni",
    service: "Bridal consultation",
    source: "Website form",
    intent: "Medium",
    summary: "Wants a bridal package quote for March. Asked about trials.",
    next: "Share the package brochure and book a consult.",
    age: "1 hr ago",
  },
];

const EVENTS = [
  ["New lead", "Rahul Sharma enquired via website", "accent"],
  ["AI summary", "Intent detected: evening appointment", "accent"],
  ["Follow-up", "WhatsApp reminder sent to Ananya", "success"],
  ["Booked", "Appointment confirmed for 6:30 PM", "success"],
  ["Recovery", "No-show rescheduled automatically", "warning"],
  ["Task", "Call back Vikram assigned to front desk", "accent"],
  ["Reminder", "Tomorrow's 9 appointments notified", "success"],
] as const;

const NAV = [
  { icon: LayoutDashboard, label: "Today", active: true },
  { icon: Users, label: "Leads" },
  { icon: Inbox, label: "Inbox" },
  { icon: CalendarDays, label: "Calendar" },
  { icon: Gauge, label: "Reports" },
];

function Spark({ points, tone }: { points: number[]; tone: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - ((p - min) / (max - min || 1)) * 80 - 10;
      return `${i ? "L" : "M"}${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-8 w-full" aria-hidden>
      <motion.path
        d={d}
        fill="none"
        stroke={tone}
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  );
}

export default function ProductShowcase() {
  const reduce = useReducedMotion();
  const [ref, inView] = useOnScreen<HTMLDivElement>();
  const [selected, setSelected] = useState(0);
  const tick = useTicker(3200, inView && !reduce);

  // "Systems working": values creep up as automations run
  const newLeads = 12 + Math.floor(tick / 2);
  const followUps = 8 + (tick % 3 === 2 ? -1 : 0) + Math.floor(tick / 4);
  const appts = 5 + Math.floor(tick / 3);
  const atRisk = 42500 - Math.floor(tick / 3) * 3500;

  const metrics = [
    { label: "New Leads", value: newLeads, tone: "#5EE7F7", pts: [3, 5, 4, 7, 6, 9, 12], hint: "since 9 AM" },
    { label: "Follow-ups Due", value: followUps, tone: "#F5C66A", pts: [9, 7, 8, 6, 7, 5, 8], hint: "today" },
    { label: "Appointments", value: appts, tone: "#63D6A0", pts: [2, 3, 3, 4, 4, 5, 5], hint: "scheduled" },
    {
      label: "Revenue at Risk",
      value: atRisk,
      prefix: "₹",
      tone: "#FF7F8A",
      pts: [30, 38, 36, 44, 41, 46, 42],
      hint: "recoverable",
    },
  ];

  const lead = LEADS[selected];

  const feed = useMemo(
    () => Array.from({ length: 4 }, (_, i) => ({ key: tick - i, ev: EVENTS[(((tick - i) % EVENTS.length) + EVENTS.length) % EVENTS.length] })),
    [tick]
  );

  return (
    <Section id="product">
      <SectionHeading
        align="center"
        eyebrow="Product showcase"
        title={
          <>
            A real system, <span className="grad-text">not a mock-up</span>.
          </>
        }
        sub="This is the kind of Today view your team opens every morning. Click a lead to see what the AI prepared."
      />

      <Reveal y={40} className="relative mt-14 md:mt-20">
        <div aria-hidden className="absolute -inset-x-6 -inset-y-10 -z-10 rounded-[40px] bg-accent/[0.06] blur-3xl" />
        <div
          ref={ref}
          className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
        >
          {/* window chrome */}
          <div className="flex items-center gap-3 border-b border-border bg-surface-2/70 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            </div>
            <div className="mx-auto hidden items-center gap-2 rounded-md border border-border bg-bg/60 px-3 py-1 text-xs text-subtle sm:flex">
              <Search className="h-3 w-3" /> app.flowhq.io / today
            </div>
            <Tag tone="muted">Sample data</Tag>
          </div>

          <div className="grid lg:grid-cols-[72px_1fr]">
            {/* sidebar */}
            <aside className="hidden flex-col items-center gap-2 border-r border-border bg-bg-soft/60 py-5 lg:flex">
              {NAV.map((n) => (
                <span
                  key={n.label}
                  title={n.label}
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-xl",
                    n.active ? "bg-accent/15 text-accent" : "text-subtle"
                  )}
                >
                  <n.icon className="h-[18px] w-[18px]" />
                </span>
              ))}
            </aside>

            <div className="p-4 md:p-7">
              {/* header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="label text-accent">Today</div>
                  <div className="mt-1 text-lg font-semibold tracking-tight md:text-xl">
                    Good morning, front desk
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="label hidden items-center gap-2 text-[10px] text-subtle sm:flex">
                    <StatusDot tone="success" /> Automations running
                  </span>
                  <span className="relative grid h-9 w-9 place-items-center rounded-full border border-border text-muted">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                </div>
              </div>

              {/* metrics */}
              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: EASE }}
                    className="rounded-xl border border-border bg-bg/50 p-4"
                  >
                    <div className="text-xs text-muted">{m.label}</div>
                    <div className="mt-1.5 text-[28px] font-semibold leading-none tracking-tight">
                      <Counter to={m.value} prefix={m.prefix} duration={0.9} />
                    </div>
                    <div className="mt-3">
                      <Spark points={m.pts} tone={m.tone} />
                    </div>
                    <div className="label mt-1 text-[9px] text-subtle">{m.hint}</div>
                  </motion.div>
                ))}
              </div>

              {/* lists + detail */}
              <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1.15fr]">
                <div className="space-y-4">
                  {/* lead list */}
                  <div className="rounded-xl border border-border bg-bg/50 p-2">
                    <div className="label px-3 pb-2 pt-2 text-[10px] text-subtle">New leads</div>
                    <ul role="listbox" aria-label="Sample leads" className="space-y-1">
                      {LEADS.map((l, i) => {
                        const on = i === selected;
                        return (
                          <li key={l.name}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={on}
                              onClick={() => setSelected(i)}
                              className={cn(
                                "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                                on ? "text-text" : "text-muted hover:bg-surface"
                              )}
                            >
                              {on && (
                                <motion.span
                                  layoutId="lead-hl"
                                  className="absolute inset-0 rounded-lg border border-accent/30 bg-accent/10"
                                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                                />
                              )}
                              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2 text-xs font-semibold text-accent">
                                {l.name.split(" ").map((p) => p[0]).join("")}
                              </span>
                              <span className="relative min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium">{l.name}</span>
                                <span className="block truncate text-xs text-subtle">{l.service}</span>
                              </span>
                              <span className="relative text-right">
                                <span
                                  className={cn(
                                    "label block text-[9px]",
                                    l.intent === "High" ? "text-success" : "text-warning"
                                  )}
                                >
                                  {l.intent}
                                </span>
                                <span className="block text-[10px] text-subtle">{l.age}</span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* activity timeline */}
                  <div className="rounded-xl border border-border bg-bg/50 p-4">
                    <div className="label mb-3 flex items-center justify-between text-[10px] text-subtle">
                      <span>Live activity</span>
                      <StatusDot tone="accent" />
                    </div>
                    <ul className="relative space-y-3">
                      <span aria-hidden className="absolute bottom-1 left-[5px] top-1 w-px bg-border" />
                      <AnimatePresence initial={false} mode="popLayout">
                        {feed.map(({ key, ev }, idx) => (
                          <motion.li
                            key={key}
                            layout
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1 - idx * 0.22, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="relative flex items-start gap-3 pl-0"
                          >
                            <span
                              className={cn(
                                "relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-bg",
                                ev[2] === "success"
                                  ? "bg-success"
                                  : ev[2] === "warning"
                                  ? "bg-warning"
                                  : "bg-accent"
                              )}
                            />
                            <div className="min-w-0">
                              <div className="label text-[9px] text-subtle">{ev[0]}</div>
                              <div className="truncate text-[13px] text-muted">{ev[1]}</div>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </div>
                </div>

                {/* lead detail */}
                <div className="rounded-xl border border-border bg-bg/50 p-5 md:p-6">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={lead.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: EASE }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent-2/30 text-sm font-semibold text-text">
                            {lead.name.split(" ").map((p) => p[0]).join("")}
                          </span>
                          <div>
                            <div className="text-lg font-semibold tracking-tight">{lead.name}</div>
                            <div className="text-sm text-muted">{lead.service}</div>
                          </div>
                        </div>
                        <Tag tone={lead.intent === "High" ? "success" : "warning"}>
                          {lead.intent} intent
                        </Tag>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Tag tone="muted">{lead.source}</Tag>
                        <Tag tone="muted">{lead.age}</Tag>
                      </div>

                      <div className="mt-6 rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
                        <div className="label mb-2 flex items-center gap-2 text-[10px] text-accent">
                          <span aria-hidden>✦</span> AI Summary
                        </div>
                        <Typewriter text={lead.summary} className="text-[15px] leading-relaxed text-text" />
                      </div>

                      <div className="mt-3 flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-4">
                        <CountdownRing key={lead.name} />
                        <div className="min-w-0">
                          <div className="label text-[10px] text-subtle">Next action</div>
                          <div className="mt-1 text-[15px] font-medium">{lead.next}</div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <span className="flex h-10 items-center justify-center gap-2 rounded-lg bg-accent/90 text-sm font-medium text-[#04161b]">
                          <Phone className="h-4 w-4" /> Call now
                        </span>
                        <span className="flex h-10 items-center justify-center gap-2 rounded-lg border border-border text-sm text-muted">
                          <MessageCircle className="h-4 w-4" /> WhatsApp
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-subtle">
          Sample data for illustration. Names and numbers are fictional.
        </p>
      </Reveal>
    </Section>
  );
}

/** A ring that drains over 15 minutes' worth of "time", replayed for effect. */
function CountdownRing() {
  const reduce = useReducedMotion();
  const [sec, setSec] = useState(15 * 60 - 1);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [reduce]);

  const r = 20;
  const c = 2 * Math.PI * r;
  const frac = sec / (15 * 60);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

  return (
    <div className="relative grid h-[58px] w-[58px] shrink-0 place-items-center">
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r={r} fill="none" stroke="#293548" strokeWidth="3" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="#5EE7F7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - frac)}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <span className="text-[11px] font-medium tabular-nums text-text">
        {mm}:{ss}
      </span>
    </div>
  );
}
