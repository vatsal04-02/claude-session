"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, ClipboardList, Database, Mail, MessageCircle, PhoneIncoming, Sheet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import LogoMark from "./LogoMark";
import { SPRING } from "./ui";

/* The live pipeline: WORK COMES IN → FLOW HQ AI → WORK GETS DONE → BUSINESS KEEPS MOVING.
   One small timeline (setTimeout chain) cycles through everyday work; finished actions pile into a running
   feed, so it reads as a system with throughput rather than a loop that resets. Paused off-screen;
   reduced motion shows one finished example. Layout is pure CSS — JS only picks what's lit. */

// `tag`: the short source name shown on each finished action in the feed
const INPUTS = [
  { name: "WhatsApp", tag: "WhatsApp", Icon: MessageCircle },
  { name: "Website form", tag: "Form", Icon: ClipboardList },
  { name: "Email", tag: "Email", Icon: Mail },
  { name: "Calls", tag: "Call", Icon: PhoneIncoming },
  { name: "CRM", tag: "CRM", Icon: Database },
  { name: "Spreadsheet", tag: "Sheet", Icon: Sheet },
] as const;

// each example: which input it comes from, what arrives, what the AI understood, what gets done
const EXAMPLES = [
  { input: 0, packet: "New enquiry", understood: "Wants a quote", actions: ["CRM updated", "Follow-up sent", "Team notified"] },
  { input: 1, packet: "Form submitted", understood: "New project request", actions: ["Lead created", "Task created", "Team notified"] },
  { input: 2, packet: "Email received", understood: "Supplier invoice", actions: ["Data entered", "Sheet updated", "Payment reminder set"] },
  { input: 3, packet: "Customer request", understood: "Wants an order update", actions: ["Order found", "Update sent", "CRM updated"] },
  { input: 5, packet: "Data entered", understood: "Stock running low", actions: ["Report updated", "Reorder task created", "Team notified"] },
] as const;

// phases of one example and how long each lasts (ms):
// 0 input lights · 1 travels in · 2 AI reading · 3 understood · 4 travels out · 5–7 actions land · 8 hold
const PHASE_MS = [300, 700, 500, 350, 600, 240, 240, 320, 1100];
const LAST = PHASE_MS.length - 1;
const STEPS = ["Understand", "Decide", "Act"] as const;
const FEED_MAX = 4;
const FEED_SHIFT = { type: "spring", stiffness: 560, damping: 44 } as const;

type FeedItem = { id: number; text: string; source: string };
type State = { ex: number; ph: number; done: number; feed: FeedItem[]; next: number };

const advance = (v: State): State => {
  if (v.ph >= LAST) return { ...v, ex: (v.ex + 1) % EXAMPLES.length, ph: 0 };
  const ph = v.ph + 1;
  const e = EXAMPLES[v.ex];
  let { feed, next, done } = v;
  if (ph >= 5 && ph <= 7) {
    feed = [{ id: next, text: e.actions[ph - 5], source: INPUTS[e.input].tag }, ...feed].slice(0, FEED_MAX);
    next += 1;
  }
  if (ph === LAST) done += 1;
  return { ...v, ph, feed, next, done };
};

// the feed opens with work that was already done (the last example), so the panel is never empty
const SEED: FeedItem[] = EXAMPLES[EXAMPLES.length - 1].actions
  .map((text, id) => ({ id: -1 - id, text, source: INPUTS[EXAMPLES[EXAMPLES.length - 1].input].tag }))
  .reverse();

function useTimeline(run: boolean, reduce: boolean | null) {
  const [t, setT] = useState<State>({ ex: 0, ph: -1, done: 0, feed: SEED, next: 0 });
  useEffect(() => {
    if (!reduce) return;
    const e = EXAMPLES[0];
    setT({ ex: 0, ph: LAST, done: 1, next: 3, feed: e.actions.map((text, id) => ({ id, text, source: INPUTS[e.input].tag })).reverse() });
  }, [reduce]);
  useEffect(() => {
    if (reduce || !run) return;
    const id = setTimeout(() => setT(advance), t.ph < 0 ? 500 : PHASE_MS[t.ph]);
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
      transition={{ duration: 0.7, ease: [0.45, 0, 0.2, 1] }}
    >
      <motion.span
        className={cn(
          "absolute flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]",
          tone === "in" ? "border border-border-bright bg-[#241913] text-text" : "border border-accent/50 bg-[#33190d] text-accent-2",
          wide ? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" : "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        )}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.9] }}
        transition={{ duration: 0.7, times: [0, 0.18, 0.8, 1] }}
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

