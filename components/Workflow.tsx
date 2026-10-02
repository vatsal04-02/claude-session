"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, FlowChain, Reveal, Section, Tag } from "./ui";

/* kicker = how the system sees the step; result = what exists once the step has run */
const STAGES = [
  {
    name: "Capture",
    kicker: "Input",
    line: "Every enquiry enters one connected system.",
    tags: ["Website", "WhatsApp", "Forms", "Calls"],
    flow: ["Enquiry", "Lead created"],
    result: "Lead created",
  },
  {
    name: "Understand",
    kicker: "Understand",
    line: "AI reads intent, context and useful details before the next action.",
    tags: ["Intent", "Context", "Priority"],
    flow: ["Message", "AI", "Context"],
    result: "Intent understood",
  },
  {
    name: "Manage",
    kicker: "Record",
    line: "The CRM keeps the customer, owner, stage and next action together.",
    tags: ["CRM", "Owner", "Timeline"],
    flow: ["Lead", "Record", "Next action"],
    result: "Owner assigned",
  },
  {
    name: "Automate",
    kicker: "Automate",
    line: "Follow-ups, reminders, tasks and notifications move forward automatically.",
    tags: ["Follow-up", "Tasks", "Reminders"],
    flow: ["Trigger", "Rule", "Action"],
    result: "Follow-up created",
  },
  {
    name: "Act",
    kicker: "Action",
    line: "The right person, tool or workflow takes the next step.",
    tags: ["Person", "Tool", "Workflow"],
    flow: ["Decision", "Action", "Outcome"],
    result: "Next action completed",
  },
] as const;

function Stage({ i, active, onActive, last }: { i: number; active: number; onActive: (i: number) => void; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const s = STAGES[i];
  const isActive = active === i;
  const done = active > i;
  // the stage that crosses the middle of the viewport becomes active
  const centred = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => {
    if (centred) onActive(i);
  }, [centred, i, onActive]);

  return (
    <li ref={ref} className="relative flex gap-6 py-5 md:gap-8">
      {/* line segment down to the next node: muted brown, soft orange once completed */}
      {!last && (
        <span aria-hidden className="absolute -bottom-[37px] left-[8px] top-[37px] w-px bg-border">
          <span
            className={cn(
              "absolute inset-0 origin-top bg-accent/70 transition-transform duration-700 ease-out",
              done ? "scale-y-100" : "scale-y-0"
            )}
          />
        </span>
      )}
      <span className="relative z-10 mt-2 grid h-[17px] w-[17px] shrink-0 place-items-center">
        {isActive && <span aria-hidden className="pulse-dot absolute h-3 w-3 rounded-full text-accent" />}
        <span
          className={cn(
            "relative h-3 w-3 rounded-full border-2 transition-all duration-500",
            isActive
              ? "border-accent bg-accent shadow-[0_0_0_6px_rgba(234,106,47,0.18),0_0_20px_rgba(234,106,47,0.7)]"
              : done
              ? "border-accent/60 bg-accent/50"
              : "border-border-bright bg-bg"
          )}
        />
      </span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn("min-w-0 flex-1 transition-opacity duration-500", isActive ? "opacity-100" : "opacity-55")}
      >
        <div className="flex items-baseline gap-3">
          <span className={cn("label transition-colors duration-500", isActive ? "text-accent" : "text-subtle")}>0{i + 1}</span>
          <h3
            className={cn(
              "item-title text-[26px] font-bold transition-[color,text-shadow] duration-500",
              isActive ? "[text-shadow:0_0_26px_rgba(234,106,47,0.28)]" : "text-muted"
            )}
          >
            {s.name}
          </h3>
          <span className="label ml-auto text-subtle">{s.kicker}</span>
        </div>
        <p className="mt-1.5 max-w-[60ch] text-[16px] leading-[1.6] text-muted">{s.line}</p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-1.5">
            {s.tags.map((t) => (
              <li key={t}>
                <Tag tone={isActive ? "accent" : "muted"}>{t}</Tag>
              </li>
            ))}
          </ul>
          <FlowChain steps={s.flow} />
        </div>

        {/* result state: fully shown on the active step, dimmed once done, hidden until reached */}
        <div
          className={cn(
            "mt-2 flex h-5 items-center gap-2 text-[13px] text-accent-2 transition-opacity duration-500",
            isActive ? "opacity-100" : done ? "opacity-50" : "opacity-0"
          )}
        >
          <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> {s.result}
        </div>
      </motion.div>
    </li>
  );
}

export default function Workflow() {
  const [active, setActive] = useState(0);
  const cur = STAGES[active];

  return (
    <Section
      id="workflow"
      space="lg"
      grid="strong"
      className="bg-[#140d09] [background-image:radial-gradient(circle_at_50%_40%,rgba(234,106,47,0.045),transparent_45%)]"
    >
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* left: sticky heading + live "now" panel */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="label inline-flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent/70" /> Workflow
            </span>
          </Reveal>
          <Reveal delay={0.07}>
            <h2 className="display mt-4 text-[clamp(2.25rem,4.4vw,3.5rem)]">
              How the work
              <br />
              flows.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-[30rem] text-[16px] leading-[1.75] text-muted md:text-[17px]">
              Every system we build follows a simple path — capture the work, understand the context, organize it,
              automate the repetitive steps, and move the right action forward.
            </p>
          </Reveal>

          <div className="mt-8 hidden rounded-xl border border-accent/40 bg-accent/[0.06] p-5 lg:block">
            <div className="label flex items-center justify-between">
              <span className="text-subtle">Now</span>
              <span className="text-accent">
                0{active + 1} / 0{STAGES.length}
              </span>
            </div>
            <div className="relative mt-3 min-h-[92px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <div className="item-title text-[24px] font-bold">{cur.name}</div>
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-muted">{cur.line}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* right: the five-step system */}
        <ol className="relative">
          {STAGES.map((_, i) => (
            <Stage key={i} i={i} active={active} onActive={setActive} last={i === STAGES.length - 1} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
