"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, SPRING } from "./ui";

/* The hero's one visual hook: PHONE → AI → CALENDAR.
   Three customer messages arrive, each travels into the AI core, a reply travels out, a slot books.
   Driven by one small timeline (setTimeout chain), paused off-screen; reduced motion shows the end state. */

const MESSAGES = ["Hi, is this available tomorrow?", "Can I book an appointment?", "I wanted to know the price."];
const REPLIES = ["Absolutely — here's what we can do.", "Would 11 AM work for you?", "You're booked."];
// calendar: 5 days × 3 times; a few slots already taken, three get booked by the flow
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["10:00", "11:00", "16:00"];
const TAKEN = ["0-0", "3-2", "4-0"];
const NEW_SLOTS = ["1-1", "2-2", "4-1"]; // Tue 11:00, Wed 16:00, Fri 11:00

// per message: in → travel to core → core pulse → reply travels out → slot books (delay before next sub-step, ms)
const SUB_MS = [650, 850, 260, 850, 700];
const PER = SUB_MS.length;
const END = MESSAGES.length * PER; // final state index
const HOLD_MS = 3600;

function useStep(run: boolean, reduce: boolean | null) {
  const [s, setS] = useState(-1);
  useEffect(() => {
    if (reduce) return setS(END);
  }, [reduce]);
  useEffect(() => {
    if (reduce || !run) return;
    const delay = s < 0 ? 700 : s >= END ? HOLD_MS : SUB_MS[s % PER];
    const id = setTimeout(() => setS((v) => (v >= END ? -1 : v + 1)), delay);
    return () => clearTimeout(id);
  }, [s, run, reduce]);
  return s;
}

function useWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

/** A bubble that travels across a lane (left→right on desktop, top→bottom on phones).
    Transform-only: a lane-sized wrapper slides by 100% of its own size, carrying the bubble. */
