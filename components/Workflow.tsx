"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Reveal, Section, Tag } from "./ui";

const STAGES = [
  {
    name: "Capture",
    line: "Website, WhatsApp, forms or other enquiries enter the system.",
    chips: ["Website", "WhatsApp", "Forms", "Calls"],
  },
  {
    name: "Understand",
    line: "AI extracts intent, context and useful information.",
    chips: ["Intent", "Context", "Priority"],
  },
  {
    name: "Manage",
    line: "Customer information enters the CRM and gets an owner and a next action.",
    chips: ["CRM", "Owner", "Next action"],
  },
  {
    name: "Automate",
    line: "Follow-ups, tasks, notifications, reminders and other actions run automatically.",
    chips: ["Follow-ups", "Tasks", "Reminders", "Notifications"],
  },
  {
    name: "Act",
    line: "The right person, tool or workflow takes the next step.",
    chips: ["Person", "Tool", "Workflow"],
  },
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
    <li ref={ref} className="relative flex gap-5 py-4 md:gap-7 md:py-[18px]">
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
        className={cn("flex-1 transition-opacity duration-500", active ? "opacity-100" : "opacity-55")}
      >
        <div className="flex items-baseline gap-3">
          <span className={cn("label transition-colors", active ? "text-accent" : "text-subtle")}>0{i + 1}</span>
          <h3 className="display text-[30px] md:text-[36px]">{s.name}</h3>
        </div>
        <p className="mt-2 max-w-[58ch] text-[15.5px] leading-snug text-muted">{s.line}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
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
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        {/* left: sticky */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="label inline-flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent/70" /> Workflow
            </span>
          </Reveal>
          <Reveal delay={0.07}>
            <h2 className="display mt-4 text-[clamp(2.4rem,4.8vw,3.9rem)]">
              How the work <em>flows.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted md:text-[17px]">
              Every system we build follows the same five steps, from the first enquiry to the next action.
            </p>
          </Reveal>

          <div className="mt-7 hidden items-center gap-4 rounded-xl border border-border bg-surface/70 px-5 py-4 lg:flex">
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
          <div aria-hidden className="absolute bottom-8 left-[8px] top-8 w-px bg-border">
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
