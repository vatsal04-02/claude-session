"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, ClipboardList, Database, Mail, MessageCircle, PhoneIncoming, Sheet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import LogoMark from "./LogoMark";
import { SPRING } from "./ui";

/* The hero's one visual: WORK COMES IN → FLOW HQ AI → WORK GETS DONE → BUSINESS KEEPS MOVING.
   One small timeline (setTimeout chain) cycles through everyday examples; paused off-screen;
   reduced motion shows one finished example. Layout is pure CSS — JS only picks what's lit. */

const INPUTS = [
  { name: "WhatsApp", Icon: MessageCircle },
  { name: "Website form", Icon: ClipboardList },
  { name: "Email", Icon: Mail },
  { name: "Calls", Icon: PhoneIncoming },
  { name: "CRM", Icon: Database },
  { name: "Spreadsheet", Icon: Sheet },
] as const;

// each example: which input it comes from, what it is, what the AI understood, what gets done
const EXAMPLES = [
  { input: 0, packet: "New message", understood: "Customer enquiry", actions: ["Lead added to CRM", "Reply sent", "Team notified"] },
  { input: 1, packet: "New form", understood: "Project request", actions: ["Lead created", "Task assigned", "Report updated"] },
  { input: 2, packet: "Invoice email", understood: "Invoice details", actions: ["Data extracted", "Spreadsheet updated", "Payment reminder set"] },
  { input: 3, packet: "Missed call", understood: "Callback needed", actions: ["Customer messaged back", "Task created", "Team notified"] },
  { input: 4, packet: "Deal closed", understood: "New customer", actions: ["Invoice drafted", "Onboarding started", "Follow-up scheduled"] },
] as const;

// phases of one example and how long each lasts (ms)
// 0 input lights · 1 travels in · 2 AI reading · 3 understood · 4 travels out · 5–7 actions fire · 8 growth ticks
const PHASE_MS = [450, 850, 750, 550, 750, 300, 300, 450, 1700];
const LAST = PHASE_MS.length - 1;
const STEPS = ["Understand", "Decide", "Act"] as const;

function useTimeline(run: boolean, reduce: boolean | null) {
  const [t, setT] = useState({ ex: 0, ph: -1, done: 0 });
  useEffect(() => {
    if (reduce) setT({ ex: 0, ph: LAST, done: 1 });
  }, [reduce]);
  useEffect(() => {
    if (reduce || !run) return;
    const delay = t.ph < 0 ? 600 : PHASE_MS[t.ph];
    const id = setTimeout(
      () =>
        setT((v) =>
          v.ph >= LAST
            ? { ex: (v.ex + 1) % EXAMPLES.length, ph: 0, done: v.done }
            : { ...v, ph: v.ph + 1, done: v.ph + 1 === LAST ? v.done + 1 : v.done }
        ),
      delay
    );
    return () => clearTimeout(id);
  }, [t, run, reduce]);
  return t;
}

function useWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

/** A small pill that travels along a lane. Transform-only: a lane-sized wrapper slides by 100% of its own size. */
function Packet({ text, tone, wide }: { text: string; tone: "in" | "out"; wide: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10"
      initial={wide ? { x: "0%" } : { y: "0%" }}
      animate={wide ? { x: "100%" } : { y: "100%" }}
      transition={{ duration: 0.8, ease: [0.45, 0, 0.2, 1] }}
    >
      <motion.span
        className={cn(
          "absolute flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]",
          tone === "in" ? "border border-border-bright bg-[#241913] text-text" : "border border-accent/50 bg-[#33190d] text-accent-2",
          wide ? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" : "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        )}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.9] }}
        transition={{ duration: 0.8, times: [0, 0.18, 0.8, 1] }}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", tone === "in" ? "bg-text/70" : "bg-accent")} />
        {text}
      </motion.span>
    </motion.div>
  );
}

function Lane({ active, children }: { active: boolean; children?: React.ReactNode }) {
  return (
    <div className="relative h-12 w-full shrink-0 lg:h-full lg:w-auto lg:min-w-[64px] lg:flex-1">
      <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
        <line x1="50%" y1="0" x2="50%" y2="100%" className={cn("flow-dash lg:hidden", active && "flow-dash-on")} />
        <line x1="0" y1="50%" x2="100%" y2="50%" className={cn("flow-dash hidden lg:inline", active && "flow-dash-on")} />
      </svg>
      <AnimatePresence>{children}</AnimatePresence>
    </div>
  );
}

const stageLabel = "label mb-2.5 text-center text-[10px] tracking-[0.16em] text-subtle lg:absolute lg:inset-x-0 lg:top-0 lg:mb-0";

