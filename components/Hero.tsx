"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/cn";
import { Button, EASE, StatusDot } from "./ui";

const NODES = [
  { name: "Form Submit", tag: "TRIGGER", log: "Rahul S. · physiotherapy enquiry" },
  { name: "Enrich", tag: "LOOKUP", log: "No existing record · source: website" },
  { name: "AI Agent", tag: "REASON", log: "Wants an evening appointment" },
  { name: "Guardrail", tag: "CHECK", log: "Approved template · no sensitive data" },
  { name: "CRM + Send", tag: "ACT", log: "Contact saved · WhatsApp sent" },
];

const STEP_MS = 1300;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  };
}

export default function Hero() {
  const { open } = useDemo();
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="anim-glow pointer-events-none absolute -right-40 top-10 h-[460px] w-[460px] rounded-full bg-accent/[0.12] blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-[1140px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <motion.span {...rise(0.05)} className="label text-muted">
            AI Automation Studio <span className="mx-1 text-accent">·</span> Est. 2026
          </motion.span>

          <h1 className="display mt-6 text-[clamp(3.2rem,8.4vw,6.6rem)] text-text">
            <motion.span {...rise(0.15)} className="block">
              Your business,
            </motion.span>
            <motion.span {...rise(0.28)} className="block">
              running on <em>autopilot.</em>
            </motion.span>
          </h1>

          <motion.p {...rise(0.45)} className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted">
            We build AI systems that capture leads, follow up and keep your business moving.
          </motion.p>

          <motion.div {...rise(0.58)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button size="lg" onClick={open}>
              Book a Free Demo
            </Button>
            <a
              href="#workflow"
              className="group inline-flex items-center gap-2 text-[15px] text-text transition-colors hover:text-accent"
            >
              See the workflow
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        <motion.div {...rise(0.5)}>
          <LiveRun />
        </motion.div>
      </div>
    </section>
  );
}

/* One workflow run: Form Submit → Enrich → AI Agent → Guardrail → CRM + Send */
function LiveRun() {
  const reduce = useReducedMotion();
  const n = NODES.length;
  const [tick, setTick] = useState(reduce ? n - 1 : -1);

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
    <div className="rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="label text-subtle">Workflow · new enquiry</span>
        <span className="label flex items-center gap-2 text-muted">
          <StatusDot tone="accent" /> {done ? "Complete" : "Running"}
        </span>
      </div>

      <ol className="relative">
        <div aria-hidden className="absolute bottom-[26px] left-[13px] top-[26px] w-px bg-border">
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
              className="relative flex items-center gap-4 py-2.5"
            >
              <span className="relative grid h-[27px] w-[27px] shrink-0 place-items-center">
                <span
                  className={cn(
                    "relative z-10 h-3 w-3 rounded-full border-2 transition-all duration-500",
                    st === "idle" && "border-border-bright bg-bg",
                    st === "active" && "border-accent bg-accent shadow-[0_0_0_5px_rgba(233,104,45,0.2),0_0_18px_rgba(233,104,45,0.7)]",
                    st === "done" && "border-accent bg-accent"
                  )}
                />
              </span>
              <div
                className={cn(
                  "flex flex-1 items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors duration-500",
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
