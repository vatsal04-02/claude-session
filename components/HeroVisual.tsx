"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HERO_SCREENSHOT } from "@/lib/content";
import { cn } from "@/lib/cn";
import { CHANNELS, chan, EVENTS, OUTPUTS, type Status } from "./channels";
import { useOnScreen } from "./ui";

/* The hero visual: a CRM lead pipeline inside a browser frame, with the live "unified inbox" feed floating over its corner.
   One loop drives both: a sample enquiry arrives on a channel → instant reply → appointment booked → CRM updated → team notified,
   and the newest CRM row follows along. Sample data only (labelled). Static for reduced motion; pauses off-screen.
   Swap the mockup for a real screenshot with HERO_SCREENSHOT in lib/content.ts. */

const AGO = ["just now", "2 min ago", "9 min ago", "14 min ago", "31 min ago", "1 h ago"] as const;
const CHIP: Record<Status, string> = {
  New: "border-white/15 bg-white/[0.06] text-text",
  Replied: "border-accent/40 bg-accent/10 text-accent-2",
  Booked: "border-success/30 bg-success/10 text-success",
  "Follow-up due": "border-warning/30 bg-warning/10 text-warning",
};
const N = EVENTS.length;

function useInboxLoop() {
  const reduce = useReducedMotion();
  const [ref, onScreen] = useOnScreen<HTMLDivElement>();
  const [ev, setEv] = useState(0);
  const [step, setStep] = useState(4); // 0 = just arrived … 4 = everything done (the static, server-rendered state)
  const evRef = useRef(0);
  useEffect(() => {
    if (reduce || !onScreen) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, ms: number) => timers.push(setTimeout(() => alive && fn(), ms));
    const run = () => {
      const next = (evRef.current + 1) % N;
      evRef.current = next;
      setEv(next);
      setStep(0);
      [1, 2, 3, 4].forEach((s, i) => at(() => setStep(s), 750 + i * 650));
      at(run, 750 + 3 * 650 + 2900);
    };
    at(run, 2200);
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      setStep(4);
    };
  }, [reduce, onScreen]);
  return { ref, ev, step, reduce };
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#1c1611]">
      <div className="flex h-9 items-center gap-3 border-b border-white/[0.08] bg-white/[0.02] px-3.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto rounded-md bg-white/[0.05] px-12 py-1 text-[11px] text-subtle">Leads · Pipeline</span>
        <span className="w-[42px]" aria-hidden />
      </div>
      {children}
    </div>
  );
}

