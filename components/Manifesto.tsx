"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Highlight } from "./ui";

/* Brand statement strip, directly below the hero: giant serif line, no section chrome.
   The line scales 0.92 → 1 and fades in as the strip scrolls into place. */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} aria-label="Manifesto" role="region" className="relative overflow-x-clip px-5 py-14 text-center md:px-8 md:py-20">
      <motion.p
        style={reduce ? undefined : { scale, opacity }}
        className="font-serif mx-auto max-w-[20ch] text-balance text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] tracking-[-0.01em] text-text"
      >
        We don&apos;t sell marketing. We install <Highlight>growth engines.</Highlight>
      </motion.p>
      <p className="label mt-6 text-subtle" style={{ letterSpacing: "0.24em" }}>
        Built To Automate.
      </p>
    </div>
  );
}
