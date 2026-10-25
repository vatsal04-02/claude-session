"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Children, createContext, Fragment, isValidElement, useContext, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Depth & motion layer. Rules (ui-ux-pro-max): transform/opacity/clip only, small parallax deltas with the
   background slowest, body copy never moves with scroll, and reduced motion gets the final, still state. */

/* ------------------------------------------------------------------ */
/* Scroll parallax                                                     */
/* ------------------------------------------------------------------ */

/** Moves its children vertically as the element crosses the viewport. `speed` in px either side (negative = against scroll). */
export function Parallax({ speed = 40, className, children }: { speed?: number; className?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed, -speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Tilts up out of 3D perspective (and grows slightly) as it scrolls into view — for the product window. */
export function ScrollTiltIn({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const rotateX = useTransform(p, [0, 1], reduce ? [0, 0] : [24, 0]);
  const scale = useTransform(p, [0, 1], reduce ? [1, 1] : [0.9, 1]);
  const y = useTransform(p, [0, 1], reduce ? [0, 0] : [60, 0]);
  return (
    <div className="[perspective:1600px]">
      <motion.div ref={ref} style={{ rotateX, scale, y, transformOrigin: "50% 0%" }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}

/** A full-bleed band that opens like a curtain: starts inset with rounded corners, reaches the edges as it scrolls in. */
export function Curtain({ className, children, ...rest }: React.HTMLAttributes<HTMLElement> & { id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [5, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [48, 0]);
  const clipPath = useMotionTemplate`inset(0 ${inset}% 0 ${inset}% round ${radius}px)`;
  return (
    <motion.section ref={ref} style={{ clipPath }} className={className} {...(rest as object)}>
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* Headline reveal: words rise out of their own masks, one by one      */
/* ------------------------------------------------------------------ */

const Word = ({ children, i, reduce }: { children: React.ReactNode; i: number; reduce: boolean | null }) => (
  <span className="inline-block overflow-hidden pb-[0.12em] pr-[0.06em] -mb-[0.12em] align-bottom">
    <motion.span
      className="inline-block"
      initial={reduce ? false : { y: "110%", rotate: 4 }}
      whileInView={{ y: "0%", rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: i * 0.055 }}
    >
      {children}
    </motion.span>
  </span>
);

/** Splits plain text into words; an element (e.g. <em>) stays one unit. The words stay in the HTML (crawlable). */
export function WordsReveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const units: React.ReactNode[] = [];
  const walk = (node: React.ReactNode) => {
    Children.forEach(node, (c) => {
      if (typeof c === "string" || typeof c === "number") {
        String(c)
          .split(/(\s+)/)
          .forEach((w) => w && units.push(w));
      } else if (isValidElement(c) && c.type === Fragment) {
        walk((c.props as { children?: React.ReactNode }).children);
      } else if (c != null && c !== false) units.push(c);
    });
  };
  walk(children);
  let n = 0;
  return (
    <>
      {units.map((u, k) =>
        typeof u === "string" && /^\s+$/.test(u) ? (
          " "
        ) : (
          <Word key={k} i={n++} reduce={reduce}>
            {u}
          </Word>
        )
      )}
    </>
  );
}

/** Rises into place with a 3D tilt — for grid cards. */
export function Rise3D({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("[perspective:1400px]", className)}>
      <motion.div
        className="h-full"
        initial={reduce ? false : { opacity: 0, y: 60, rotateX: 18 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1, ease: EASE, delay }}
        style={{ transformOrigin: "50% 100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pointer depth: layers inside a <DepthField> drift with the mouse    */
/* ------------------------------------------------------------------ */

const DepthCtx = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null);

/** Tracks the mouse over its area as -1…1 springs. Touch devices and reduced motion: everything stays put. */
export function DepthField({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 70, damping: 18, mass: 0.6 });
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const leave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [reduce, mx, my]);
  return (
    <DepthCtx.Provider value={{ x, y }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </DepthCtx.Provider>
  );
}

/** A layer that shifts by `depth` px at the field's edges (positive = toward the cursor, so it feels nearer). */
export function DepthLayer({ depth = 12, className, style, children }: { depth?: number; className?: string; style?: React.CSSProperties; children?: React.ReactNode }) {
  const ctx = useContext(DepthCtx);
  const zero = useMotionValue(0);
  const x = useTransform(ctx?.x ?? zero, (v) => v * depth);
  const y = useTransform(ctx?.y ?? zero, (v) => v * depth);
  return (
    <motion.div style={{ x, y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

/** Gentle idle bob for floating cards (pure CSS keyframes would fight the depth transform, so it's a nested motion layer). */
export function Float({ children, className, delay = 0, distance = 8 }: { children: React.ReactNode; className?: string; delay?: number; distance?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -distance, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
