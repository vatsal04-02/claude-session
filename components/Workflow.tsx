"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Reveal, Section } from "./ui";

const STAGES = [
  ["Capture", "Website, forms, WhatsApp and calls enter the system."],
  ["Understand", "AI reads the intent and context."],
  ["Manage", "The CRM keeps the customer and next action."],
  ["Automate", "Follow-ups and reminders run automatically."],
  ["Act", "The right person or system takes the next step."],
] as const;

function Stage({ i, active, onActive }: { i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const [name, line] = STAGES[i];
  // the stage that crosses the middle of the viewport becomes active
  const centred = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => {
    if (centred) onActive(i);
  }, [centred, i, onActive]);

  return (
    <li ref={ref} className="relative flex gap-6 py-6 md:gap-8 md:py-7">
      <span className="relative z-10 mt-2 grid h-[17px] w-[17px] shrink-0 place-items-center">
        {active && <span aria-hidden className="pulse-dot absolute h-3 w-3 rounded-full text-accent" />}
        <span
          className={cn(
            "relative h-3 w-3 rounded-full border-2 transition-all duration-500",
            active
              ? "border-accent bg-accent shadow-[0_0_0_6px_rgba(234,106,45,0.18),0_0_20px_rgba(234,106,45,0.7)]"
              : "border-border-bright bg-bg"
          )}
        />
      </span>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn("flex-1 transition-opacity duration-500", active ? "opacity-100" : "opacity-50")}
      >
        <div className="flex items-baseline gap-3">
          <span className={cn("label transition-colors", active ? "text-accent" : "text-subtle")}>0{i + 1}</span>
          <h3 className="item-title text-[24px]">{name}</h3>
        </div>
        <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.7] text-muted">{line}</p>
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
    <Section id="workflow" space="lg" className="border-t border-border bg-bg-soft">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* left: sticky */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="label inline-flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent/70" /> Workflow
            </span>
          </Reveal>
          <Reveal delay={0.07}>
            <h2 className="display mt-4 text-[clamp(2.25rem,4.6vw,3.75rem)]">How the work flows.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-[26rem] text-[16px] leading-[1.75] text-muted md:text-[17px]">
              Every system we build follows the same five steps.
            </p>
          </Reveal>
        </div>

        {/* right: timeline */}
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
