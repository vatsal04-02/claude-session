"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Section, SectionHeading } from "./ui";

const STEPS = [
  ["Understand", "We map how your business handles enquiries today."],
  ["Design", "We design the customer journey and the automation."],
  ["Build", "We build the website, CRM and workflows."],
  ["Integrate", "WhatsApp, calendar, email and other tools you already use."],
  ["Launch", "Your team starts using the system, with us alongside."],
  ["Improve", "We optimise from real usage, not guesses."],
] as const;

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const [reached, setReached] = useState(reduce ? STEPS.length : 0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    // step i lights up when the line has reached its row
    setReached(Math.min(STEPS.length, Math.floor(v * (STEPS.length - 1) + 0.12) + 1) * (v > 0.001 ? 1 : 0));
  });

  return (
    <Section id="process" className="bg-bg-soft/70">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Process"
            title={
              <>
                From first call to <span className="grad-text">running system</span>.
              </>
            }
            sub="A simple, transparent path. You always know what is happening and what comes next."
          />
        </div>

        <ol ref={ref} className="relative">
          <div aria-hidden className="absolute bottom-6 left-[23px] top-6 w-[2px] rounded-full bg-border">
            <motion.div
              style={{ scaleY: line }}
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-accent to-accent-2"
            />
          </div>
          {STEPS.map(([name, body], i) => {
            const on = i < reached;
            return (
              <motion.li
                key={name}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative flex gap-6 py-6 md:gap-8 md:py-8"
              >
                <span
                  className={cn(
                    "relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border bg-surface-2 font-mono text-sm transition-all duration-500",
                    on
                      ? "border-accent text-accent shadow-[0_0_0_6px_rgba(94,231,247,0.1),0_0_28px_rgba(94,231,247,0.25)]"
                      : "border-border text-subtle"
                  )}
                >
                  0{i + 1}
                </span>
                <div
                  className={cn(
                    "flex-1 rounded-2xl border bg-surface p-5 transition-colors duration-500 md:p-6",
                    on ? "border-border-bright" : "border-border"
                  )}
                >
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{name}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted md:text-base">{body}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
