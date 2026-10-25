"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChartColumn, Check, Database, Inbox, ListChecks, RotateCcw, Sheet, Sparkles, Users, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { BAND, CONTAINER } from "@/lib/layout";
import { Curtain } from "./motion-fx";
import { EASE, Reveal, SectionHeading, StatusDot } from "./ui";

type Tool = "CRM" | "Sheet" | "Task" | "Team";
type Kind = "event" | "you" | "ai" | "auto" | "bot" | "done";
type Step = { kind: Kind; text: string; tool?: Tool };
type Msg = Step & { id: number };

/* Scripted, illustrative runs — one per channel / kind of work, written for local service businesses.
   Nothing plays until a chip is tapped, and no real messages are sent. Each run follows the same four steps:
   Capture → Understand → Act → Report. */
const SCENARIOS: Record<string, Step[]> = {
  "Instagram DM": [
    { kind: "event", text: "Instagram DM · 9:40 PM" },
    { kind: "you", text: "Hi! Is the weekend batch open? What's the fee?" },
    { kind: "ai", text: "Admission enquiry · weekend batch · wants fee details" },
    { kind: "auto", tool: "CRM", text: "Lead created and tagged 'Weekend batch'" },
    { kind: "bot", text: "Thanks for reaching out! Yes, the weekend batch has seats. I've sent the fee details — want a call tomorrow at 11 AM?" },
    { kind: "auto", tool: "Task", text: "Counsellor call-back scheduled" },
    { kind: "auto", tool: "Team", text: "Counsellor notified" },
    { kind: "done", text: "Answered at 9:40 PM — nobody was online" },
  ],
  "Missed call": [
    { kind: "event", text: "Missed call · 2:15 PM · front desk busy" },
    { kind: "ai", text: "Unknown number · likely an appointment request" },
    { kind: "bot", text: "Sorry we missed your call! Want to book a visit? Reply 1 for today, 2 for tomorrow." },
    { kind: "you", text: "2" },
    { kind: "ai", text: "Wants an appointment tomorrow" },
    { kind: "auto", tool: "CRM", text: "Contact saved · slot held" },
    { kind: "auto", tool: "Team", text: "Front desk notified" },
    { kind: "done", text: "Booked without a single call-back" },
  ],
  "Website form": [
    { kind: "event", text: "Website form · quote request" },
    { kind: "you", text: "We need an annual maintenance quote for 3 offices in Lucknow." },
    { kind: "ai", text: "Quote request · 3 offices · annual contract" },
    { kind: "auto", tool: "CRM", text: "Lead created with the details" },
    { kind: "bot", text: "Thanks! We've got your request and a team member will send the quote today. Could you share the office addresses?" },
    { kind: "auto", tool: "Task", text: "Quote task assigned · due in 4 hours" },
    { kind: "auto", tool: "Team", text: "Sales team notified" },
    { kind: "done", text: "Lead captured and routed in seconds" },
  ],
  "After-hours WhatsApp": [
    { kind: "event", text: "WhatsApp · 11:20 PM" },
    { kind: "you", text: "Do you have a slot for my son's check-up this Saturday?" },
    { kind: "ai", text: "Appointment request · Saturday" },
    { kind: "auto", tool: "CRM", text: "Contact created" },
    { kind: "bot", text: "Hi! We have 10:30 AM and 12 PM on Saturday. Which works for you?" },
    { kind: "you", text: "10:30 works" },
    { kind: "auto", tool: "Task", text: "Appointment booked · reminder set for Friday" },
    { kind: "auto", tool: "Team", text: "Front desk sees it first thing in the morning" },
    { kind: "done", text: "Booked overnight — nobody replied by hand" },
  ],
  "Quiet lead": [
    { kind: "event", text: "Quote sent 3 days ago · no reply" },
    { kind: "ai", text: "Quote pending · customer has gone quiet" },
    { kind: "bot", text: "Hi! Just checking in on the quote we sent. Happy to answer any questions or adjust it." },
    { kind: "you", text: "Looks good — can we start next week?" },
    { kind: "ai", text: "Ready to go ahead · wants to start next week" },
    { kind: "auto", tool: "CRM", text: "Deal moved to 'Won'" },
    { kind: "auto", tool: "Task", text: "Kick-off task created for the team" },
    { kind: "done", text: "No quote forgotten" },
  ],
};
const CHIPS = Object.keys(SCENARIOS);
const TOOL_ICON = { CRM: Database, Sheet, Task: ListChecks, Team: Users } as const;

// the four steps every run moves through (they light up on the left as the run progresses)
const STEPS = [
  { name: "Capture", line: "Every enquiry lands in one place.", Icon: Inbox },
  { name: "Understand", line: "AI reads it and decides what's next.", Icon: Sparkles },
  { name: "Act", line: "Replies, bookings and CRM updates run on their own.", Icon: Zap },
  { name: "Report", line: "You see what came in and what happened.", Icon: ChartColumn },
] as const;
const STAGE_OF: Record<Kind, number> = { event: 0, you: 0, ai: 1, auto: 2, bot: 2, done: 3 };

