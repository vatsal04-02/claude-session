"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Database, ListChecks, RotateCcw, Sheet, Sparkles, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Ambient, EASE, Reveal, Section, StatusDot } from "./ui";

type Tool = "CRM" | "Sheet" | "Task" | "Team";
type Kind = "event" | "you" | "ai" | "auto" | "bot" | "done";
type Step = { kind: Kind; text: string; tool?: Tool };
type Msg = Step & { id: number };

/* Scripted, illustrative runs — one per kind of work. Nothing plays until a chip is tapped.
   Each shows the same shape: input → AI understands → automation runs → action done. */
const SCENARIOS: Record<string, Step[]> = {
  "Missed enquiry": [
    { kind: "event", text: "Website enquiry · 9:40 PM" },
    { kind: "you", text: "Do you take custom orders? Need 50 pieces by next month." },
    { kind: "ai", text: "Bulk order enquiry · deadline next month" },
    { kind: "auto", tool: "CRM", text: "Lead created with the order details" },
    { kind: "auto", tool: "Team", text: "Sales notified · follow-up due 10 AM" },
    { kind: "bot", text: "Thanks! Yes, we do. Could you share a design or reference? Our team will send a quote tomorrow morning." },
    { kind: "done", text: "Answered in seconds — even after hours" },
  ],
  "Manual data entry": [
    { kind: "event", text: "Supplier invoice arrives by email (PDF)" },
    { kind: "ai", text: "Invoice found · supplier, amount, due date" },
    { kind: "auto", tool: "Sheet", text: "Accounts sheet updated — nobody typed it" },
    { kind: "auto", tool: "Task", text: "Payment reminder set 3 days before due" },
    { kind: "auto", tool: "Team", text: "Accounts notified" },
    { kind: "done", text: "Zero manual data entry" },
  ],
  "Follow-up": [
    { kind: "event", text: "Quote sent 3 days ago · no reply" },
    { kind: "ai", text: "Quote pending · customer gone quiet" },
    { kind: "bot", text: "Hi! Just checking in on the quote we sent. Happy to answer any questions or adjust it." },
    { kind: "you", text: "Looks good. Can we start next week?" },
    { kind: "ai", text: "Ready to go ahead · wants to start next week" },
    { kind: "auto", tool: "CRM", text: "Deal moved to 'Won'" },
    { kind: "auto", tool: "Task", text: "Kick-off task created for the team" },
    { kind: "done", text: "No quote forgotten" },
  ],
  "Team notification": [
    { kind: "event", text: "Order marked urgent in the CRM" },
    { kind: "ai", text: "Urgent order · must ship today" },
    { kind: "auto", tool: "Task", text: "Dispatch task assigned to the warehouse" },
    { kind: "auto", tool: "Team", text: "Team alerted on WhatsApp" },
    { kind: "auto", tool: "Sheet", text: "Daily report updated" },
    { kind: "done", text: "Everyone knows. Nobody had to chase." },
  ],
  "Customer request": [
    { kind: "event", text: "WhatsApp message" },
    { kind: "you", text: "Hi, can I get a copy of my last invoice?" },
    { kind: "ai", text: "Document request · existing customer" },
    { kind: "auto", tool: "CRM", text: "Customer found · last invoice attached" },
    { kind: "bot", text: "Here's your latest invoice (PDF). Anything else I can help with?" },
    { kind: "done", text: "Handled without pulling in your team" },
  ],
};
const CHIPS = Object.keys(SCENARIOS);
const TOOL_ICON = { CRM: Database, Sheet, Task: ListChecks, Team: Users } as const;

// the four stages every run moves through, and which stage each kind of row belongs to
const STAGES = ["Input", "AI", "Automation", "Action"] as const;
const STAGE_OF: Record<Kind, number> = { event: 0, you: 0, ai: 1, auto: 2, bot: 3, done: 3 };

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

  const last = msgs[msgs.length - 1];
  const stage = finished ? STAGES.length : last ? STAGE_OF[last.kind] : -1;

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
              Pick a piece of everyday work and watch Flow HQ handle it: something comes in, AI works out what it is, the automation
              runs, and the work gets done.{" "}
              <span className="text-subtle">(Sample only — no real messages sent.)</span>
            </p>
          </Reveal>
        </div>

        <Reveal y={28}>
          <div className="glass mx-auto w-full max-w-[470px] overflow-hidden rounded-[28px]">
            <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-5 py-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-[15px] font-bold text-[#1a0a03]">F</span>
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
                        ? "border-accent bg-accent/15 text-text"
                        : "border-border text-text hover:border-accent/60 hover:text-accent disabled:opacity-45 disabled:hover:border-border disabled:hover:text-text"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* where the run is: input → AI → automation → action */}
            <ol aria-hidden className="flex items-center gap-1.5 border-b border-border bg-bg/40 px-4 py-2.5">
              {STAGES.map((st, i) => {
                const lit = stage >= i;
                return (
                  <li key={st} className={cn("flex items-center gap-1.5", i < STAGES.length - 1 && "flex-1")}>
                    <span
                      className={cn(
                        "label whitespace-nowrap text-[9.5px] transition-colors duration-300",
                        stage === i ? "text-accent-2" : lit ? "text-text/80" : "text-subtle/70"
                      )}
                    >
                      {st}
                    </span>
                    {i < STAGES.length - 1 && (
                      <span className="relative h-px flex-1 bg-border-bright">
                        <span
                          className="absolute inset-0 origin-left bg-accent transition-transform duration-500"
                          style={{ transform: `scaleX(${stage > i ? 1 : 0})` }}
                        />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>

            <div
              ref={box}
              role="log"
              aria-live="polite"
              aria-label="Sample conversation"
              className="no-scrollbar flex h-[420px] flex-col gap-2.5 overflow-y-auto overscroll-contain bg-bg/60 p-4"
            >
              {!scenario && (
                <p className="m-auto max-w-[26ch] text-center text-[14.5px] leading-[1.6] text-subtle">
                  Tap a task above to watch the system handle it.
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
    </Section>
  );
}
