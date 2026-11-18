"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ClipboardCheck, Inbox, Plug, ShieldCheck, Sparkles, UserCheck, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/cn";
import { Button, EASE, StatusDot } from "./ui";

const NODES = [
  { name: "Request in", log: "Order #1042 · received on WhatsApp" },
  { name: "Read and extract", log: "Items, quantity and address pulled out" },
  { name: "Check your systems", log: "Stock and delivery calendar checked" },
  { name: "Apply your rules", log: "Within limits · no approval needed" },
  { name: "Do the work", log: "Invoice sent · team notified" },
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
  { icon: Inbox, name: "Intake", sub: "Chats, forms, calls, files" },
  { icon: Sparkles, name: "AI", sub: "Reads and understands" },
  { icon: ShieldCheck, name: "Your rules", sub: "Decides what is allowed" },
  { icon: Plug, name: "Your tools", sub: "Records, calendar, accounts" },
  { icon: UserCheck, name: "Your team", sub: "Steps in where it matters" },
  { icon: ClipboardCheck, name: "Reports", sub: "Shows what happened" },
];

export default function Hero() {
  const { open } = useDemo();
  return (
    <section
      id="top"
      className="hero-atmos relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-[88px] md:pt-32"
    >
      <div className="relative mx-auto max-w-[1140px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
          <div>
            <h1 className="display text-[clamp(2.9rem,6.4vw,5.25rem)] text-text" style={{ fontWeight: 780, lineHeight: 1 }}>
              <motion.span {...rise(0.15)} className="block">
                Operations that
              </motion.span>
              <motion.span {...rise(0.25)} className="block">
                run themselves.
              </motion.span>
            </h1>

            <motion.p {...rise(0.4)} className="mt-8 max-w-[34rem] text-balance text-[20px] font-medium leading-[1.5] text-text">
              FlowHQ designs and builds custom AI systems around how your business actually works, wired into the tools you already use.
            </motion.p>
            <motion.p {...rise(0.5)} className="mt-4 max-w-[34rem] text-[16px] leading-[1.7] text-text">
              Intake, approvals, scheduling, documents, reporting: the repeat work your team does by hand, run by a system built for your process.
            </motion.p>

            <motion.div {...rise(0.7)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button size="lg" onClick={open}>
                Get My Free Demo
              </Button>
              <a
                href="#workflow"
                className="group inline-flex items-center gap-2 text-[15px] text-text underline decoration-transparent underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent/60"
              >
                See How It Works
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>

          <motion.div {...rise(0.5)} className="md:max-w-[540px] lg:max-w-none">
            <LiveRun />
          </motion.div>
        </div>

        <SystemStrip />
      </div>
    </section>
  );
}

/* Thin system rail: Intake → AI → Your rules → Your tools → Your team → Reports.
   A ~8s loop: the active node glows orange, finished ones go muted orange, upcoming stay grey,
   and a small light travels the line. Pauses while off-screen; static when motion is reduced. */
const RAIL_STEP_MS = 1150;

function SystemStrip() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref);
  const n = SYSTEM.length;
  const [tick, setTick] = useState(0); // 0..n-1 active node, n = all finished

  useEffect(() => {
    if (reduce) return setTick(n);
    if (!onScreen) return;
    const id = setTimeout(() => setTick((t) => (t >= n ? 0 : t + 1)), RAIL_STEP_MS);
    return () => clearTimeout(id);
  }, [tick, reduce, onScreen, n]);

  return (
    <motion.div ref={ref} {...rise(0.85)} className="mt-16 md:mt-20">
      <div className="mb-4 text-[15px] text-muted">One connected system, built around your process</div>
      <ol className="relative grid grid-cols-3 gap-y-6 lg:grid-cols-6">
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-0 hidden h-[3px] w-14 -translate-x-full -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent to-accent-2 shadow-[0_0_12px_rgba(233,107,47,0.9)] lg:block"
          initial={false}
          animate={{ left: `${(Math.min(tick, n) / n) * 100}%`, opacity: tick >= n ? 0 : 1 }}
          transition={{ left: { duration: tick === 0 ? 0 : RAIL_STEP_MS / 1000 - 0.1, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
        />
        {SYSTEM.map((node, i) => {
          const state = i < tick ? "done" : i === tick ? "active" : "next";
          return (
            <li
              key={node.name}
              className={cn(
                "relative border-t pr-3 pt-5 transition-colors duration-700",
                state === "done" ? "border-accent/40" : "border-border"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -top-[6px] left-0 h-3 w-3 rounded-full border-2 transition-all duration-700",
                  state === "active" && "border-accent bg-accent shadow-[0_0_0_5px_rgba(233,107,47,0.16),0_0_16px_rgba(233,107,47,0.55)]",
                  state === "done" && "border-accent/60 bg-accent/55",
                  state === "next" && "border-border-bright bg-bg"
                )}
              />
              <div
                className={cn(
                  "flex items-center gap-2 text-[15px] font-medium transition-colors duration-700",
                  state === "active" ? "text-text" : state === "done" ? "text-muted" : "text-subtle"
                )}
              >
                <node.icon
                  className={cn(
                    "h-4 w-4 transition-colors duration-700",
                    state === "active" ? "text-accent" : state === "done" ? "text-accent/60" : "text-subtle"
                  )}
                  strokeWidth={1.8}
                />
                {node.name}
              </div>
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}

/* One workflow run: request in → extract → check systems → apply rules → do the work */
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
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-[inset_0_1px_0_rgba(255,225,200,0.06),inset_0_0_70px_rgba(150,70,30,0.07),0_30px_60px_-30px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:border-border-bright">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[14px] text-muted">Workflow · new order</span>
        <span className="flex items-center gap-2 text-[14px] text-muted">
          <StatusDot tone="accent" pulse /> {done ? "Complete" : "Running"}
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
                  "relative flex flex-1 items-center justify-between gap-3 rounded-xl border px-4 py-2.5 transition-colors duration-500",
                  st === "active" ? "border-accent/60 bg-accent/[0.07]" : "border-border bg-bg/40"
                )}
              >
                {st === "active" && <span aria-hidden className="soft-pulse pointer-events-none absolute inset-0 rounded-xl" />}
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
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* tiny event stream: entries appear as the run progresses */}
      <ul className="mt-4 space-y-1.5 pt-1 text-[13px] leading-[1.5] tabular-nums text-muted">
        {[
          ["09:41:33", "order received", 0],
          ["09:41:35", "stock confirmed", 2],
          ["09:41:36", "invoice sent", 4],
        ].map(([t, msg, at]) => (
          <li key={t as string} className={cn("flex gap-3 transition-opacity duration-700", tick >= (at as number) ? "opacity-100" : "opacity-0")}>
            <span className="text-subtle">{t}</span>
            <span>{msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
