"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Database, RotateCcw, Sparkles, UserCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Ambient, EASE, Reveal, Section, StatusDot } from "./ui";

type Kind = "event" | "bot" | "you" | "ai" | "lead" | "assign" | "done";
type Step = { kind: Kind; text: string };
type Msg = Step & { id: number };

/* Scripted, illustrative sequences — one per scenario. Nothing plays until a chip is tapped.
   Each shows the system at work: incoming message → AI understanding → lead captured → team assignment → follow-up. */
const SCENARIOS: Record<string, Step[]> = {
  "Missed enquiry": [
    { kind: "event", text: "Missed call · after hours" },
    { kind: "you", text: "Hi, I called earlier — is anyone free this week?" },
    { kind: "ai", text: "Wants an appointment this week · warm lead" },
    { kind: "lead", text: "Lead captured · saved with the missed call" },
    { kind: "assign", text: "Assigned to Front desk · callback task created" },
    { kind: "bot", text: "Sorry we missed you! We have Tuesday 11 AM or Thursday 4 PM — which works for you?" },
    { kind: "done", text: "Follow-up sent automatically" },
  ],
  "No-show risk": [
    { kind: "event", text: "Appointment tomorrow, 4:00 PM · not confirmed" },
    { kind: "you", text: "Sorry, something came up tomorrow." },
    { kind: "ai", text: "Can't make it · wants to reschedule" },
    { kind: "lead", text: "Booking updated · slot released for someone else" },
    { kind: "assign", text: "Front desk notified · no action needed" },
    { kind: "bot", text: "No problem! Would Thursday 11:00 AM or Friday 5:00 PM suit you better?" },
    { kind: "done", text: "Rescheduled instead of a no-show" },
  ],
  "Silent past customer": [
    { kind: "event", text: "Past customer · no visit in a while" },
    { kind: "bot", text: "Hi! It's been a while — want me to hold a slot for you this week?" },
    { kind: "you", text: "Yes, Saturday morning if possible." },
    { kind: "ai", text: "Wants to rebook · Saturday morning" },
    { kind: "lead", text: "Customer re-activated · back in your pipeline" },
    { kind: "assign", text: "Assigned to Front desk" },
    { kind: "bot", text: "Done — Saturday 10:00 AM is yours. See you then!" },
    { kind: "done", text: "Booked again" },
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
  const [overflowing, setOverflowing] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(1);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // keep the newest message in view inside the chat only (never scrolls the page)
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
    // Only take the wheel away from Lenis while the log really has something to scroll; otherwise the
    // native scroll chains to the page and fights Lenis's smooth scroll (the stick-then-jump on the way past).
    setOverflowing(el.scrollHeight > el.clientHeight + 1);
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
      t += step.kind === "you" ? 900 : step.kind === "bot" ? 1100 : 750;
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
    <Section id="try-it" className="overflow-x-clip bg-[#130d09]">
      <Ambient className="-right-48 top-[8%] hidden h-[480px] w-[480px] md:block" />
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="label inline-flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent/70" /> Live demo
            </span>
          </Reveal>
          <Reveal delay={0.07}>
            <h2 className="display mt-5 text-[clamp(2.1rem,3.9vw,3.4rem)] leading-[1] text-text">
              <span className="mb-[0.18em] block text-[2.7em] leading-[0.86] tracking-[-0.045em] text-accent">Try</span> it in 30 seconds.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-[30rem] text-[16.5px] leading-[1.7] text-muted md:text-[17px]">
              Pick a scenario and watch Flow HQ handle it: the message comes in, AI works out what the customer wants, the lead
              is saved and assigned, and the follow-up goes out.{" "}
              <span className="text-subtle">(Sample only — no real messages sent.)</span>
            </p>
          </Reveal>
        </div>

        <Reveal y={28}>
          <div className="glass mx-auto w-full max-w-[470px] overflow-hidden rounded-[28px]">
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
              data-lenis-prevent={overflowing || undefined}
              role="log"
              aria-live="polite"
              aria-label="Sample conversation"
              className="no-scrollbar flex h-[420px] flex-col gap-2.5 overflow-y-auto overscroll-contain bg-bg/60 p-4"
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
                      (m.kind === "ai" || m.kind === "lead" || m.kind === "assign") &&
                        "flex max-w-full items-center gap-2.5 self-stretch rounded-xl border border-border bg-bg/50 px-3.5 py-2 text-[13px] text-muted",
                      m.kind === "ai" && "border-accent/30 text-text",
                      m.kind === "done" &&
                        "flex max-w-full items-center gap-2.5 rounded-xl border border-accent/40 bg-accent/[0.08] px-4 py-2.5 text-[13.5px] text-accent-2"
                    )}
                  >
                    {m.kind === "done" && <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />}
                    {m.kind === "ai" && <Sparkles className="h-4 w-4 shrink-0 text-accent" />}
                    {m.kind === "lead" && <Database className="h-4 w-4 shrink-0 text-accent-2" />}
                    {m.kind === "assign" && <UserCheck className="h-4 w-4 shrink-0 text-accent-2" />}
                    {(m.kind === "ai" || m.kind === "lead" || m.kind === "assign") ? (
                      <span>
                        <span className="label mr-2 text-[9.5px] text-subtle">{m.kind === "ai" ? "AI understood" : m.kind === "lead" ? "CRM" : "Team"}</span>
                        {m.text}
                      </span>
                    ) : (
                      m.text
                    )}
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
