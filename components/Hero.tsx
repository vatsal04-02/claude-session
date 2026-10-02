"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Database, Globe, Sparkles, UserCheck, UserPlus, Workflow, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/cn";
import { Button, EASE, StatusDot } from "./ui";

const NODES = [
  { name: "Form Submit", tag: "TRIGGER", log: "New enquiry · requested a callback" },
  { name: "Enrich", tag: "LOOKUP", log: "Source: website form" },
  { name: "AI Agent", tag: "REASON", log: "AI understood intent" },
  { name: "Guardrail", tag: "CHECK", log: "Approved template · checks passed" },
  { name: "CRM + Send", tag: "ACT", log: "Contact saved · follow-up created" },
];

const STEP_MS = 1300;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  };
}

const SYSTEM: { icon: LucideIcon; name: string; sub: string }[] = [
  { icon: Globe, name: "Website", sub: "Forms, calls, chats" },
  { icon: UserPlus, name: "Lead", sub: "Captured and owned" },
  { icon: Sparkles, name: "AI", sub: "Reads the intent" },
  { icon: Database, name: "CRM", sub: "Keeps the record" },
  { icon: Workflow, name: "Automation", sub: "Moves work forward" },
  { icon: UserCheck, name: "Customer", sub: "Booked and informed" },
];

export default function Hero() {
  const { open } = useDemo();
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-10 pt-24 md:px-8 md:pb-10 md:pt-24">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="anim-glow pointer-events-none absolute -right-40 top-10 h-[460px] w-[460px] rounded-full bg-accent/[0.12] blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1140px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-8">
          <div>
            <motion.span {...rise(0.05)} className="label inline-flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent/70" /> AI Automation Studio
            </motion.span>

            <h1 className="display mt-5 text-[clamp(2.7rem,5.9vw,4.9rem)] leading-[1.03] text-text">
              <motion.span {...rise(0.15)} className="block">
                Your business has
              </motion.span>
              <motion.span {...rise(0.25)} className="block">
                enough tools.
              </motion.span>
              <motion.span {...rise(0.38)} className="block">
                It needs a <em>system.</em>
              </motion.span>
            </h1>

            <motion.p {...rise(0.5)} className="mt-6 max-w-[35rem] text-[17px] leading-relaxed text-muted">
              FlowHQ designs and builds AI-powered business systems that capture leads, automate
              follow-ups, connect your tools and keep your team moving.
            </motion.p>

            <motion.p {...rise(0.58)} className="label mt-5 text-accent/80">
              AI Systems · Automation · CRM · Integrations
            </motion.p>

            <motion.div {...rise(0.66)} className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button size="lg" onClick={open}>
                Book a Free Demo
              </Button>
              <a
                href="#workflow"
                className="group inline-flex items-center gap-2 text-[15px] text-text transition-colors hover:text-accent"
              >
                See How It Works
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>

          <motion.div {...rise(0.5)} className="hidden md:block">
            <LiveRun />
          </motion.div>
        </div>

        <SystemStrip />
      </div>
    </section>
  );
}

/* Thin system rail: Website → Lead → AI → CRM → Automation → Customer.
   Scroll drives it: nodes turn orange, the line fills and labels brighten as you move down. */