function ToolIcon({ tool }: { tool: Tool }) {
  const Icon = TOOL_ICON[tool];
  return <Icon className="h-4 w-4 shrink-0 text-accent-2" />;
}

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
    const el = box.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
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
      t += step.kind === "you" ? 900 : step.kind === "bot" ? 1100 : step.kind === "auto" ? 600 : 750;
    }
    at(() => {
      setBusy(false);
      setFinished(true);
    }, t - 500);
  };

  const stage = finished ? STEPS.length : msgs.reduce((m, x) => Math.max(m, STAGE_OF[x.kind]), -1);

  const reset = () => {
    clear();
    setScenario(null);
  };

  return (
    <Curtain id="try-it" className={`theme-ink overflow-x-clip ${BAND}`}>
      <div className={CONTAINER}>
      <SectionHeading
        index="03"
        eyebrow="The system"
        title={
          <>
            One system. <em>Four</em> steps.
          </>
        }
        sub={
          <>
            Pick a real situation and watch it run. <span className="text-subtle">(Sample only — no real messages sent.)</span>
          </>
        }
      />
      <div className="mt-12 grid items-stretch gap-4 md:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <ol className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:grid-rows-4">
          {STEPS.map(({ name, line, Icon }, i) => {
            const state = stage === i ? "active" : stage > i ? "done" : "idle";
            return (
              <li
                key={name}
                aria-current={state === "active" ? "step" : undefined}
                className={cn(
                  "flex min-w-0 flex-col gap-3 rounded-[20px] border p-4 transition-colors duration-300 lg:flex-row lg:items-center lg:gap-5 lg:p-5",
                  state === "active" ? "border-signal bg-signal/[0.08]" : "border-border bg-surface/50"
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                    state === "idle" ? "border-border-bright text-muted" : state === "active" ? "border-signal bg-signal text-ink" : "border-accent/50 text-accent"
                  )}
                >
                  {state === "done" ? <Check aria-hidden className="h-5 w-5" strokeWidth={2.5} /> : <Icon aria-hidden className="h-5 w-5" />}
                </span>
                <div className="min-w-0">
                  <div className="display text-[20px] leading-tight text-text" style={{ letterSpacing: "-0.03em" }}>
                    <span className="label mr-2 text-[10px] font-normal text-subtle">0{i + 1}</span>
                    {name}
                  </div>
                  <p className="mt-1 text-[13.5px] leading-[1.5] text-muted">{line}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <Reveal y={28}>
          <div className="glass w-full overflow-hidden rounded-[24px] lg:max-w-none">
            <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-5 py-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-signal text-[15px] font-bold text-ink">F</span>
              <div className="leading-tight">
                <div className="text-[15px] font-semibold">Flow HQ automation</div>
                <div className="label mt-1 flex items-center gap-2 text-[10px] text-muted">
                  <StatusDot tone="accent" /> Live demo
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
              <div className="label mb-3 text-[10px] text-subtle">Pick the work</div>
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
                        ? "border-signal bg-signal text-ink"
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
              role="log"
              aria-live="polite"
              aria-label="Sample conversation"
              className="no-scrollbar flex h-[360px] flex-col lg:h-[400px] gap-2.5 overflow-y-auto overscroll-contain bg-bg/60 p-4"
            >
              {!scenario && (
                <div className="m-auto flex w-full max-w-[340px] flex-col gap-2.5">
                  <div aria-hidden className="flex flex-col gap-2.5 opacity-60">
                    <div className="h-9 w-3/5 rounded-2xl rounded-bl-md bg-white/[0.06]" />
                    <div className="h-8 w-full rounded-xl border border-white/[0.08]" />
                    <div className="ml-auto h-9 w-2/3 rounded-2xl rounded-br-md bg-accent/[0.12]" />
                    <div className="h-8 w-4/5 rounded-xl border border-accent/20 bg-accent/[0.04]" />
                  </div>
                  <p className="mt-2 text-center text-[14px] leading-[1.6] text-subtle">Tap a situation above to watch the system handle it.</p>
                </div>
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
                      m.kind === "you" && "ml-auto rounded-2xl rounded-br-md bg-signal px-4 py-2.5 text-ink",
                      m.kind === "bot" && "rounded-2xl rounded-bl-md border border-border bg-surface-2 px-4 py-2.5 text-text",
                      (m.kind === "ai" || m.kind === "auto") &&
                        "flex max-w-full items-center gap-2.5 self-stretch rounded-xl border border-border bg-bg/50 px-3.5 py-2 text-[13px] text-muted",
                      m.kind === "ai" && "border-accent/30 text-text",
                      m.kind === "done" &&
                        "flex max-w-full items-center gap-2.5 rounded-xl border border-accent/40 bg-accent/[0.08] px-4 py-2.5 text-[13.5px] text-accent-2"
                    )}
                  >
                    {m.kind === "event" && <span className="mr-1.5 text-accent-2">Input ·</span>}
                    {m.kind === "done" && <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />}
                    {m.kind === "ai" && <Sparkles className="h-4 w-4 shrink-0 text-accent" />}
                    {m.kind === "auto" && m.tool && <ToolIcon tool={m.tool} />}
                    {m.kind === "ai" || m.kind === "auto" ? (
                      <span>
                        <span className="label mr-2 text-[9.5px] text-subtle">{m.kind === "ai" ? "AI understood" : m.tool}</span>
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
      </div>
    </Curtain>
  );
}
