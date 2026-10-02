"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Reveal, Section, SectionHeading, StatusDot } from "./ui";

type Msg = { id: number; kind: "you" | "bot" | "confirm" | "follow"; text: string };

const SCRIPTS: Record<string, { answer: string; confirm: string; follow: string }> = {
  "Do you have a slot tomorrow?": {
    answer: "Yes! Tomorrow we have 11:00 AM, 3:30 PM and 5:00 PM free. Which suits you?",
    confirm: "Booked · Tomorrow, 3:30 PM · Confirmation sent",
    follow: "Quick reminder: your appointment is tomorrow at 3:30 PM. Reply 1 to confirm or 2 to reschedule.",
  },
  "What are your prices?": {
    answer: "Happy to help! I've sent our price list. Want a free consultation so we can suggest the right option?",
    confirm: "Price list sent · Lead saved to the CRM",
    follow: "Hi again! Any questions on the prices? I can hold a consultation slot for you today.",
  },
  "I need to reschedule my appointment.": {
    answer: "No problem. I can move you to Thursday 10:00 AM or Friday 4:00 PM. Which one?",
    confirm: "Rescheduled · Thursday, 10:00 AM · Old slot released",
    follow: "All set! We'll remind you on Thursday morning. See you then.",
  },
};
const PRESETS = Object.keys(SCRIPTS);
const GREETING: Msg = { id: 0, kind: "bot", text: "Hi, thanks for messaging! How can I help you today?" };

export default function LiveDemoChat() {
  const reduce = useReducedMotion();
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [played, setPlayed] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(1);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // keep the newest message in view inside the chat only (never scrolls the page)
  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, typing, reduce]);

  const add = (kind: Msg["kind"], text: string) =>
    setMsgs((m) => [...m, { id: nextId.current++, kind, text }]);

  const play = (q: string) => {
    if (busy) return;
    const s = SCRIPTS[q];
    const d = (ms: number) => (reduce ? 0 : ms);
    setBusy(true);
    setPlayed(true);
    add("you", q);
    const at = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
    at(() => setTyping(true), d(500));
    at(() => {
      setTyping(false);
      add("bot", s.answer);
    }, d(1500));
    at(() => add("confirm", s.confirm), d(2700));
    at(() => add("follow", s.follow), d(4200));
    at(() => setBusy(false), d(4300));
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setMsgs([GREETING]);
    setTyping(false);
    setBusy(false);
    setPlayed(false);
  };

  return (
    <Section id="try-it" className="bg-[#140e0a]">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          eyebrow="Live demo"
          title="Try it in 30 seconds."
          sub="Play the customer. Watch the system work. (Demo — no real messages sent.)"
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
              {played && (
                <button
                  type="button"
                  onClick={reset}
                  className="ml-auto inline-flex cursor-pointer items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-accent"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Start over
                </button>
              )}
            </div>

            <div
              ref={box}
              data-lenis-prevent
              role="log"
              aria-live="polite"
              aria-label="Demo conversation"
              className="no-scrollbar flex h-[380px] flex-col gap-2.5 overflow-y-auto bg-bg/60 p-4"
            >
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
                      m.kind === "you" &&
                        "ml-auto rounded-2xl rounded-br-md border border-accent/30 bg-accent/15 px-4 py-2.5 text-text",
                      (m.kind === "bot" || m.kind === "follow") &&
                        "rounded-2xl rounded-bl-md border border-border bg-surface-2 px-4 py-2.5 text-text",
                      m.kind === "confirm" &&
                        "flex max-w-full items-center gap-2.5 rounded-xl border border-accent/40 bg-accent/[0.08] px-4 py-2.5 text-[13.5px] text-accent-2"
                    )}
                  >
                    {m.kind === "follow" && <div className="label mb-1 text-[10px] text-accent">Follow-up</div>}
                    {m.kind === "confirm" && <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />}
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
              </AnimatePresence>
            </div>

            <div className="border-t border-border p-4">
              <div className="label mb-3 text-[10px] text-subtle">Tap a customer message</div>
              <div className="flex flex-col gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    disabled={busy}
                    onClick={() => play(p)}
                    className="cursor-pointer rounded-full border border-border px-4 py-2.5 text-left text-[14.5px] text-text transition-colors hover:border-accent/60 hover:text-accent disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-border disabled:hover:text-text"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
