"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Reveal, Section, SectionHeading, StatusDot } from "./ui";

type Kind = "event" | "bot" | "you" | "done";
type Step = { kind: Kind; text: string };
type Msg = Step & { id: number };

/* Scripted, illustrative sequences — one per scenario. Nothing plays until a chip is tapped. */
const SCENARIOS: Record<string, Step[]> = {
  "Missed enquiry": [
    { kind: "event", text: "Missed call · after hours" },
    { kind: "bot", text: "Sorry we missed your call! How can we help? Reply here and we'll get back to you first thing." },
    { kind: "you", text: "I wanted to ask about availability this week." },
    { kind: "done", text: "Lead saved · Assigned to your team · Callback task created" },
    { kind: "bot", text: "Good morning! Following up on your enquiry — would a call at 11 AM work for you?" },
  ],
  "No-show risk": [
    { kind: "event", text: "Appointment tomorrow, 4:00 PM · not yet confirmed" },
    { kind: "bot", text: "Hi! A reminder that your appointment is tomorrow at 4:00 PM. Reply 1 to confirm or 2 to reschedule." },
    { kind: "you", text: "2" },
    { kind: "bot", text: "No problem — would Thursday 11:00 AM or Friday 5:00 PM suit you better?" },
    { kind: "done", text: "Rescheduled · Old slot released for someone else" },
  ],
  "Silent past customer": [
    { kind: "event", text: "Past customer · no visit or reply in a while" },
    { kind: "bot", text: "Hi! It's been a while — we'd love to see you again. Want me to hold a slot for you this week?" },
    { kind: "you", text: "Yes, Saturday morning if possible." },
    { kind: "done", text: "Slot held · Saturday, 10:00 AM · Team notified" },
  ],
};
const CHIPS = Object.keys(SCENARIOS);

export default function LiveDemoChat() {
  const reduce = useReducedMotion();
  const [scenario, setScenario] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [finished, setFinished] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(1);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // keep the newest message in view inside the chat only (never scrolls the page)
  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, typing, finished, reduce]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setMsgs([]);
    setTyping(false);
    setBusy(false);
    setFinished(false);
  };

  const play = (name: string) => {
    if (busy) return;
    clear();
    setScenario(name);
    setBusy(true);
    const at = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, reduce ? 0 : ms));
    let t = 250;
    for (const step of SCENARIOS[name]) {
      if (step.kind === "bot") {
        at(() => setTyping(true), t);
        t += 850;
      }
      at(() => {
        setTyping(false);
        setMsgs((m) => [...m, { ...step, id: nextId.current++ }]);
      }, t);
      t += step.kind === "you" ? 900 : 1100;
    }
    at(() => {
      setBusy(false);
      setFinished(true);
    }, t - 500);
  };

  const reset = () => {
    clear();
    setScenario(null);
  };

  return (
    <Section id="try-it" className="bg-[#140e0a]">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          eyebrow="Try it"
          title="Try it in 30 seconds."
          sub="Pick a scenario. Watch the system work. (Sample only — no real messages sent.)"
        />

        <Reveal y={28}>
          <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-5 py-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-[15px] font-bold text-[#1a0a03]">F</span>
              <div className="leading-tight">
                <div className="text-[15px] font-semibold">FlowHQ Assistant</div>
                <div className="label mt-1 flex items-center gap-2 text-[10px] text-muted">
                  <StatusDot tone="accent" /> Online
                </div>
              </div>
              {scenario && (
                <button
                  type="button"
                  onClick={reset}
                  className="ml-auto inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-accent"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Start over
                </button>
              )}
            </div>

            <div className="border-b border-border p-4">
              <div className="label mb-3 text-[10px] text-subtle">Pick a scenario</div>
              <div role="group" aria-label="Scenarios" className="flex flex-wrap gap-2">
                {CHIPS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={busy}
                    aria-pressed={scenario === c}
                    onClick={() => play(c)}
                    className={cn(
                      "min-h-11 cursor-pointer rounded-full border px-4 text-[14px] transition-colors disabled:cursor-not-allowed",
                      scenario === c
                        ? "border-accent bg-accent/15 text-text"
                        : "border-border text-text hover:border-accent/60 hover:text-accent disabled:opacity-45 disabled:hover:border-border disabled:hover:text-text"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={box}
              data-lenis-prevent
              role="log"
              aria-live="polite"
              aria-label="Sample conversation"
              className="no-scrollbar flex h-[380px] flex-col gap-2.5 overflow-y-auto bg-bg/60 p-4"
            >
              {!scenario && (
                <p className="m-auto max-w-[26ch] text-center text-[14.5px] leading-[1.6] text-subtle">
                  Tap a scenario above to watch the system handle it.
                </p>
              )}
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <motion.div
                    key={m.id}
                    layout="position"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={cn(
                      "max-w-[85%] text-[14.5px] leading-[1.5]",
                      m.kind === "event" && "label mx-auto max-w-full rounded-full border border-border px-3 py-1.5 text-center text-[10px] text-muted",
                      m.kind === "you" && "ml-auto rounded-2xl rounded-br-md border border-accent/30 bg-accent/15 px-4 py-2.5 text-text",
                      m.kind === "bot" && "rounded-2xl rounded-bl-md border border-border bg-surface-2 px-4 py-2.5 text-text",
                      m.kind === "done" &&
                        "flex max-w-full items-center gap-2.5 rounded-xl border border-accent/40 bg-accent/[0.08] px-4 py-2.5 text-[13.5px] text-accent-2"
                    )}
                  >
                    {m.kind === "done" && <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />}
                    {m.text}
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex w-16 items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-surface-2 px-4 py-3.5"
                    aria-label="Assistant is typing"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </motion.div>
                )}
                {finished && (
                  <motion.a
                    key="cta"
                    href="#audit"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="group mx-auto mt-2 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-accent"
                  >
                    See this for your business
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </motion.a>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
