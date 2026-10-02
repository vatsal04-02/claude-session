"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  BellRing,
  CalendarCheck,
  Database,
  Globe,
  Sparkles,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/cn";
import { Button, EASE, Magnetic, StatusDot } from "./ui";

type FlowNode = { icon: LucideIcon; label: string; tag: string; msg: string };

const NODES: FlowNode[] = [
  { icon: Globe, label: "Website", tag: "CAPTURE", msg: "New enquiry submitted from your website" },
  { icon: UserPlus, label: "Lead", tag: "LEADS", msg: "Lead created and assigned to the front desk" },
  { icon: Sparkles, label: "AI", tag: "AI", msg: "AI reads intent: evening appointment, high priority" },
  { icon: Database, label: "CRM", tag: "AI CRM", msg: "Customer timeline created with full context" },
  { icon: BellRing, label: "Follow-up", tag: "AUTOMATION", msg: "WhatsApp follow-up scheduled automatically" },
  { icon: CalendarCheck, label: "Booking", tag: "BOOKING", msg: "Appointment confirmed and reminder queued" },
];

const HEADLINE_1 = "Your business should run like a system.".split(" ");
const HEADLINE_2 = "We build the system.".split(" ");

function Word({ children, i, grad }: { children: string; i: number; grad?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className={cn("inline-block", grad && "grad-text")}
        initial={{ y: "110%", rotate: 3 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.07 }}
      >
        {children}
      </motion.span>{" "}
    </span>
  );
}

