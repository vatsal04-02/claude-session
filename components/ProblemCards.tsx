"use client";

import { RotateCw } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { PREFILL_EVENT } from "./AuditForm";
import { Section, SectionHeading, Stagger, StaggerItem } from "./ui";

/* Front = the problem, back = the system that fixes it. Every back links to the audit and pre-fills its Message field. */
const PROBLEMS = [
  {
    title: "Leads going cold",
    line: "Enquiries dying in someone's inbox.",
    fix: "Lead Automation",
    fixLine: "Every enquiry answered in seconds, with follow-ups that never forget.",
  },
  {
    title: "No-shows and empty slots",
    line: "Calendar gaps costing you daily.",
    fix: "Booking Automation",
    fixLine: "Bookings that confirm themselves. No-shows that chase themselves.",
  },
  {
    title: "Manual busywork",
    line: "Data entry, reports, reconciliations.",
    fix: "AI CRM Systems",
    fixLine: "The repetitive work your team hates, handled — every lead, chat and booking on one screen.",
  },
  {
    title: "Silent customers",
    line: "Past customers, gone quiet.",
    fix: "Revenue Recovery",
    fixLine: "Review requests, repeat offers, win-back nudges — past customers become revenue again.",
  },
  {
    title: "Your specific problem",
    line: "Something else eating your hours?",
    fix: "Custom automation",
    fixLine: "Tell us what your team does manually. We'll map exactly what can be automated.",
    open: true,
  },
] as const;

/* Flips on hover (mouse) or keyboard focus via CSS; on touch, a tap toggles it. */
function FlipCard({ p, i }: { p: (typeof PROBLEMS)[number]; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const pointer = useRef("mouse");
  const open = "open" in p;

  const onCardClick = (e: React.MouseEvent) => {
    if (pointer.current === "mouse" || (e.target as HTMLElement).closest("a")) return;
    setFlipped((f) => !f);
  };
  const onLinkClick = () => {
    const message = open ? "I'm losing business to: " : `I'm losing business to: ${p.title}.`;
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
        <div className="flip-face rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <span className="label rounded-full border border-border-bright px-2.5 py-1 text-[10.5px] text-muted">0{i + 1}</span>
            <RotateCw aria-hidden className="h-3.5 w-3.5 text-subtle" />
          </div>
          <h3 className="item-title mt-5">{p.title}</h3>
          <p className="mt-2 text-[15px] leading-[1.7] text-muted">{p.line}</p>
        </div>

        {/* back: the fix */}
        <div className="flip-face flip-back flex flex-col rounded-2xl border border-accent/70 bg-[#1d130e] p-6 shadow-[0_0_28px_-6px_rgba(234,106,47,0.55)]">
          <span className="label self-start rounded-full border border-accent/50 px-2.5 py-1 text-[10.5px] text-accent">0{i + 1}</span>
          <h3 className="item-title mt-5 text-accent">{p.fix}</h3>
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
        eyebrow="Problems we solve"
        title="Your problem, automated away."
        sub="Five problems we see in every business. Tap a card to see the system that fixes it."
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