export default function LivePipeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const wide = useWide();
  const { ex, ph, done, feed } = useTimeline(inView, reduce);
  const e = EXAMPLES[ex];

  const working = ph >= 1 && ph <= 4;
  const status = ph < 2 ? "Waiting for work…" : ph === 2 ? "Reading it…" : ph <= 4 ? `Understood: ${e.understood}` : "Done — automatically";
  const growth = Math.min(7, 2 + done); // bars lit: a little more with every finished piece of work

  return (
    <figure ref={ref} className="relative mx-auto w-full max-w-[1080px]" data-run={inView && !reduce ? "on" : "off"}>
      <figcaption className="sr-only">
        Work comes into the business from WhatsApp, website forms, email, calls, the CRM and spreadsheets. Flow HQ AI understands each
        piece and does the follow-on work automatically — updating the CRM, sending follow-ups, entering data, creating tasks and
        notifying the team — so the business keeps moving and has more time to grow.
      </figcaption>

      <div aria-hidden className="relative flex flex-col items-center lg:h-[340px] lg:flex-row lg:items-center">
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
              <span className="label text-[10px] tracking-[0.14em] text-text">Engine</span>
              <span className="label flex items-center gap-1.5 text-[9.5px] text-subtle">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                    working ? "bg-accent shadow-[0_0_8px_rgba(234,106,47,0.9)]" : "bg-[#4ade80]/80"
                  )}
                />
                {working ? "Working" : "Live"}
              </span>
            </div>

            {/* the core: the Flow HQ mark on a quiet chip; a thin ring turns only while it works */}
            <div className="relative mx-auto mt-4 grid h-[92px] w-[92px] place-items-center">
              <span className="engine-ring absolute inset-0 rounded-[26px] border border-dashed border-[rgba(245,220,200,0.16)]" data-on={working} />
              <motion.span
                className="relative grid h-[68px] w-[68px] place-items-center rounded-[20px] border border-accent/35 bg-[linear-gradient(160deg,#2b1a11,#170e09)] shadow-[0_10px_30px_-12px_rgba(234,106,47,0.55),inset_0_1px_0_rgba(255,220,190,0.08)]"
                animate={working && !reduce ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={working && !reduce ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : SPRING.ui}
              >
                <LogoMark className="h-9 w-9" gradientId="pipeline-mark" />
              </motion.span>
            </div>

            <div className="mt-4 space-y-1.5">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-2.5">
                  <span className="label w-[84px] shrink-0 text-[9px] text-subtle">{s}</span>
                  <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-[rgba(245,220,200,0.08)]">
                    <span
                      className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-accent/70 to-accent-2 transition-transform duration-300 ease-out"
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
                  transition={{ duration: 0.2 }}
                  className="truncate"
                >
                  {status}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Lane active={working}>{ph === 4 && <Packet key={`out${ex}`} text="Automating" tone="out" wide={wide} />}</Lane>

        {/* 3 · WORK GETS DONE (a running feed) → BUSINESS KEEPS MOVING */}
        <div className="flex w-full max-w-[340px] shrink-0 flex-col lg:relative lg:h-full lg:w-[268px] lg:justify-center">
          <div className={stageLabel}>03 · Work gets done</div>
          <div className="glass h-[164px] overflow-hidden rounded-[20px] p-2.5">
            {/* newest on top; older work slides down and fades out at the bottom */}
            <ul className="relative h-full [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
              <AnimatePresence initial={false} mode="popLayout">
              {feed.map((f, i) => (
                <motion.li
                  key={f.id}
                  layout="position"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  // older rows make room fast; the new row fades in just behind that move, so they never overlap
                  transition={{ layout: FEED_SHIFT, y: FEED_SHIFT, scale: FEED_SHIFT, opacity: { duration: 0.22, delay: 0.08 } }}
                  className={cn(
                    "mb-1.5 flex items-center gap-2.5 rounded-xl border px-3 py-2 text-[12.5px] transition-colors duration-300",
                    i === 0 ? "border-accent/45 bg-accent/[0.07] text-text" : "border-border bg-bg/40 text-text/80"
                  )}
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-accent-2">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="truncate">{f.text}</span>
                  <span className="label ml-auto shrink-0 text-[8.5px] tracking-[0.12em] text-subtle">{f.source}</span>
                </motion.li>
              ))}
              </AnimatePresence>
            </ul>
          </div>

          <span className="mx-auto h-4 w-px bg-gradient-to-b from-accent/50 to-accent/10" />
          <div className="glass flex items-center gap-4 rounded-[20px] px-4 py-3">
            <div className="flex h-9 items-end gap-[3px]">
              {Array.from({ length: 7 }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "w-[5px] origin-bottom rounded-[2px] transition-[transform,background-color] duration-500 ease-out",
                    i < growth ? "bg-accent/80" : "bg-[rgba(245,220,200,0.12)]"
                  )}
                  style={{ height: `${30 + i * 10}%`, transform: `scaleY(${i < growth ? 1 : 0.45})` }}
                />
              ))}
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold text-text">Business keeps moving.</div>
              <div className="mt-0.5 text-[11.5px] text-subtle">More time for the work that grows it.</div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