export default function Hero() {
  const { open } = useDemo();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const orbY = useTransform(scrollY, [0, 800], [0, 160]);
  const contentY = useTransform(scrollY, [0, 600], [0, -40]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0.25]);

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-32 md:px-8 md:pb-32 md:pt-44">
      {/* background: drifting glow + faint grid */}
      <motion.div aria-hidden style={{ y: orbY }} className="pointer-events-none absolute inset-0">
        <div className="anim-drift-a absolute -left-32 top-[-10%] h-[520px] w-[520px] rounded-full bg-accent/[0.13] blur-[120px]" />
        <div className="anim-drift-b absolute -right-24 top-[5%] h-[480px] w-[480px] rounded-full bg-accent-2/[0.14] blur-[120px]" />
      </motion.div>
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex max-w-[1200px] flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="label inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-accent"
        >
          <span aria-hidden>✦</span> AI Automation Studio
        </motion.span>

        <h1
          className="mt-8 max-w-[15ch] text-[clamp(2.75rem,8.4vw,5.5rem)] leading-[1.03] tracking-[-0.04em] text-text md:max-w-[17ch]"
          style={{ fontWeight: 680 }}
          aria-label="Your business should run like a system. We build the system."
        >
          <span aria-hidden>
            {HEADLINE_1.map((w, i) => (
              <Word key={i} i={i}>
                {w}
              </Word>
            ))}
            <br />
            {HEADLINE_2.map((w, i) => (
              <Word key={i} i={i + HEADLINE_1.length} grad>
                {w}
              </Word>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          FlowHQ builds AI-powered systems that capture leads, manage customers, automate
          follow-ups and keep your business moving.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <Button size="lg" onClick={open}>
              Book a Free Demo
            </Button>
          </Magnetic>
          <Button
            size="lg"
            variant="ghost"
            href="#system"
            arrow={<ArrowDown className="h-4 w-4" />}
            arrowMove="y"
          >
            See How It Works
          </Button>
        </motion.div>

        <WorkflowGraph />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Live workflow graph: Website → Lead → AI → CRM → Follow-up → Booking */
/* ------------------------------------------------------------------ */

const STEP_MS = 1150;
const HOLD_STEPS = 3; // pause after the last node before restarting

function WorkflowGraph() {
  const reduce = useReducedMotion();
  const n = NODES.length;
  const [tick, setTick] = useState(-1);

  useEffect(() => {
    if (reduce) {
      setTick(n - 1);
      return;
    }
    const start = setTimeout(() => setTick(0), 2000);
    return () => clearTimeout(start);
  }, [reduce, n]);

  useEffect(() => {
    if (reduce || tick < 0) return;
    const id = setTimeout(
      () => setTick((t) => (t >= n - 1 + HOLD_STEPS ? 0 : t + 1)),
      STEP_MS
    );
    return () => clearTimeout(id);
  }, [tick, reduce, n]);

  const active = Math.min(Math.max(tick, 0), n - 1);
  const finished = tick >= n - 1;
  const progress = tick < 0 ? 0 : active / (n - 1);

  const nodeState = (i: number): "idle" | "active" | "done" => {
    if (tick < 0) return "idle";
    if (finished) return "done";
    return i < active ? "done" : i === active ? "active" : "idle";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 1.3 }}
      className="relative mt-16 w-full max-w-[1040px] md:mt-24"
    >
      <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-accent/30 via-border to-transparent opacity-70" />
      <div className="noise relative overflow-hidden rounded-[28px] border border-border/60 bg-surface/90 p-5 backdrop-blur md:p-8">
        {/* window chrome */}
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-border-bright" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-bright" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-bright" />
          </div>
          <span className="label flex items-center gap-2 text-subtle">
            <StatusDot tone="success" /> Live workflow
          </span>
        </div>

        {/* desktop — horizontal */}
        <div className="relative hidden md:block">
          <div className="absolute left-[8.333%] right-[8.333%] top-[28px] h-[2px] -translate-y-1/2 rounded-full bg-border">
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-2"
              animate={{ scaleX: progress }}
              transition={{ duration: STEP_MS / 1000 - 0.1, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgba(94,231,247,0.25),0_0_24px_6px_rgba(94,231,247,0.7)]"
              animate={{ left: `${progress * 100}%`, opacity: tick < 0 ? 0 : 1 }}
              transition={{ duration: STEP_MS / 1000 - 0.1, ease: "easeInOut" }}
            />
          </div>
          <ol className="relative grid grid-cols-6">
            {NODES.map((node, i) => (
              <NodeView key={node.label} node={node} i={i} state={nodeState(i)} />
            ))}
          </ol>
        </div>

        {/* mobile — vertical */}
        <div className="relative md:hidden">
          <div className="absolute bottom-[38px] left-[25px] top-[38px] w-[2px] rounded-full bg-border">
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-gradient-to-b from-accent to-accent-2"
              animate={{ scaleY: progress }}
              transition={{ duration: STEP_MS / 1000 - 0.1, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_5px_rgba(94,231,247,0.25),0_0_20px_5px_rgba(94,231,247,0.7)]"
              animate={{ top: `${progress * 100}%`, opacity: tick < 0 ? 0 : 1 }}
              transition={{ duration: STEP_MS / 1000 - 0.1, ease: "easeInOut" }}
            />
          </div>
          <ol className="relative">
            {NODES.map((node, i) => (
              <NodeView key={node.label} node={node} i={i} state={nodeState(i)} vertical />
            ))}
          </ol>
        </div>

        {/* live caption */}
        <div className="mt-6 flex min-h-[52px] items-center gap-3 rounded-xl border border-border bg-bg/60 px-4 py-3 md:mt-10">
          <span className="label shrink-0 text-accent">
            {tick < 0 ? "READY" : finished ? "DONE" : `STEP ${active + 1}/${n}`}
          </span>
          <span className="h-4 w-px bg-border" />
          <div className="relative h-6 flex-1 overflow-hidden text-left text-sm text-muted md:text-[15px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={tick < 0 ? "ready" : active}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="absolute inset-0 truncate leading-6"
              >
                {tick < 0 ? "Waiting for the next enquiry…" : NODES[active].msg}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NodeView({
  node,
  i,
  state,
  vertical,
}: {
  node: FlowNode;
  i: number;
  state: "idle" | "active" | "done";
  vertical?: boolean;
}) {
  const Icon = node.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: vertical ? 12 : 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.5 + i * 0.12 }}
      className={cn(
        vertical ? "flex h-[76px] items-center gap-4" : "flex flex-col items-center text-center"
      )}
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: state === "active" ? 1.1 : 1,
            borderColor:
              state === "idle" ? "#293548" : state === "active" ? "#5EE7F7" : "rgba(99,214,160,0.55)",
            boxShadow:
              state === "active"
                ? "0 0 0 6px rgba(94,231,247,0.12), 0 0 32px rgba(94,231,247,0.35)"
                : "0 0 0 0 rgba(94,231,247,0), 0 0 0 rgba(94,231,247,0)",
          }}
          transition={{ duration: 0.4 }}
          className={cn(
            "grid place-items-center rounded-2xl border bg-surface-2",
            vertical ? "h-[52px] w-[52px]" : "h-14 w-14"
          )}
        >
          <Icon
            className={cn(
              "h-[22px] w-[22px] transition-colors duration-300",
              state === "idle" ? "text-subtle" : state === "active" ? "text-accent" : "text-success"
            )}
            strokeWidth={1.8}
          />
        </motion.div>
        <span
          className={cn(
            "absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-surface",
            state === "done" ? "bg-success" : state === "active" ? "bg-accent" : "bg-border-bright"
          )}
        />
      </div>
      <div className={cn(vertical ? "" : "mt-4")}>
        <div
          className={cn(
            "text-[15px] font-medium transition-colors duration-300",
            state === "idle" ? "text-muted" : "text-text"
          )}
        >
          {node.label}
        </div>
        <div className="label mt-1 text-[10px] text-subtle">{node.tag}</div>
      </div>
    </motion.li>
  );
}
