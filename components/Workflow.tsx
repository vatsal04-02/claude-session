"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Check, ClipboardList, Clock, Mail, MessageCircle, PhoneIncoming, Sheet, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import GrowTree from "./GrowTree";
import { Ambient } from "./ui";

/* "How it works" as a compact, scroll-driven timeline — the page never pins, stops or hijacks the wheel.
   While the steps block crosses the viewport (~0.75 of a screen on desktop), scroll progress maps straight to
   the active step: 0–20% Capture, 20–40% Understand, 40–60% Manage, 60–80% Automate, 80–100% Grow.
   Scroll is read through motion values; React re-renders only when the step number changes (5 times).
   lg+: a rail plus ONE live panel that swaps per step. Phones/tablets: a compact vertical list.
   Reaching "Grow" plays the tree once; scrolling back above it resets, so a revisit replays it. */

const STEPS = [
  { name: "Capture", tag: "Input", line: "Information comes in from the tools you already use — WhatsApp, forms, email, calls, sheets.", result: "Nothing slips through" },
  { name: "Understand", tag: "AI", line: "AI works out what it is, what matters and what needs to happen next.", result: "Next step decided" },
  { name: "Manage", tag: "Route", line: "The right system or person gets it — with everything they need.", result: "Right place, right person" },
  { name: "Automate", tag: "Action", line: "The repetitive work runs on its own: updates, replies, tasks, reminders, reports.", result: "Done automatically" },
  { name: "Grow", tag: "Outcome", line: "Your team spends less time on admin and more on the work that grows the business.", result: "More capacity" },
] as const;
const LAST = STEPS.length - 1;

const chip = "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px]";

/* steps 1–4: one everyday example threads through them — a supplier emails that a delivery is late */
function StepVisual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="flex w-full flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-2">
          {(
            [
              [MessageCircle, "WhatsApp"],
              [ClipboardList, "Forms"],
              [Mail, "Email"],
              [PhoneIncoming, "Calls"],
              [Sheet, "Sheets"],
            ] as const
          ).map(([I, name]) => (
            <span key={name} className={cn(chip, name === "Email" ? "border-accent/50 text-text" : "border-border-bright text-muted")}>
              <I className="h-3.5 w-3.5" /> {name}
            </span>
          ))}
        </div>
        <span className="h-5 w-px bg-gradient-to-b from-accent/70 to-accent/10" />
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
}

/** Phones: the line between node k and node k+1 fills while step k is active (k/5 → (k+1)/5 of progress). */
function Segment({ progress, k }: { progress: MotionValue<number>; k: number }) {
  const scaleY = useTransform(progress, [k / STEPS.length, (k + 1) / STEPS.length], [0, 1], { clamp: true });
  return <motion.span className="block h-full origin-top bg-accent" style={{ scaleY }} />;
}

