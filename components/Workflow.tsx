"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { Check, ClipboardList, Clock, Mail, MessageCircle, PhoneIncoming, Sheet, UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Ambient } from "./ui";

/* "How it works": a normal section — the page never pins or stops.
   As it scrolls through the viewport, progress (0→1) lights the five steps one after another.
   lg+: a rail, five step cards and one live panel showing the active step.
   below lg: a vertical journey; every step carries its own small visual. */

const STEPS = [
  { name: "Capture", tag: "Input", line: "Information comes in from the tools you already use — WhatsApp, forms, email, calls, sheets.", result: "Nothing slips through" },
  { name: "Understand", tag: "AI", line: "AI works out what it is, what matters and what needs to happen next.", result: "Next step decided" },
  { name: "Manage", tag: "Route", line: "The right system or person gets it — with everything they need.", result: "Right place, right person" },
  { name: "Automate", tag: "Action", line: "The repetitive work runs on its own: updates, replies, tasks, reminders, reports.", result: "Done automatically" },
  { name: "Grow", tag: "Outcome", line: "Your team spends less time on admin and more on the work that grows the business.", result: "More capacity" },
] as const;

const chip = "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px]";

/* one everyday example threads through all five steps: a supplier emails that a delivery is late */
function StepVisual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="flex w-full flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-2">
          {[
            [MessageCircle, "WhatsApp"],
            [ClipboardList, "Forms"],
            [Mail, "Email"],
            [PhoneIncoming, "Calls"],
            [Sheet, "Sheets"],
          ].map(([Icon, name]) => {
            const I = Icon as typeof Mail;
            return (
              <span key={name as string} className={cn(chip, name === "Email" ? "border-accent/50 text-text" : "border-border-bright text-muted")}>
                <I className="h-3.5 w-3.5" /> {name as string}
              </span>
            );
          })}
        </div>
        <span aria-hidden className="h-5 w-px bg-gradient-to-b from-accent/70 to-accent/10" />
        <div className="glass w-full max-w-[300px] rounded-xl px-4 py-3">
          <div className="label text-[10px] text-accent-2">New email · 9:42 AM</div>
          <div className="mt-1 text-[14px] text-text">Supplier: &ldquo;Your delivery will be 2 days late.&rdquo;</div>
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className="w-full max-w-[340px]">
        <div className="rounded-2xl rounded-bl-md border border-border bg-surface-2 px-4 py-3 text-[14px] text-text">
          &ldquo;Your delivery will be 2 days late.&rdquo;
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={cn(chip, "border-accent/50 bg-accent/10 text-accent-2")}>What: delivery delay</span>
          <span className={cn(chip, "border-accent/50 bg-accent/10 text-accent-2")}>Affects: 3 orders</span>
          <span className={cn(chip, "border-accent/50 bg-accent/10 text-accent-2")}>Priority: high</span>
        </div>
      </div>
    );
  if (i === 2)
    return (
      <div className="glass w-full max-w-[320px] rounded-xl p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent">
            <UserRound className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[14px] font-medium text-text">Delivery delay</div>
            <div className="text-[12px] text-subtle">from supplier email</div>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13px]">
          <dt className="label text-[10px] text-subtle">Owner</dt>
          <dd className="text-text">Operations</dd>
          <dt className="label text-[10px] text-subtle">Linked</dt>
          <dd className="text-text">3 customer orders</dd>
          <dt className="label text-[10px] text-subtle">Next</dt>
          <dd className="text-accent-2">Update customers</dd>
        </dl>
      </div>
    );
  if (i === 3)
    return (
      <ol className="w-full max-w-[320px] space-y-2.5">
        {(
          [
            ["Now", "Customers informed", true],
            ["Now", "Orders updated", true],
            ["Tonight", "Daily report", false],
          ] as const
        ).map(([when, what, done]) => (
          <li key={what} className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-2.5">
            <span className="text-[13.5px] text-text">{what}</span>
            <span className={cn("label flex items-center gap-1.5 text-[10px]", done ? "text-accent-2" : "text-subtle")}>
              {done ? <Check className="h-3 w-3" strokeWidth={3} /> : <Clock className="h-3 w-3" />} {when}
            </span>
          </li>
        ))}
      </ol>
    );
  return (
    <div className="glass w-full max-w-[300px] rounded-xl p-5 text-center">
      <div aria-hidden className="mx-auto flex h-12 w-fit items-end gap-1.5">
        {[35, 45, 52, 64, 76, 88, 100].map((h, k) => (
          <span key={k} className="w-2 rounded-[3px] bg-accent/80" style={{ height: `${h}%`, opacity: 0.45 + k * 0.08 }} />
        ))}
      </div>
      <div className="mt-3 text-[16px] font-semibold text-text">Nobody typed, chased or forgot.</div>
      <div className="mt-1 text-[13px] text-muted">That time goes back into the business.</div>
    </div>
  );
}

