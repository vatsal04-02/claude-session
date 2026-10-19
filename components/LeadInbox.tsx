"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, FileText, Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import LogoMark from "./LogoMark";
import { useOnScreen } from "./ui";

/* The hero visual: a unified inbox. Five channels feed one Flow HQ node, which replies, books, updates the CRM and
   notifies the team. A few sample events cycle (≈6s each). Illustrative only — it says so on the card, and it carries
   no customer names or numbers. Static for reduced motion; the loop pauses while off-screen. */

type Icon = (p: { className?: string }) => React.JSX.Element;
const Whatsapp: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.43 15.1L2 22l5.06-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .95.98-2.93-.2-.31a8.2 8.2 0 1 1 6.72 3.62Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.54.12.16 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.57.2-1.07.14-1.17-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);
const Instagram: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

const CHANNELS = [
  { id: "form", label: "Form", name: "Web form", Icon: FileText },
  { id: "whatsapp", label: "WhatsApp", name: "WhatsApp", Icon: Whatsapp },
  { id: "instagram", label: "Instagram", name: "Instagram DM", Icon: Instagram },
  { id: "call", label: "Call", name: "Missed call", Icon: Phone },
  { id: "email", label: "Email", name: "Email", Icon: Mail },
] as const;
type ChannelId = (typeof CHANNELS)[number]["id"];

const EVENTS: { id: number; time: string; channel: ChannelId; text: string }[] = [
  { id: 1, time: "10:42", channel: "form", text: "Consultation request" },
  { id: 2, time: "10:47", channel: "whatsapp", text: "“What are your timings?”" },
  { id: 3, time: "11:05", channel: "instagram", text: "“Is the weekend batch open?”" },
  { id: 4, time: "11:12", channel: "call", text: "Text-back sent" },
  { id: 5, time: "11:20", channel: "email", text: "Quote request" },
];

const OUTPUTS = [
  { label: "Instant reply sent", at: "3s" },
  { label: "Appointment booked", at: "8s" },
  { label: "CRM updated", at: "9s" },
  { label: "Team notified", at: "11s" },
] as const;

const chan = (id: ChannelId) => CHANNELS.find((c) => c.id === id)!;

export default function LeadInbox() {
  const reduce = useReducedMotion();
  const [ref, onScreen] = useOnScreen<HTMLDivElement>();
  const [ev, setEv] = useState(0);
  const [step, setStep] = useState(4); // 0 = just arrived … 4 = everything done (the server-rendered, static state)
  const evRef = useRef(0);

  useEffect(() => {
    if (reduce || !onScreen) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, ms: number) => timers.push(setTimeout(() => alive && fn(), ms));
    const run = () => {
      const next = (evRef.current + 1) % EVENTS.length;
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

  const current = EVENTS[ev];
  const feed = [0, 1, 2].map((k) => EVENTS[(ev - k + EVENTS.length) % EVENTS.length]);
  const hubOn = step >= 1;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustration: enquiries from website forms, WhatsApp, Instagram, calls and email flow into Flow HQ, which replies instantly, books the appointment, updates the CRM and notifies the team."
      className="relative w-full max-w-[480px] justify-self-center lg:justify-self-end"
    >
      <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10" style={{ background: "radial-gradient(closest-side, rgba(234,106,47,0.07), transparent)" }} />
      <div aria-hidden className="rounded-2xl border border-border bg-surface/80 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-text">Unified inbox</span>
          <span className="label flex items-center gap-2 text-[10px] text-subtle">
            <span className="feed-dot" /> Sample activity
          </span>
        </div>

        {/* 1 · channels */}
        <ul className="mt-4 grid grid-cols-5 gap-1.5">
          {CHANNELS.map(({ id, label, Icon }) => {
            const on = id === current.channel;
            return (
              <li
                key={id}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2.5 text-[10px] transition-colors duration-300",
                  on ? "border-accent/60 bg-accent/10 text-text" : "border-border text-muted"
                )}
              >
                <Icon className={cn("h-[18px] w-[18px] transition-colors duration-300", on && "text-accent-2")} />
                {label}
              </li>
            );
          })}
        </ul>

        {/* 2 · into Flow HQ */}
        <div className="relative mx-auto h-7 w-px bg-border-bright">
          {!reduce && (
            <motion.span
              key={ev}
              className="absolute -left-[2px] top-0 h-[5px] w-[5px] rounded-full bg-accent"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeIn" }}
            />
          )}
        </div>
        <div
          className={cn(
            "mx-auto flex w-fit items-center gap-2.5 rounded-full border px-4 py-2 transition-colors duration-500",
            hubOn ? "border-accent/40 bg-accent/[0.06]" : "border-border-bright bg-bg/40"
          )}
        >
          <LogoMark className="h-5 w-auto" gradientId="inbox-mark" />
          <span className="text-[14px] font-semibold text-text">Flow HQ</span>
        </div>
        <div className="mx-auto h-4 w-px bg-border-bright" />

        {/* 3 · what it does */}
        <ul className="space-y-0.5">
          {OUTPUTS.map((o, i) => {
            const done = step > i;
            return (
              <li key={o.label} className="flex items-center gap-3 rounded-lg px-1 py-1.5 text-[13.5px]">
                <span
                  className={cn(
                    "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                    done ? "border-accent bg-accent text-[#1a0a03]" : "border-border-bright text-transparent"
                  )}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className={cn("transition-colors duration-300", done ? "text-text" : "text-subtle")}>{o.label}</span>
                <span className="ml-auto font-mono text-[11px] tabular-nums text-subtle">+{o.at}</span>
              </li>
            );
          })}
        </ul>

        {/* latest events */}
        <div className="mt-4 border-t border-border pt-3">
          <div className="label text-[10px] text-subtle">Latest</div>
          <ul className="relative mt-1 h-[120px] overflow-hidden">
            <AnimatePresence initial={false}>
              {feed.map((e, k) => {
                const c = chan(e.channel);
                return (
                  <motion.li
                    key={e.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: -10 }}
                    animate={{ opacity: k === 0 ? 1 : k === 1 ? 0.7 : 0.45, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex h-10 items-center gap-3 text-[13px] text-muted"
                  >
                    <span className="w-10 shrink-0 font-mono text-[11.5px] tabular-nums text-subtle">{e.time}</span>
                    <c.Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">
                      {c.name} · {e.text}
                    </span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}
