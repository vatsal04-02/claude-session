"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Reveal, Section, Tag } from "./ui";

const STAGES = [
  { name: "Trigger", line: "Something happens.", chips: ["Form submit", "Missed call", "WhatsApp message"] },
  { name: "Ingest", line: "Context gets gathered.", chips: ["Contact lookup", "Past history", "Lead source"] },
  { name: "Reason", line: "AI understands the request.", chips: ["Intent", "Urgency", "Summary"] },
  { name: "Route", line: "Rules decide what happens.", chips: ["Owner", "Priority", "Guardrails"] },
  { name: "Act", line: "The system executes.", chips: ["CRM update", "WhatsApp reply", "Booking", "Task"] },
];

function Stage({
  i,
  active,
  onActive,
}: {
  i: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const s = STAGES[i];
  // the stage that crosses the middle of the viewport becomes active
  const centred = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => {
    if (centred) onActive(i);
  }, [centred, i, onActive]);

  return (
    <li ref={ref} className="relative flex gap-5 py-7 md:gap-8 md:py-9">
      <span className="relative z-10 mt-2 grid h-[17px] w-[17px] shrink-0 place-items-center">
        <span
          className={cn(
            "h-3 w-3 rounded-full border-2 transition-all duration-500",
            active
              ? "border-accent bg-accent shadow-[0_0_0_6px_rgba(233,104,45,0.18),0_0_20px_rgba(233,104,45,0.7)]"
              : "border-border-bright bg-bg"
          )}
        />
      </span>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn("flex-1 transition-opacity duration-500", active ? "opacity-100" : "opacity-55")}
      >
        <div className="flex items-baseline gap-3">
          <span className={cn("label transition-colors", active ? "text-accent" : "text-subtle")}>0{i + 1}</span>
          <h3 className="display text-4xl md:text-5xl">{s.name}</h3>
        </div>
        <p className="mt-2 text-lg text-muted">{s.line}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {s.chips.map((c) => (
            <Tag key={c} tone={active ? "accent" : "muted"}>
              {c}
            </Tag>
          ))}
        </div>
      </motion.div>
    </li>
  );
}

export default function Workflow() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <Section id="workflow" className="border-t border-border">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* left: sticky */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="label inline-flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent/70" /> Workflow
            </span>
          </Reveal>
          <Reveal delay={0.07}>
            <h2 className="display mt-4 text-[clamp(2.6rem,5.4vw,4.4rem)]">
              From signal to <em>finished work.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted md:text-lg">
              Every system we build follows the same five steps.
            </p>
          </Reveal>

          <div className="mt-8 hidden items-center gap-4 rounded-xl border border-border bg-surface/70 px-5 py-4 lg:flex">
            <span className="label text-subtle">Now</span>
            <div className="relative h-8 flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute inset-0 font-serif text-[26px] leading-8"
                >
                  {STAGES[active].name}
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="label text-accent">
              0{active + 1} / 0{STAGES.length}
            </span>
          </div>
        </div>

        {/* right: stages + timeline */}
        <ol ref={listRef} className="relative">
          <div aria-hidden className="absolute bottom-10 left-[8px] top-10 w-px bg-border">
            <motion.div style={{ scaleY: reduce ? 1 : line }} className="absolute inset-0 origin-top bg-accent" />
          </div>
          {STAGES.map((_, i) => (
            <Stage key={i} i={i} active={i === active} onActive={setActive} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