function CrmMockup({ ev, step, reduce }: { ev: number; step: number; reduce: boolean | null }) {
  const rows = [0, 1, 2, 3, 4, 5].map((k) => ({ k, e: EVENTS[(ev - k + N) % N] }));
  const statusOf = (k: number, end: Status): Status => (k > 0 ? end : step === 0 ? "New" : step === 1 ? "Replied" : "Booked");
  return (
    <div className="text-[13px]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-semibold text-text">Leads</span>
          <span className="hidden gap-1 sm:flex">
            {["All", "New", "Replied", "Booked"].map((t, i) => (
              <span key={t} className={cn("rounded-md px-2 py-1 text-[12px]", i === 0 ? "bg-white/[0.07] text-text" : "text-subtle")}>
                {t}
              </span>
            ))}
          </span>
        </div>
        <span className="label text-[10px] text-subtle">Sample data</span>
      </div>
      <div className="hidden grid-cols-[1.5fr_1fr_1fr_1.1fr] gap-3 border-b border-white/[0.08] px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-subtle md:grid">
        <span>Lead</span>
        <span>Source</span>
        <span>Status</span>
        <span>Last AI follow-up</span>
      </div>
      <ul className="relative h-[336px] overflow-hidden md:h-[324px]">
        <AnimatePresence initial={false}>
          {rows.map(({ k, e }) => {
            const c = chan(e.channel);
            const st = statusOf(k, e.end);
            const when = k === 0 ? (step === 0 ? "—" : "just now") : AGO[k];
            return (
              <motion.li
                key={e.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0, backgroundColor: k === 0 && step === 0 ? "rgba(234,106,47,0.10)" : "rgba(234,106,47,0)" }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid h-14 grid-cols-[1fr_auto] items-center gap-3 border-b border-white/[0.06] px-4 md:grid-cols-[1.5fr_1fr_1fr_1.1fr]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.07] text-[11px] font-medium text-muted">{e.who.slice(0, 1)}</span>
                  <div className="min-w-0">
                    <div className="truncate text-[13.5px] font-medium text-text">{e.who}</div>
                    <div className="truncate text-[11.5px] text-subtle md:hidden">
                      {c.name} · {when}
                    </div>
                    <div className="hidden truncate text-[11.5px] text-subtle md:block">{e.text}</div>
                  </div>
                </div>
                <span className="hidden items-center gap-2 text-muted md:flex">
                  <c.Icon className="h-4 w-4" /> {c.name}
                </span>
                <span className={cn("w-fit rounded-full border px-2.5 py-1 text-[11.5px] leading-none transition-colors duration-300", CHIP[st])}>{st}</span>
                <span className="hidden text-muted md:block">{when}</span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function FloatingFeed({ ev, step, className }: { ev: number; step: number; className?: string }) {
  const cur = EVENTS[ev];
  return (
    <div className={cn("flex flex-col rounded-[16px] border border-white/[0.1] bg-[#221b15] p-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-text">Unified inbox</span>
        <span className="label flex items-center gap-1.5 text-[9.5px] text-subtle">
          <span className="feed-dot" /> Sample
        </span>
      </div>
      <ul className="mt-3 grid grid-cols-5 gap-1">
        {CHANNELS.map(({ id, label, Icon }) => {
          const on = id === cur.channel;
          return (
            <li key={id} className={cn("flex flex-col items-center gap-1.5 rounded-[10px] border py-2 text-[9.5px] transition-colors duration-300 lg:py-3", on ? "border-signal bg-signal/15 text-text" : "border-white/[0.08] text-subtle")}>
              <Icon className={cn("h-4 w-4 lg:h-5 lg:w-5", on && "text-signal")} />
              {label}
            </li>
          );
        })}
      </ul>
      <div className="mt-3 rounded-[12px] rounded-tl-sm border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
        <div className="flex items-center justify-between text-[10.5px] text-subtle">
          <span>
            {cur.who} · {chan(cur.channel).name}
          </span>
          <span className="font-mono">{cur.time}</span>
        </div>
        <p className="mt-1 truncate text-[12.5px] text-text">{cur.text}</p>
      </div>
      {/* the automatic reply, once the first step has run */}
      <div
        className={cn(
          "ml-6 mt-2 rounded-[12px] rounded-tr-sm bg-signal px-3 py-2.5 text-ink transition-[opacity,transform] duration-300",
          step > 0 ? "opacity-100" : "translate-y-1 opacity-0"
        )}
      >
        <div className="flex items-center justify-between text-[10.5px] font-medium opacity-75">
          <span>Flow HQ · auto-reply</span>
          <span>sent</span>
        </div>
        <p className="mt-1 text-[12.5px] leading-snug">Thanks for reaching out! Here are the details — want me to book you a slot?</p>
      </div>
      <ul className="mt-3 space-y-1.5 lg:mt-auto lg:pt-4">
        {OUTPUTS.map((o, i) => {
          const done = step > i;
          return (
            <li key={o} className="flex items-center gap-2.5 text-[12.5px]">
              <span className={cn("grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-300", done ? "border-signal bg-signal text-ink" : "border-white/15 text-transparent")}>
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              </span>
              <span className={cn("transition-colors duration-300", done ? "text-text" : "text-subtle")}>{o}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function HeroVisual() {
  const { ref, ev, step, reduce } = useInboxLoop();
  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustration: a lead pipeline showing enquiries from website forms, WhatsApp, Instagram, calls and email, each replied to, booked and logged automatically by Flow HQ."
      className="relative w-full"
    >
      <div aria-hidden className="grid gap-3 lg:grid-cols-[1fr_300px] lg:gap-5">
        <BrowserFrame>
          {HERO_SCREENSHOT.src ? (
            <img src={HERO_SCREENSHOT.src} alt="" width={1280} height={800} decoding="async" className="block w-full" />
          ) : (
            <CrmMockup ev={ev} step={step} reduce={reduce} />
          )}
        </BrowserFrame>
        <FloatingFeed ev={ev} step={step} className="lg:self-stretch" />
      </div>
    </div>
  );
}