function Packet({ text, tone, wide }: { text: string; tone: "in" | "out"; wide: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10"
      initial={wide ? { x: "0%" } : { y: "0%" }}
      animate={wide ? { x: "100%" } : { y: "100%" }}
      transition={{ duration: 0.85, ease: [0.45, 0, 0.2, 1] }}
    >
      <motion.span
        className={cn(
          "absolute block max-w-[170px] truncate whitespace-nowrap rounded-full px-3 py-1.5 text-[11.5px] font-medium shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]",
          tone === "in" ? "border border-border-bright bg-[#2a1d15] text-text" : "border border-accent/60 bg-[#3a1d0f] text-accent-2",
          wide ? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" : "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        )}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.9] }}
        transition={{ duration: 0.85, times: [0, 0.18, 0.8, 1] }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

function Lane({ active, children }: { active: boolean; children?: React.ReactNode }) {
  return (
    <div className="relative h-14 w-full shrink-0 md:h-full md:w-auto md:min-w-[70px] md:flex-1">
      {/* layout is pure CSS (no layout shift at hydration); only packet travel direction reads the breakpoint */}
      <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
        <line x1="50%" y1="0" x2="50%" y2="100%" className={cn("flow-dash md:hidden", active && "flow-dash-on")} />
        <line x1="0" y1="50%" x2="100%" y2="50%" className={cn("flow-dash hidden md:inline", active && "flow-dash-on")} />
      </svg>
      <AnimatePresence>{children}</AnimatePresence>
    </div>
  );
}

export default function HeroFlow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const wide = useWide();
  const s = useStep(inView, reduce);

  const reached = (i: number, sub: number) => s >= i * PER + sub;
  const at = (i: number, sub: number) => s === i * PER + sub;
  const pulsing = s >= 0 && s < END && s % PER >= 1 && s % PER <= 3;
  const bookedCount = NEW_SLOTS.filter((_, i) => reached(i, 4)).length;

  const label = "label text-[10.5px] tracking-[0.14em] text-subtle";
  const stageLabel = "mt-3 text-center text-[13.5px] font-medium text-muted md:mt-4 md:text-[14px]";

  return (
    <figure ref={ref} className="relative mx-auto w-full max-w-[1100px]" data-run={inView && !reduce ? "on" : "off"}>
      <figcaption className="sr-only">
        A customer message arrives on the phone, Flow HQ AI reads it and replies, and the booking appears in the calendar — automatically.
      </figcaption>

      <div aria-hidden className="relative">
        {/* the one line that explains the visual */}
        <p className="mb-8 text-balance text-center text-[clamp(1.05rem,1.7vw,1.35rem)] font-semibold tracking-[-0.01em] text-text md:mb-10">
          Messages in. <span className="text-accent-2">AI handles it.</span> Bookings out.
        </p>

        <div className="relative flex flex-col items-center md:h-[420px] md:flex-row">
          {/* 1 · PHONE */}
          <div className="flex shrink-0 flex-col items-center">
            <div className="glass relative w-[232px] overflow-hidden rounded-[34px] p-2 md:w-[240px]">
              <div className="rounded-[27px] border border-border bg-[#0d0806]/85">
                <div className="flex items-center justify-between px-5 pb-2 pt-3">
                  <span className="text-[10.5px] font-semibold text-muted">9:41</span>
                  <span className="h-4 w-16 rounded-full bg-black/70" />
                  <span className="flex gap-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted/70" />
                  </span>
                </div>
                <div className="flex items-center gap-2.5 border-b border-border px-4 pb-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#25D366]/15 text-[11px] font-bold text-[#25D366]">W</span>
                  <div className="leading-tight">
                    <div className="text-[11.5px] font-semibold text-text">Your business</div>
                    <div className="text-[9.5px] text-subtle">WhatsApp</div>
                  </div>
                </div>
                <div className={cn("flex h-[214px] flex-col justify-end gap-2 overflow-hidden px-3 py-3 [mask-image:linear-gradient(to_bottom,transparent,#000_16%)] md:h-[292px]")}>
                  <AnimatePresence initial={false}>
                    {MESSAGES.map((m, i) => [
                      reached(i, 0) && (
                        <motion.div
                          key={`m${i}`}
                          layout="position"
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.25 } }}
                          transition={SPRING.ui}
                          className="max-w-[85%] self-start rounded-2xl rounded-bl-md border border-border bg-surface-2 px-3 py-2 text-[11.5px] leading-snug text-text"
                        >
                          {m}
                        </motion.div>
                      ),
                      reached(i, 3) && (
                        <motion.div
                          key={`r${i}`}
                          layout="position"
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.25 } }}
                          transition={SPRING.ui}
                          className="max-w-[85%] self-end rounded-2xl rounded-br-md border border-accent/35 bg-accent/15 px-3 py-2 text-[11.5px] leading-snug text-text"
                        >
                          {REPLIES[i]}
                          <span className="mt-0.5 block text-[9px] font-semibold text-accent-2">✓ Flow HQ AI</span>
                        </motion.div>
                      ),
                    ])}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className={stageLabel}>
              <span className={cn(label, "mb-1 block")}>01 · Inbox</span>
              Customers message you
            </div>
          </div>

          {/* lane: phone → core */}
          <Lane active={pulsing}>
            {MESSAGES.map((m, i) => at(i, 1) && <Packet key={`pin${i}`} text={m} tone="in" wide={wide} />)}
          </Lane>

          {/* 2 · AI CORE */}
          <div className="flex shrink-0 flex-col items-center">
            <div className="relative grid h-[128px] w-[128px] place-items-center md:h-[184px] md:w-[184px]">
              <span className="core-halo absolute inset-[-30%] rounded-full" />
              <span className="absolute inset-0 rounded-full border border-accent/20" />
              <span className="core-orbit absolute inset-[10%] rounded-full border border-dashed border-[rgba(245,220,200,0.14)]">
                <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-2 shadow-[0_0_10px_rgba(241,122,59,0.9)]" />
                <span className="absolute -bottom-[2px] left-[20%] h-1 w-1 rounded-full bg-[rgba(245,220,200,0.6)]" />
              </span>
              <AnimatePresence>
                {MESSAGES.map(
                  (_, i) =>
                    at(i, 2) && (
                      <motion.span
                        key={`ring${i}`}
                        className="absolute inset-[18%] rounded-full border-2 border-accent/60"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, ease: EASE }}
                      />
                    )
                )}
              </AnimatePresence>
              <motion.span
                className="core-sphere relative grid h-[58%] w-[58%] place-items-center rounded-full"
                animate={pulsing ? { scale: [1, 1.07, 1] } : { scale: 1 }}
                transition={pulsing ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : SPRING.ui}
              >
                <span className="font-logo text-[16px] font-bold tracking-tight text-[#2a0f04] md:text-[21px]">AI</span>
              </motion.span>
            </div>
            <div className={stageLabel}>
              <span className={cn(label, "mb-1 block")}>02 · Flow HQ AI</span>
              Flow HQ AI handles it
            </div>
          </div>

          {/* lane: core → calendar */}
          <Lane active={pulsing}>
            {REPLIES.map((r, i) => at(i, 3) && <Packet key={`pout${i}`} text={r} tone="out" wide={wide} />)}
          </Lane>

          {/* 3 · CALENDAR */}
          <div className="flex shrink-0 flex-col items-center">
            <div className="glass w-[276px] rounded-[22px] p-4 md:w-[290px]">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-semibold text-text">This week</span>
                <span className="label text-[9.5px] text-accent-2">{bookedCount > 0 ? `+${bookedCount} booked` : "Bookings"}</span>
              </div>
              <div className="mt-3 grid grid-cols-[34px_repeat(5,1fr)] gap-1.5">
                <span />
                {DAYS.map((d) => (
                  <span key={d} className="text-center text-[9.5px] font-medium text-subtle">
                    {d}
                  </span>
                ))}
                {TIMES.map((t, r) => [
                  <span key={t} className="self-center text-[9px] tabular-nums text-subtle">
                    {t}
                  </span>,
                  ...DAYS.map((_, c) => {
                    const key = `${c}-${r}`;
                    const n = NEW_SLOTS.indexOf(key);
                    const booked = n >= 0 && reached(n, 4);
                    return (
                      <span key={key} className="relative h-9 rounded-md border border-dashed border-[rgba(245,220,200,0.1)]">
                        {TAKEN.includes(key) && <span className="absolute inset-0 rounded-md bg-[rgba(245,220,200,0.07)]" />}
                        <AnimatePresence>
                          {booked && (
                            <motion.span
                              key="b"
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ opacity: 0, transition: { duration: 0.3 } }}
                              transition={SPRING.success}
                              className="absolute inset-[-1px] grid place-items-center rounded-md border border-accent/70 bg-accent/25 text-accent-2 shadow-[0_0_16px_-4px_rgba(234,106,47,0.7)]"
                            >
                              <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    );
                  }),
                ])}
              </div>
              <div className="mt-3 flex h-8 items-center gap-2 rounded-lg border border-border bg-bg/50 px-2.5 text-[11px] text-muted">
                <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", bookedCount ? "bg-accent shadow-[0_0_8px_rgba(234,106,47,0.9)]" : "bg-border-bright")} />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={bookedCount}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="truncate"
                  >
                    {bookedCount ? `New booking · ${DAYS[+NEW_SLOTS[bookedCount - 1][0]]} ${TIMES[+NEW_SLOTS[bookedCount - 1][2]]} · confirmed` : "Waiting for messages…"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className={stageLabel}>
              <span className={cn(label, "mb-1 block")}>03 · Calendar</span>
              Bookings appear. You do nothing.
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
