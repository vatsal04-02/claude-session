"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { CalendarCheck, Database, Radio, Sparkles, Workflow } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Section, SectionHeading, Tag } from "./ui";

const STAGES = [
  {
    icon: Radio,
    name: "Capture",
    body: "Every enquiry lands in one place.",
    tags: ["Website", "WhatsApp", "Calls", "Bookings"],
  },
  {
    icon: Sparkles,
    name: "Understand",
    body: "AI organises customer intent and context.",
    tags: ["Intent", "Summary", "Priority"],
  },
  {
    icon: Database,
    name: "Manage",
    body: "The CRM keeps the timeline and ownership.",
    tags: ["Timeline", "Pipeline", "Owner"],
  },
  {
    icon: Workflow,
    name: "Automate",
    body: "Follow-ups, tasks and reminders run themselves.",
    tags: ["Follow-ups", "Tasks", "Reminders"],
  },
  {
    icon: CalendarCheck,
    name: "Convert",
    body: "Bookings, recovery and retention.",
    tags: ["Bookings", "Recovery", "Retention"],
  },
];

export default function FlowSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const [reached, setReached] = useState(reduce ? STAGES.length : 0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setReached(Math.round(v * (STAGES.length - 1) + 0.0001) + (v > 0.02 ? 1 : 0));
  });

  return (
    <Section id="system" className="bg-bg-soft/70">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative">
        <SectionHeading
          align="center"
          eyebrow="The FlowHQ system"
          title={
            <>
              One system. <span className="grad-text">Every customer interaction.</span>
            </>
          }
          sub="Website → Leads → CRM → AI → Automation → Bookings → Follow-up. Connected, instead of scattered across five tools."
        />

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* connector — horizontal on desktop, vertical on mobile */}
          <div
            aria-hidden
            className="absolute bottom-6 left-[27px] top-6 w-[2px] rounded-full bg-border lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-[27px] lg:h-[2px] lg:w-auto"
          >
            <motion.div
              style={{ scaleX: smooth, scaleY: smooth }}
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-accent to-accent-2 lg:origin-left lg:bg-gradient-to-r"
            />
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-5">
            {STAGES.map((s, i) => {
              const on = i < reached;
              return (
                <motion.li
                  key={s.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  <div
                    className={cn(
                      "relative z-10 grid h-[54px] w-[54px] shrink-0 place-items-center rounded-2xl border bg-surface-2 transition-all duration-500",
                      on
                        ? "border-accent text-accent shadow-[0_0_0_6px_rgba(94,231,247,0.1),0_0_30px_rgba(94,231,247,0.25)]"
                        : "border-border text-subtle"
                    )}
                  >
                    <s.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div className="lg:mt-6">
                    <div className="label text-[11px] text-subtle">0{i + 1}</div>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">{s.name}</h3>
                    <p className="mt-2 max-w-[28ch] text-[15px] leading-relaxed text-muted lg:mx-auto">
                      {s.body}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 lg:justify-center">
                      {s.tags.map((t) => (
                        <Tag key={t} tone="muted">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
