"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { BellRing, CalendarCheck, Check, Database, Globe, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, SectionHeading, StatusDot, Tag, Typewriter } from "./ui";

const STEPS = [
  {
    time: "7:42 PM",
    title: "An enquiry arrives",
    body: "Someone fills in your website form after hours. In most businesses, this waits until tomorrow.",
    icon: Globe,
  },
  {
    time: "7:42 PM",
    title: "AI reads it instantly",
    body: "Intent, service and urgency are extracted and summarised, so your team never has to dig.",
    icon: Sparkles,
  },
  {
    time: "7:43 PM",
    title: "The CRM records it",
    body: "A customer timeline is created, an owner is assigned and a follow-up task is scheduled.",
    icon: Database,
  },
  {
    time: "7:44 PM",
    title: "Follow-up goes out",
    body: "A WhatsApp message is sent from an approved template. A human takes over when it matters.",
    icon: BellRing,
  },
  {
    time: "7:51 PM",
    title: "A booking is made",
    body: "The customer picks a slot. A confirmation and reminders are queued, and the calendar updates itself.",
    icon: CalendarCheck,
  },
];

/* ---------- the right-hand panels ---------- */

function PanelShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="label text-subtle">{title}</span>
        <StatusDot tone="accent" />
      </div>
      {children}
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-2.5 text-sm last:border-0">
      <span className="text-subtle">{k}</span>
      <span className="truncate text-text">{v}</span>
    </div>
  );
}

function Panel({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <PanelShell title="Website form · Submitted">
          <Field k="Name" v="Rahul Sharma" />
          <Field k="Phone" v="+91 98••• ••210" />
          <Field k="Service" v="Physiotherapy consultation" />
          <Field k="Message" v="Back pain. Can I come in this evening?" />
          <div className="label mt-4 flex items-center gap-2 text-[10px] text-success">
            <Check className="h-3.5 w-3.5" /> Captured
          </div>
        </PanelShell>
      );
    case 1:
      return (
        <PanelShell title="AI · Understanding">
          <div className="rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
            <div className="label mb-2 text-[10px] text-accent">✦ Summary</div>
            <Typewriter
              text="High-intent enquiry. Requested evening appointment for back pain."
              className="text-[15px] leading-relaxed"
              speed={22}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag tone="success">High intent</Tag>
            <Tag tone="muted">Physiotherapy</Tag>
            <Tag tone="warning">Urgent · evening</Tag>
          </div>
        </PanelShell>
      );
    case 2:
      return (
        <PanelShell title="CRM · Customer timeline">
          <ul className="relative space-y-4">
            <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-border" />
            {[
              ["7:42 PM", "Enquiry received via website"],
              ["7:42 PM", "AI summary added"],
              ["7:43 PM", "Assigned to front desk"],
              ["7:43 PM", "Task: follow up in 5 min"],
            ].map(([t, e], i) => (
              <motion.li
                key={e}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 * i, duration: 0.4, ease: EASE }}
                className="relative flex gap-3"
              >
                <span className="relative z-10 mt-1.5 h-[11px] w-[11px] rounded-full border-2 border-surface bg-accent" />
                <div>
                  <div className="label text-[9px] text-subtle">{t}</div>
                  <div className="text-sm">{e}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </PanelShell>
      );
    case 3:
      return (
        <PanelShell title="WhatsApp · Automated follow-up">
          <div className="space-y-2.5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-success/15 px-4 py-2.5 text-sm text-success"
            >
              Hi Rahul, thanks for reaching out to the clinic. We have 6:30 PM or 7:15 PM free today. Which works?
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.45, ease: EASE }}
              className="max-w-[70%] rounded-2xl rounded-bl-md bg-surface-2 px-4 py-2.5 text-sm text-muted"
            >
              6:30 works!
            </motion.div>
          </div>
          <div className="label mt-4 flex items-center gap-2 text-[10px] text-subtle">
            <StatusDot tone="success" /> Approved template · human can take over
          </div>
        </PanelShell>
      );
    default:
      return (
        <PanelShell title="Booking · Confirmed">
          <div className="rounded-xl border border-success/30 bg-success/10 p-5 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success text-[#06251a]"
            >
              <Check className="h-6 w-6" strokeWidth={3} />
            </motion.div>
            <div className="mt-3 text-lg font-semibold">Today · 6:30 PM</div>
            <div className="text-sm text-muted">Physiotherapy consultation · Rahul Sharma</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag tone="success">Confirmation sent</Tag>
            <Tag tone="muted">Reminder in 1 hr</Tag>
            <Tag tone="muted">Follow-up after visit</Tag>
          </div>
        </PanelShell>
      );
  }
}

/* ---------- section ---------- */

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    setStep(s);
  });

  const Icon = STEPS[step].icon;

  // Reduced motion: no pinned scrolling, just show every step stacked.
  if (reduce) {
    return (
      <section id="how-it-works" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            eyebrow="How it works"
            title="Watch one enquiry become a booking."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {STEPS.map((s, i) => (
              <div key={s.title}>
                <div className="label text-accent">{s.time}</div>
                <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
                <div className="mt-4">
                  <Panel step={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="how-it-works" ref={ref} className="relative h-[480vh]">
      <div className="sticky top-0 flex h-screen min-h-[640px] items-center overflow-hidden px-5 pt-16 md:px-8">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  Watch one enquiry become{" "}
                  <span className="grad-text">a booking</span>.
                </>
              }
              className="[&_h2]:text-[clamp(2rem,4.6vw,3.25rem)]"
            />

            {/* steps list (desktop) */}
            <ol className="mt-10 hidden space-y-1 lg:block">
              {STEPS.map((s, i) => {
                const on = i === step;
                const done = i < step;
                return (
                  <li key={s.title} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-medium transition-all duration-500",
                          on
                            ? "border-accent bg-accent text-[#04161b] shadow-[0_0_24px_rgba(94,231,247,0.5)]"
                            : done
                            ? "border-success/60 bg-success/15 text-success"
                            : "border-border text-subtle"
                        )}
                      >
                        {done ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      {i < STEPS.length - 1 && (
                        <span className="my-1 h-6 w-px bg-border" />
                      )}
                    </div>
                    <div className={cn("pb-2 pt-1 transition-opacity duration-500", on ? "opacity-100" : "opacity-45")}>
                      <div className="text-[17px] font-medium">{s.title}</div>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="max-w-[46ch] overflow-hidden text-[15px] leading-relaxed text-muted"
                          >
                            {s.body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative">
            {/* mobile step header */}
            <div className="mb-4 lg:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="label text-accent">
                    Step {step + 1}/{STEPS.length}
                  </div>
                  <div className="mt-1 text-lg font-semibold">{STEPS[step].title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{STEPS[step].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* clock + panel */}
            <div className="mb-3 flex items-center justify-between">
              <span className="label flex items-center gap-2 text-subtle">
                <Icon className="h-4 w-4 text-accent" />
                {STEPS[step].time}
              </span>
              <div className="h-1 w-40 overflow-hidden rounded-full bg-border">
                <motion.div
                  style={{ scaleX: bar }}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-2"
                />
              </div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <Panel step={step} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
