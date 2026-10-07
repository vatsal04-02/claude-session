"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { Check, Clock, Globe, MessageCircle, PhoneMissed, UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Ambient } from "./ui";

/* "How it works" as a scroll-driven engine.
   md+: the section pins; scroll moves progress through five nodes and swaps the step panel.
   phones: a vertical journey (no pinning) with a progress line that fills as you scroll.
   One markup for both — CSS decides layout, JS only sets which step is active. */

const STEPS = [
  { name: "Capture", tag: "Input", line: "Every enquiry — website, WhatsApp, even missed calls — caught automatically.", result: "Lead created" },
  { name: "Understand", tag: "AI", line: "AI reads what the customer actually wants, and how urgent it is.", result: "Need understood" },
  { name: "Manage", tag: "Record", line: "One record with the customer, the owner and the next step.", result: "Owner assigned" },
  { name: "Automate", tag: "Follow-up", line: "Replies, reminders and nudges go out on time — without anyone remembering.", result: "Follow-ups scheduled" },
  { name: "Convert", tag: "Outcome", line: "The slot gets booked. The enquiry becomes a customer.", result: "Customer booked" },
] as const;

const chip = "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px]";

/* one small, concrete visual per step — what the system is doing right now */
function StepVisual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-2">
          <span className={cn(chip, "border-border-bright text-muted")}><Globe className="h-3.5 w-3.5" /> Website form</span>
          <span className={cn(chip, "border-border-bright text-muted")}><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</span>
          <span className={cn(chip, "border-border-bright text-muted")}><PhoneMissed className="h-3.5 w-3.5" /> Missed call</span>
        </div>
        <span aria-hidden className="h-6 w-px bg-gradient-to-b from-accent/70 to-accent/10" />
        <div className="glass w-full max-w-[300px] rounded-xl px-4 py-3">
          <div className="label text-[10px] text-accent-2">New lead</div>
          <div className="mt-1 text-[14px] text-text">Enquiry from WhatsApp · 9:42 PM</div>
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className="w-full max-w-[340px]">
        <div className="rounded-2xl rounded-bl-md border border-border bg-surface-2 px-4 py-3 text-[14px] text-text">
          Hi, can I come in tomorrow evening? It&apos;s a bit urgent.
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={cn(chip, "border-accent/50 bg-accent/10 text-accent-2")}>Wants: a booking</span>
          <span className={cn(chip, "border-accent/50 bg-accent/10 text-accent-2")}>When: tomorrow evening</span>
          <span className={cn(chip, "border-accent/50 bg-accent/10 text-accent-2")}>Urgency: high</span>
        </div>
      </div>
    );
  if (i === 2)
    return (
      <div className="glass w-full max-w-[320px] rounded-xl p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent"><UserRound className="h-4 w-4" /></span>
          <div>
            <div className="text-[14px] font-medium text-text">New customer</div>
            <div className="text-[12px] text-subtle">via WhatsApp</div>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13px]">
          <dt className="label text-[10px] text-subtle">Owner</dt><dd className="text-text">Front desk</dd>
          <dt className="label text-[10px] text-subtle">Status</dt><dd className="text-text">Replied</dd>
          <dt className="label text-[10px] text-subtle">Next</dt><dd className="text-accent-2">Confirm a slot</dd>
        </dl>
      </div>
    );
  if (i === 3)
    return (
      <ol className="w-full max-w-[320px] space-y-2.5">
        {[
          ["Now", "Instant reply sent", true],
          ["In 2 hours", "Slot options sent", true],
          ["Tomorrow, 9 AM", "Reminder", false],
        ].map(([when, what, done]) => (
          <li key={what as string} className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-2.5">
            <span className="text-[13.5px] text-text">{what}</span>
            <span className={cn("label flex items-center gap-1.5 text-[10px]", done ? "text-accent-2" : "text-subtle")}>
              {done ? <Check className="h-3 w-3" strokeWidth={3} /> : <Clock className="h-3 w-3" />} {when}
            </span>
          </li>
        ))}
      </ol>
    );
  return (
    <div className="glass w-full max-w-[300px] rounded-xl p-5 text-center">
      <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-accent text-[#1a0a03] shadow-[0_0_30px_-4px_rgba(234,106,47,0.8)]">
        <Check className="h-5 w-5" strokeWidth={3} />
      </span>
      <div className="mt-3 text-[16px] font-semibold text-text">Booked · Tomorrow, 6:30 PM</div>
      <div className="mt-1 text-[13px] text-muted">Confirmation and reminder sent</div>
    </div>
  );
}