export default function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  // progress runs while the steps travel up through the viewport — no pinning, no extra scroll distance
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "start -0.25"] });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.max(0, Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)))));
  const fill = useTransform(progress, [0, 1], [0, 1]);
  const head = useTransform(fill, (f) => `${f * 100}%`);
  const shown = active; // scroll-linked state, identical on server and client (no hydration mismatch)

  return (
    <section id="workflow" className="section-edge relative overflow-x-clip bg-[#130c08] px-5 py-24 md:px-8 md:py-[130px]">
      <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.4 } as React.CSSProperties} />
      <Ambient className="-right-40 top-[10%] hidden h-[520px] w-[520px] md:block" />

      <div className="relative mx-auto w-full max-w-[1140px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="label inline-flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent/70" /> How it works
            </span>
            <h2 className="display mt-4 max-w-[18ch] text-balance text-[clamp(2.2rem,4.2vw,3.4rem)] text-text">
              How a task goes from your desk to autopilot.
            </h2>
          </div>
          <div className="label hidden items-center gap-3 rounded-full border border-border px-4 py-2 text-[10.5px] text-subtle lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inset-0 rounded-full text-accent" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            Running · Step <span className="tabular-nums text-accent-2">0{shown + 1}</span> / 05
          </div>
        </div>

        <div ref={ref} className="relative mt-12 lg:mt-14">
          {/* rail (lg+) */}
          <div aria-hidden className="relative hidden lg:block">
            <div className="absolute left-[10%] right-[10%] top-[15px] h-px bg-border-bright" />
            <div className="absolute left-[10%] right-[10%] top-[15px] h-px">
              <motion.div className="h-full origin-left bg-gradient-to-r from-accent/70 to-accent" style={{ scaleX: fill }} />
              <motion.div className="absolute inset-y-0 left-0 w-full" style={{ x: head }}>
                <span className="absolute -left-1 -top-[3.5px] h-2 w-2 rounded-full bg-accent-2 shadow-[0_0_14px_3px_rgba(241,122,59,0.75)]" />
              </motion.div>
            </div>
          </div>

          {/* the five steps: a row on lg+, a vertical journey below */}
          <ol className="relative grid lg:grid-cols-5">
            <span aria-hidden className="absolute bottom-8 left-[15px] top-4 w-px bg-border lg:hidden">
              <motion.span className="block h-full origin-top bg-accent" style={{ scaleY: fill }} />
            </span>
            {STEPS.map((s, i) => {
              const state = i < shown ? "done" : i === shown ? "active" : "next";
              return (
                <li key={s.name} className="relative pb-10 pl-12 last:pb-0 lg:flex lg:flex-col lg:items-center lg:px-3 lg:pb-0 lg:pl-3 lg:text-center">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 grid h-[31px] w-[31px] place-items-center rounded-full border text-[11px] font-semibold tabular-nums transition-[background-color,border-color,color,box-shadow,transform] duration-500 lg:relative",
                      state === "done" && "border-accent/70 bg-accent/20 text-accent-2",
                      state === "active" && "scale-110 border-accent bg-accent text-[#1a0a03] shadow-[0_0_0_6px_rgba(234,106,47,0.14),0_0_26px_rgba(234,106,47,0.6)]",
                      state === "next" && "border-border-bright bg-bg text-subtle"
                    )}
                  >
                    {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : `0${i + 1}`}
                  </span>
                  <div className={cn("transition-opacity duration-500 lg:mt-5", state === "next" && "lg:opacity-55")}>
                    <div className="label text-[10px] text-accent-2">
                      0{i + 1} · {s.tag}
                    </div>
                    <h3 className="mt-1.5 text-[20px] font-semibold tracking-[-0.01em] text-text">{s.name}</h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-muted lg:text-[14.5px]">{s.line}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[12px] font-medium text-accent-2">
                      <Check className="h-3 w-3" strokeWidth={3} /> {s.result}
                    </span>
                  </div>
                  {/* phones/tablets: each step shows its own visual */}
                  <div className="mt-5 flex justify-start lg:hidden">
                    <StepVisual i={i} />
                  </div>
                </li>
              );
            })}
          </ol>

          {/* lg+: one live panel shows what the active step is doing */}
          <div aria-hidden className="relative mt-10 hidden lg:grid">
            {STEPS.map((s, i) => (
              <div
                key={s.name}
                data-active={shown === i}
                className="wf-panel glass grid grid-cols-[0.8fr_1.2fr] items-center gap-10 rounded-[24px] px-10 py-8 [grid-area:1/1]"
              >
                <div>
                  <div className="label text-[10.5px] text-accent-2">Live · Step 0{i + 1}</div>
                  <div className="display mt-2 text-[clamp(1.8rem,2.6vw,2.3rem)] text-text">{s.name}</div>
                  <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.6] text-muted">Example: a supplier emails that a delivery will be late.</p>
                </div>
                <div className="flex justify-center">
                  <StepVisual i={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