export default function HeroFlow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const wide = useWide();
  const { ex, ph, done } = useTimeline(inView, reduce);
  const e = EXAMPLES[ex];

  const working = ph >= 1 && ph <= 4;
  const status = ph < 2 ? "Waiting for work…" : ph === 2 ? "Reading it…" : ph <= 4 ? `Understood: ${e.understood}` : "Done — automatically";
  const growth = Math.min(7, 2 + done); // bars lit: a little more with every finished example

  return (
    <figure ref={ref} className="relative mx-auto w-full max-w-[1080px]" data-run={inView && !reduce ? "on" : "off"}>
      <figcaption className="sr-only">
        Work comes into the business from WhatsApp, website forms, email, calls, the CRM and spreadsheets. Flow HQ AI understands it and
        does the follow-on work automatically — updating the CRM, sending replies, creating tasks, notifying the team and updating reports —
        so the business keeps moving and has more time to grow.
      </figcaption>

      <div aria-hidden className="relative">
        <p className="mb-7 text-center text-[clamp(1.05rem,1.7vw,1.3rem)] font-semibold tracking-[-0.01em] text-text lg:mb-9">
          Work in. <span className="text-accent-2">Automation takes over.</span>
        </p>

        <div className="relative flex flex-col items-center lg:h-[340px] lg:flex-row lg:items-center">
          {/* 1 · WORK COMES IN */}
          <div className="flex w-full max-w-[340px] shrink-0 flex-col lg:relative lg:h-full lg:w-[200px] lg:justify-center">
            <div className={stageLabel}>01 · Work comes in</div>
            <ul className="glass grid grid-cols-3 gap-1 rounded-[20px] p-2 lg:grid-cols-1 lg:p-2.5">
              {INPUTS.map(({ name, Icon }, i) => {
                const lit = i === e.input && ph >= 0 && ph <= 1;
                return (
                  <li
                    key={name}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl border px-1 py-2 text-center text-[10.5px] transition-[border-color,background-color,color] duration-300 lg:flex-row lg:gap-2.5 lg:px-3 lg:py-2 lg:text-left lg:text-[12.5px]",
                      lit ? "border-accent/60 bg-accent/10 text-text" : "border-transparent text-muted"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0 transition-colors duration-300", lit ? "text-accent-2" : "text-subtle")} strokeWidth={1.8} />
                    <span className="leading-tight">{name}</span>
                    <span
                      className={cn(
                        "ml-auto hidden h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(234,106,47,0.9)] transition-opacity duration-300 lg:block",
                        lit ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <Lane active={working}>{ph === 1 && <Packet key={`in${ex}`} text={e.packet} tone="in" wide={wide} />}</Lane>

          {/* 2 · FLOW HQ AI — the engine */}
          <div className="flex w-full max-w-[300px] shrink-0 flex-col lg:relative lg:h-full lg:w-[236px] lg:justify-center">
            <div className={stageLabel}>02 · Flow HQ AI</div>
            <div className="glass relative overflow-hidden rounded-[22px] p-4">
              <div className="flex items-center justify-between">
                <span className="label text-[10px] tracking-[0.14em] text-text">Automation engine</span>
                <span className="label flex items-center gap-1.5 text-[9.5px] text-subtle">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      working ? "bg-accent shadow-[0_0_8px_rgba(234,106,47,0.9)]" : "bg-[#4ade80]/80"
                    )}
                  />
                  {working ? "Working" : "Live"}
                </span>
              </div>

              {/* the core: the Flow HQ mark on a quiet chip; a thin ring turns while it works */}
              <div className="relative mx-auto mt-4 grid h-[92px] w-[92px] place-items-center">
                <span className="engine-ring absolute inset-0 rounded-[26px] border border-dashed border-[rgba(245,220,200,0.16)]" data-on={working} />
                <motion.span
                  className="relative grid h-[68px] w-[68px] place-items-center rounded-[20px] border border-accent/35 bg-[linear-gradient(160deg,#2b1a11,#170e09)] shadow-[0_10px_30px_-12px_rgba(234,106,47,0.55),inset_0_1px_0_rgba(255,220,190,0.08)]"
                  animate={working && !reduce ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  transition={working && !reduce ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : SPRING.ui}
                >
                  <LogoMark className="h-9 w-9" gradientId="heroflow-mark" />
                </motion.span>
              </div>

              <div className="mt-4 space-y-1.5">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center gap-2.5">
                    <span className="label w-[84px] shrink-0 text-[9px] text-subtle">{s}</span>
                    <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-[rgba(245,220,200,0.08)]">
                      <span
                        className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-accent/70 to-accent-2 transition-transform duration-500 ease-out"
                        style={{ transform: `scaleX(${ph >= 2 + i ? 1 : 0})` }}
                      />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-5 overflow-hidden text-[11.5px] text-muted">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="truncate"
                  >
                    {status}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <Lane active={working}>{ph === 4 && <Packet key={`out${ex}`} text="Automating" tone="out" wide={wide} />}</Lane>

          {/* 3 · WORK GETS DONE → 4 · BUSINESS KEEPS MOVING */}
          <div className="flex w-full max-w-[340px] shrink-0 flex-col lg:relative lg:h-full lg:w-[262px] lg:justify-center">
            <div className={stageLabel}>03 · Work gets done</div>
            <ul className="glass h-[150px] space-y-1.5 overflow-hidden rounded-[20px] p-2.5">
              <AnimatePresence initial={false}>
                {e.actions.map(
                  (a, i) =>
                    ph >= 5 + i && (
                      <motion.li
                        key={`${ex}-${a}`}
                        initial={{ opacity: 0, x: 14, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={SPRING.success}
                        className="flex items-center gap-2.5 rounded-xl border border-border bg-bg/40 px-3 py-2 text-[12.5px] text-text"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-accent-2">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {a}
                      </motion.li>
                    )
                )}
              </AnimatePresence>
            </ul>

            <span className="mx-auto h-4 w-px bg-gradient-to-b from-accent/50 to-accent/10" />
            <div className="glass flex items-center gap-4 rounded-[20px] px-4 py-3">
              <div className="flex h-9 items-end gap-[3px]">
                {Array.from({ length: 7 }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-[5px] origin-bottom rounded-[2px] transition-[transform,background-color] duration-700 ease-out",
                      i < growth ? "bg-accent/80" : "bg-[rgba(245,220,200,0.12)]"
                    )}
                    style={{ height: `${30 + i * 10}%`, transform: `scaleY(${i < growth ? 1 : 0.45})` }}
                  />
                ))}
              </div>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-text">Business keeps moving.</div>
                <div className="mt-0.5 text-[11.5px] text-subtle">Less manual work. More time to grow.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