export default function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // reduced motion is only known on the client: apply it after mount so server and client markup match
  const [still, setStill] = useState(false);
  useEffect(() => setStill(!!reduce), [reduce]);

  // the steps block crossing the viewport drives everything; no smoothing on the step itself (instant response)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.55"] });
  const [active, setActive] = useState(0);
  const last = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const s = Math.min(LAST, Math.max(0, Math.floor(p * STEPS.length)));
    if (s !== last.current) {
      last.current = s;
      setActive(s);
    }
  });
  // the progress line gets only a light, fast spring (settles in ~150ms) so it never lags the scroll.
  // Steps switch every 20% of progress; nodes sit 25% apart on the rail — so the line runs 0→1 over the first 80%
  // and arrives at each node exactly as its step activates (then holds full through "Grow").
  const smooth = useSpring(scrollYProgress, { stiffness: 420, damping: 42, mass: 0.3 });
  const fill = useTransform(smooth, [0, 0.8], [0, 1], { clamp: true });
  const head = useTransform(fill, (f) => `${f * 100}%`);


  return (
    <section id="workflow" className="section-edge relative overflow-x-clip bg-[#130c08] px-5 pb-20 pt-16 md:px-8 md:py-[120px]">
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
          <div aria-hidden className="label hidden items-center gap-3 rounded-full border border-border px-4 py-2 text-[10.5px] text-subtle lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inset-0 rounded-full text-accent" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            Running · Step <span className="tabular-nums text-accent-2">0{active + 1}</span> / 05
          </div>
        </div>

        <div ref={ref} className="relative mt-10 lg:mt-14">
          {/* lg+: the rail — five nodes, the line fills with scroll */}
          <div aria-hidden className="relative hidden lg:block">
            <div className="absolute left-[10%] right-[10%] top-[15px] h-px bg-border-bright" />
            <div className="absolute left-[10%] right-[10%] top-[15px] h-px">
              <motion.div className="h-full origin-left bg-gradient-to-r from-accent/70 to-accent" style={{ scaleX: fill }} />
              <motion.div className="absolute inset-y-0 left-0 w-full" style={{ x: head }}>
                <span className="absolute -left-1 -top-[3.5px] h-2 w-2 rounded-full bg-accent-2 shadow-[0_0_14px_3px_rgba(241,122,59,0.75)]" />
              </motion.div>
            </div>
            <ol className="relative grid grid-cols-5">
              {STEPS.map((s, i) => {
                const state = i < active ? "done" : i === active ? "active" : "next";
                return (
                  <li key={s.name} className="flex flex-col items-center text-center">
                    <span className="wf-node grid h-[31px] w-[31px] place-items-center rounded-full border text-[11px] font-semibold tabular-nums" data-state={state}>
                      {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : `0${i + 1}`}
                    </span>
                    <span className={cn("mt-3 text-[15px] font-semibold transition-colors duration-200", state === "next" ? "text-subtle" : "text-text")}>{s.name}</span>
                    <span className="label mt-1 text-[9.5px] text-subtle">{s.tag}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* the steps: one live panel on lg+ (all five share a cell, only the active one shows); a compact list below lg */}
          <ol className="relative grid lg:mt-10">
            {STEPS.map((s, i) => {
              const state = i < active ? "done" : i === active ? "active" : "next";
              const grow = i === LAST;
              return (
                <li key={s.name} data-active={i === active} data-state={state} className="wf-step relative pb-10 pl-12 last:pb-0 lg:pb-0 lg:pl-0">
                  {i < LAST && (
                    <span aria-hidden className="absolute bottom-0 left-[15px] top-[31px] w-px bg-border lg:hidden">
                      <Segment progress={smooth} k={i} />
                    </span>
                  )}
                  <span aria-hidden className="wf-node absolute left-0 top-0 grid h-[31px] w-[31px] place-items-center rounded-full border text-[11px] font-semibold tabular-nums lg:hidden" data-state={state}>
                    {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : `0${i + 1}`}
                  </span>
                  <div className="wf-card lg:grid lg:min-h-[290px] lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12 lg:rounded-[24px] lg:px-10 lg:py-8">
                    <div className="wf-text">
                      <div className="label text-[10px] text-accent-2">
                        0{i + 1} · {s.tag}
                      </div>
                      <h3
                        className={cn(
                          "mt-1.5 text-[21px] font-semibold tracking-[-0.01em] text-text lg:mt-2 lg:text-[clamp(1.9rem,2.8vw,2.5rem)] lg:font-bold lg:leading-[1.05] lg:tracking-[-0.035em]",
                          grow && "grow-word"
                        )}
                        data-grown={grow && (still || active === LAST)}
                      >
                        {s.name}
                      </h3>
                      <p className="mt-2 max-w-[40ch] text-[15px] leading-[1.6] text-muted">{s.line}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[12px] font-medium text-accent-2">
                        <Check className="h-3 w-3" strokeWidth={3} /> {s.result}
                      </span>
                    </div>
                    {grow ? (
                      <div aria-hidden className="mt-4 flex flex-col items-center lg:mt-0">
                        <GrowTree grown={active === LAST} still={still} className="h-[150px] w-[160px] lg:h-[190px] lg:w-[204px]" />
                        <span className="label mt-1 text-[10px] tracking-[0.18em] text-subtle">Less admin · more capacity</span>
                      </div>
                    ) : (
                      // phones/tablets skip the per-step example visuals: the list stays short
                      <div aria-hidden className="hidden justify-center lg:flex">
                        <StepVisual i={i} />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
