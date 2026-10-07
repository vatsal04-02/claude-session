"use client";

import { Hourglass, Keyboard, ListX, Puzzle, RotateCw, Unplug } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { PREFILL_EVENT } from "./AuditForm";
import { Section, SectionHeading, Stagger, StaggerItem } from "./ui";

/* Front = the problem, back = the system that fixes it. Every back links to the audit and pre-fills its Message field. */
const PROBLEMS = [
  {
    title: "Manual data entry",
    line: "Copying the same details from one place to another.",
    fix: "Data automation",
    fixLine: "Forms, emails and documents read by AI and entered into the right system — nobody types it twice.",
  },
  {
    title: "Tools that don't talk",
    line: "WhatsApp, email, sheets and CRM, all separate.",
    fix: "Connected systems",
    fixLine: "Your tools share information automatically. Update it once, and it's updated everywhere.",
  },
  {
    title: "Things slipping through",
    line: "Follow-ups, tasks and reminders forgotten.",
    fix: "Automated follow-through",
    fixLine: "Follow-ups, reminders and tasks fire on time, every time — nobody has to remember.",
  },
  {
    title: "Slow replies",
    line: "Customers waiting hours for an answer.",
    fix: "AI customer communication",
    fixLine: "AI answers the common questions instantly and hands the rest to your team with the full context.",
  },
  {
    title: "Your specific process",
    line: "Something else eating your team's hours?",
    fix: "Custom automation",
    fixLine: "Tell us what your team does manually. We'll map exactly what can be automated.",
    open: true,
  },
] as const;

const ICONS = [Keyboard, Unplug, ListX, Hourglass, Puzzle];

/* Flips on hover (mouse) or keyboard focus via CSS; on touch, a tap toggles it. */
function FlipCard({ p, i }: { p: (typeof PROBLEMS)[number]; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const pointer = useRef("mouse");
  const open = "open" in p;
  const Icon = ICONS[i];

  const onCardClick = (e: React.MouseEvent) => {
    if (pointer.current === "mouse" || (e.target as HTMLElement).closest("a")) return;
    setFlipped((f) => !f);
  };
  const onLinkClick = () => {
    const message = open ? "I want to automate: " : `I want to automate: ${p.title}.`;
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { message, focus: open } }));
  };

  return (
    <div
      className="flip h-full cursor-pointer"
      data-flipped={flipped}
      onPointerDown={(e) => (pointer.current = e.pointerType)}
      onClick={onCardClick}
    >
      <div className="flip-inner grid h-full">
        {/* front: the problem */}
        <div className="flip-face pc-front relative flex flex-col overflow-hidden rounded-2xl border border-border p-6">
          <div className="flex items-start justify-between">
            <span className="pc-icon grid h-11 w-11 place-items-center rounded-xl border border-border-bright bg-bg/50 text-muted">
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <span className="label text-[10.5px] text-subtle">0{i + 1}</span>
          </div>
          <h3 className="item-title mt-6">{p.title}</h3>
          <p className="mt-2 text-[15px] leading-[1.7] text-muted">{p.line}</p>
          <span aria-hidden className="pc-cue label mt-auto flex items-center gap-1.5 pt-6 text-[10px] tracking-[0.14em] text-subtle">
            <RotateCw className="h-3 w-3" /> See the fix <span className="pc-cue-arrow text-accent/80">→</span>
          </span>
        </div>

        {/* back: the fix */}
        <div className="flip-face flip-back flex flex-col rounded-2xl border border-accent/55 bg-[linear-gradient(160deg,#2a170d,#1a100b_60%)] p-6 shadow-[0_18px_44px_-24px_rgba(234,106,47,0.7)]">
          <div className="flex items-start justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/50 bg-accent/15 text-accent-2">
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <span className="label rounded-full bg-accent/15 px-2.5 py-1 text-[9.5px] text-accent-2">Automated</span>
          </div>
          <h3 className="item-title mt-6 text-accent">{p.fix}</h3>
          <p className="mt-2 text-[15px] leading-[1.7] text-text/90">{p.fixLine}</p>
          <a
            href="#audit"
            onClick={onLinkClick}
            className="group mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-4 text-[14px] text-accent"
          >
            {open ? "Get My Free Audit" : "Fix this"}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProblemCards() {
  return (
    <Section id="problems" className="bg-[#150e0a]">
      <SectionHeading
        eyebrow="What we automate"
        title="The work your team shouldn't have to do."
        sub="Five kinds of repetitive work we see in almost every business. Tap a card to see the system we'd build."
      />

      <Stagger className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-5">
        {PROBLEMS.map((p, i) => (
          <StaggerItem key={p.title} className="h-full">
            <FlipCard p={p} i={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
