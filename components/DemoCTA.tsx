"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useRef } from "react";
import { useDemo } from "@/lib/demo-context";
import { whatsappHref } from "@/lib/site";
import { Button, Magnetic, Reveal } from "./ui";

export default function DemoCTA() {
  const { open } = useDemo();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);
  const rot = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const wa = whatsappHref
    ? ({ href: whatsappHref, target: "_blank", rel: "noopener noreferrer" } as const)
    : ({ onClick: open } as const);

  return (
    <section id="demo" ref={ref} className="relative overflow-hidden px-5 py-28 md:px-8 md:py-44">
      {/* concentric rings that slowly turn with scroll */}
      <motion.div
        aria-hidden
        style={{ scale, rotate: rot }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
      >
        {[1, 0.74, 0.5].map((s, i) => (
          <div
            key={s}
            className="absolute inset-0 m-auto rounded-full border border-dashed border-border"
            style={{ width: `${s * 100}%`, height: `${s * 100}%`, opacity: 0.9 - i * 0.2 }}
          />
        ))}
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_20px_4px_rgba(94,231,247,0.7)]" />
        <span className="absolute bottom-[13%] right-[14%] h-2 w-2 rounded-full bg-accent-2 shadow-[0_0_16px_3px_rgba(110,168,255,0.7)]" />
      </motion.div>
      <div aria-hidden className="anim-drift-a pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[120px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="label inline-flex items-center gap-2 text-accent">
            <span className="h-px w-6 bg-accent/60" /> Free 20-minute demo <span className="h-px w-6 bg-accent/60" />
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.04] tracking-[-0.035em]"
            style={{ fontWeight: 670 }}
          >
            Let&apos;s automate the work you&apos;re still doing{" "}
            <span className="grad-text">manually</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-lg text-muted md:text-xl">
            Book a free 20-minute demo. We&apos;ll look at your workflow and identify what can be automated.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic strength={0.3}>
            <Button size="lg" onClick={open}>
              Book a Free Demo
            </Button>
          </Magnetic>
          <Button size="lg" variant="ghost" arrow={<MessageCircle className="h-4 w-4" />} {...wa}>
            WhatsApp Us
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
