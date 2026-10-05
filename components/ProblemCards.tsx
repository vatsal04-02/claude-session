"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";
import { PREFILL_EVENT } from "./AuditForm";
import { Section, SectionHeading, Stagger, StaggerItem } from "./ui";

const PROBLEMS = [
  {
    title: "Leads going cold",
    line: "Every enquiry answered in seconds, follow-ups that never forget. No lead dies in someone's inbox.",
  },
  {
    title: "No-shows and empty slots",
    line: "Booking, confirmation, reminders and re-booking — your calendar fills itself.",
  },
  {
    title: "Manual busywork",
    line: "Data entry, reports, notifications, reconciliations — the repetitive work your team hates, handled.",
  },
  {
    title: "Silent customers",
    line: "Review requests, repeat offers, win-back nudges — past customers become revenue again.",
  },
  {
    title: "Your specific problem",
    line: "Tell us what your team does manually. We'll map exactly what can be automated.",
    open: true,
  },
] as const;

const MAX_TILT = 6; // degrees

/* Each card links to the audit form and pre-fills its Message field. Desktop: 3D tilt + orange glow border. */
function ProblemCard({ p, i }: { p: (typeof PROBLEMS)[number]; i: number }) {
  const reduce = useReducedMotion();
  const spring = { stiffness: 260, damping: 22, mass: 0.5 };
  const rx = useSpring(useMotionValue(0), spring);
  const ry = useSpring(useMotionValue(0), spring);
  const open = "open" in p;

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 2 * MAX_TILT);
    rx.set(-py * 2 * MAX_TILT);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };
  const onClick = () => {
    const message = open ? "I'm losing business to: " : `I'm losing business to: ${p.title}.`;
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { message, focus: open } }));
  };

  return (
    <motion.a
      href="#audit"
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn(
        "card-lift group relative block h-full rounded-2xl border border-border bg-surface p-6",
        open && "border-accent/40 bg-accent/[0.05]"
      )}
    >
      {/* orange glow border, faded in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl border border-accent/70 opacity-0 shadow-[0_0_28px_-4px_rgba(234,106,47,0.55)] transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="label text-subtle">0{i + 1}</span>
      <h3 className="item-title mt-4">{p.title}</h3>
      <p className="mt-2 text-[15px] leading-[1.7] text-muted">{p.line}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] text-accent">
        {open ? "Get My Free Audit" : "Fix this"}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </motion.a>
  );
}

export default function ProblemCards() {
  return (
    <Section id="problems" className="bg-[#160f0b]">
      <SectionHeading
        eyebrow="Problems we solve"
        title="What we automate"
        sub="Every business wastes hours differently. These are the problems we automate most — yours might be next."
      />

      <Stagger className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-5">
        {PROBLEMS.map((p, i) => (
          <StaggerItem key={p.title} className="h-full">
            <ProblemCard p={p} i={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