function SystemStrip() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const n = SYSTEM.length;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 98%", "start 38%"] });
  const toIdx = (p: number) => Math.min(n - 1, Math.max(0, Math.floor(p * n)));

  useMotionValueEvent(scrollYProgress, "change", (p) => !reduce && setActive(toIdx(p)));
  useEffect(() => {
    if (reduce) return setActive(n - 1);
    const id = requestAnimationFrame(() => setActive(toIdx(scrollYProgress.get())));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <motion.div {...rise(0.85)} className="mt-9 md:mt-10">
      <div className="label mb-4 text-subtle">One connected system</div>
      <ol ref={ref} className="relative grid grid-cols-3 gap-y-6 lg:grid-cols-6">
        {SYSTEM.map((node, i) => {
          const lit = i <= active;
          return (
            <li
              key={node.name}
              className={cn(
                "relative border-t pr-3 pt-5 transition-colors duration-500",
                i < active ? "border-accent" : "border-border"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -top-[6px] left-0 h-3 w-3 rounded-full border-2 transition-all duration-500",
                  lit ? "border-accent bg-accent" : "border-border-bright bg-bg",
                  i === active && "shadow-[0_0_0_5px_rgba(234,106,45,0.18),0_0_16px_rgba(234,106,45,0.6)]"
                )}
              />
              <div
                className={cn(
                  "flex items-center gap-2 text-[15px] font-medium transition-colors duration-500",
                  lit ? "text-text" : "text-muted"
                )}
              >
                <node.icon className={cn("h-4 w-4 transition-colors duration-500", lit ? "text-accent" : "text-subtle")} strokeWidth={1.8} />
                {node.name}
              </div>
              <p className={cn("mt-1 text-[13px] leading-snug transition-colors duration-500", lit ? "text-muted" : "text-subtle")}>
                {node.sub}
              </p>
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}

/* One workflow run: Form Submit → Enrich → AI Agent → Guardrail → CRM + Send */
function LiveRun() {
  const reduce = useReducedMotion();
  const n = NODES.length;
  const [tick, setTick] = useState(-1);

  useEffect(() => {
    if (reduce) setTick(n - 1);
  }, [reduce, n]);

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(
      () => setTick((t) => (t >= n + 1 ? 0 : t + 1)),
      tick === -1 ? 1600 : STEP_MS
    );
    return () => clearTimeout(id);
  }, [tick, reduce, n]);

  const active = Math.min(Math.max(tick, 0), n - 1);
  const done = tick >= n - 1;
  const state = (i: number) =>
    tick < 0 ? "idle" : done ? "done" : i < active ? "done" : i === active ? "active" : "idle";
  const fill = tick < 0 ? 0 : active / (n - 1);

  return (
    <div className="rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <span className="label text-subtle">Workflow · new enquiry</span>
        <span className="label flex items-center gap-2 text-muted">
          <StatusDot tone="accent" /> {done ? "Complete" : "Running"}
        </span>
      </div>

      <ol className="relative">
        <div aria-hidden className="absolute bottom-[24px] left-[13px] top-[24px] w-px bg-border">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-accent"
            animate={{ scaleY: fill }}
            transition={{ duration: STEP_MS / 1000 - 0.15, ease: "easeInOut" }}
          />
        </div>
        {NODES.map((node, i) => {
          const st = state(i);
          return (
            <motion.li
              key={node.name}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.9 + i * 0.1 }}
              className="relative flex items-center gap-4 py-1.5"
            >
              <span className="relative grid h-[27px] w-[27px] shrink-0 place-items-center">
                <span
                  className={cn(
                    "relative z-10 h-3 w-3 rounded-full border-2 transition-all duration-500",
                    st === "idle" && "border-border-bright bg-bg",
                    st === "active" && "border-accent bg-accent shadow-[0_0_0_5px_rgba(234,106,45,0.2),0_0_18px_rgba(234,106,45,0.7)]",
                    st === "done" && "border-accent bg-accent"
                  )}
                />
              </span>
              <div
                className={cn(
                  "flex flex-1 items-center justify-between gap-3 rounded-xl border px-4 py-2.5 transition-colors duration-500",
                  st === "active" ? "border-accent/60 bg-accent/[0.07]" : "border-border bg-bg/40"
                )}
              >
                <div className="min-w-0">
                  <div className={cn("text-[15px] font-medium transition-colors", st === "idle" ? "text-muted" : "text-text")}>
                    {node.name}
                  </div>
                  <div className="h-5 overflow-hidden">
                    <AnimatePresence initial={false}>
                      {st !== "idle" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                          className="truncate text-[12.5px] leading-5 text-subtle"
                        >
                          {node.log}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <span className={cn("label shrink-0 text-[10px]", st === "idle" ? "text-subtle" : "text-accent")}>
                  {node.tag}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