export default function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length * 0.999))));
  // step i activates at progress i/5, so the line reaches node 5 (its end) at 0.8
  const fill = useTransform(progress, [0, 0.8], [0, 1]);
  const head = useTransform(fill, (f) => `${f * 100}%`);

  return (
    <section id="workflow" className="section-edge relative overflow-x-clip bg-[#130c08]">
      <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.3 } as React.CSSProperties} />
      <Ambient className="-right-40 top-[10%] hidden h-[520px] w-[520px] md:block" />

      {/* scroll distance for the pinned engine (md+) */}
      <div ref={ref} className="relative md:h-[420vh]">
        <div className="px-5 py-20 md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:px-8 md:py-0">
          <div className="relative mx-auto w-full max-w-[1140px]">
            {/* heading + status */}
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="label inline-flex items-center gap-2.5 text-accent">
                  <span className="h-px w-6 bg-accent/70" /> How it works
                </span>
                <h2 className="display mt-4 max-w-[16ch] text-balance text-[clamp(2.2rem,4.2vw,3.4rem)] text-text">
                  From enquiry to customer in five steps.
                </h2>
              </div>
              <div className="label hidden items-center gap-3 rounded-full border border-border px-4 py-2 text-[10.5px] text-subtle md:flex">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inset-0 rounded-full text-accent" />
                  <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>
                Running · Step <span className="tabular-nums text-accent-2">0{active + 1}</span> / 05
              </div>
            </div>

            {/* engine rail (md+) */}
            <div aria-hidden className="relative mt-12 hidden md:block">
              <div className="absolute left-[10%] right-[10%] top-[15px] h-px bg-border-bright" />
              <div className="absolute left-[10%] right-[10%] top-[15px] h-px">
                <motion.div className="h-full origin-left bg-gradient-to-r from-accent/70 to-accent" style={{ scaleX: fill }} />
                <motion.div className="absolute inset-y-0 left-0 w-full" style={{ x: head }}>
                  <span className="absolute -left-1 -top-[3.5px] h-2 w-2 rounded-full bg-accent-2 shadow-[0_0_14px_3px_rgba(241,122,59,0.75)]" />
                </motion.div>
              </div>
              <ol className="relative grid grid-cols-5">
                {STEPS.map((s, i) => {
                  const state = i < active ? "done" : i === active ? "active" : "next";
                  return (
                    <li key={s.name} className="flex flex-col items-center text-center">
                      <span
                        className={cn(
                          "grid h-[31px] w-[31px] place-items-center rounded-full border text-[11px] font-semibold tabular-nums transition-[background-color,border-color,color,box-shadow,transform] duration-500",
                          state === "done" && "border-accent/70 bg-accent/20 text-accent-2",
                          state === "active" && "scale-110 border-accent bg-accent text-[#1a0a03] shadow-[0_0_0_6px_rgba(234,106,47,0.14),0_0_26px_rgba(234,106,47,0.6)]",
                          state === "next" && "border-border-bright bg-bg text-subtle"
                        )}
                      >
                        {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : `0${i + 1}`}
                      </span>
                      <span className={cn("mt-3 text-[15px] font-semibold transition-colors duration-500", state === "next" ? "text-subtle" : "text-text")}>{s.name}</span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* step panels: stacked + swapped on md+, a vertical journey on phones */}
            <ol className="relative mt-10 grid md:mt-12">
              {/* phones: progress line beside the journey */}
              <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px bg-border md:hidden">
                <motion.span className="block h-full origin-top bg-accent" style={{ scaleY: fill }} />
              </span>
              {STEPS.map((s, i) => (
                <li
                  key={s.name}
                  data-active={active === i}
                  className="wf-panel relative pb-12 pl-12 last:pb-0 md:[grid-area:1/1] md:pb-0 md:pl-0"
                >
                  <span aria-hidden className="absolute left-0 top-0 grid h-[31px] w-[31px] place-items-center rounded-full border border-accent/60 bg-bg text-[11px] font-semibold text-accent-2 md:hidden">
                    0{i + 1}
                  </span>
                  <div className="glass grid items-center gap-8 rounded-[24px] p-6 md:grid-cols-[1fr_1fr] md:gap-12 md:p-10">
                    <div>
                      <div className="label text-[10.5px] text-accent-2">
                        Step 0{i + 1} · {s.tag}
                      </div>
                      <h3 className="display mt-3 text-[clamp(1.9rem,3.2vw,2.75rem)] text-text">{s.name}</h3>
                      <p className="mt-3 max-w-[40ch] text-[16.5px] leading-[1.65] text-muted">{s.line}</p>
                      <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[13px] font-medium text-accent-2">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} /> {s.result}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <StepVisual i={i} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
