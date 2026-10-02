"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export function Stagger({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={item} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section scaffolding                                                 */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-16 md:px-8 md:py-24", className)}>
      <div className="mx-auto w-full max-w-[1140px]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Reveal>
        <span className="label inline-flex items-center gap-2.5 text-accent">
          <span className="h-px w-6 bg-accent/70" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.07}>
        <h2 className="display mt-4 text-[clamp(2.4rem,5.2vw,4rem)] text-text">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.14}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Tag({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: "accent" | "muted" | "success" | "warning";
}) {
  const tones = {
    accent: "border-accent/25 bg-accent/10 text-accent",
    muted: "border-border bg-transparent text-muted",
    success: "border-success/25 bg-success/10 text-success",
    warning: "border-warning/25 bg-warning/10 text-warning",
  };
  return (
    <span
      className={cn(
        "label inline-flex items-center rounded-full border px-2.5 py-1.5 text-[10px] leading-none",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({
  tone = "success",
  pulse = true,
  className,
}: {
  tone?: "success" | "accent" | "warning" | "danger" | "subtle";
  pulse?: boolean;
  className?: string;
}) {
  const color = {
    success: "text-success bg-success",
    accent: "text-accent bg-accent",
    warning: "text-warning bg-warning",
    danger: "text-danger bg-danger",
    subtle: "text-subtle bg-subtle",
  }[tone];
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-block h-2 w-2 shrink-0 rounded-full",
        color,
        pulse && "pulse-dot",
        className
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

export function SpotlightCard({
  children,
  className,
  lift = true,
  ...rest
}: { lift?: boolean } & HTMLMotionProps<"div">) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      onMouseMove={onMove}
      whileHover={lift ? { y: -3 } : undefined}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "spotlight rounded-2xl border border-border bg-surface transition-[border-color] duration-300 hover:border-accent/45",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type BtnProps = {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  arrow?: React.ReactNode;
  arrowMove?: "x" | "y";
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className">)
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">)
);

export function Button({
  variant = "primary",
  size = "md",
  arrow = <ArrowRight className="h-4 w-4" />,
  arrowMove = "x",
  className,
  children,
  ...props
}: BtnProps) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[transform,box-shadow,border-color,background-color] duration-300 active:scale-[0.97] cursor-pointer",
    size === "md" ? "h-10 px-5 text-[14px]" : "h-12 px-7 text-[15px]",
    variant === "primary"
      ? "bg-accent text-[#1a0a03] hover:bg-accent-2 hover:shadow-[0_10px_34px_-10px_rgba(233,104,45,0.8)]"
      : "border border-border-bright text-text hover:border-accent/60 hover:text-accent",
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={cn(
            "transition-transform duration-300",
            arrowMove === "x" ? "group-hover:translate-x-1" : "group-hover:translate-y-1"
          )}
        >
          {arrow}
        </span>
      )}
    </>
  );
  if ("href" in props && props.href !== undefined) {
    const { href, ...a } = props;
    return (
      <a href={href} className={base} {...a}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={base} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}

/** Wraps a child so it gently follows the cursor. Disabled for reduced motion / touch. */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Numbers & text                                                      */
/* ------------------------------------------------------------------ */

/** Counts up when scrolled into view, and smoothly re-animates whenever `to` changes. */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
  format = (n: number) => Math.round(n).toLocaleString("en-IN"),
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${prefix}${format(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, to, reduce, duration, mv]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {text}
    </motion.span>
  );
}

/** Types text out once it enters the viewport (or when `text` changes). */
export function Typewriter({
  text,
  speed = 18,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(0);
  }, [text]);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(text.length);
      return;
    }
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed, reduce]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {text.slice(0, n)}
        {n < text.length && <span className="anim-blink text-accent">▍</span>}
      </span>
    </span>
  );
}

/** Rotating swap of children keyed by `k` with a short slide. */
export function Swap({
  k,
  children,
  className,
}: {
  k: string | number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={k}
        className={className}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Page-level                                                          */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
    />
  );
}

/** Ticks a counter on an interval – handy for "systems working" loops. */
export function useTicker(intervalMs: number, enabled = true) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, enabled]);
  return tick;
}

/** True only while the element is on screen — used to pause loops off-screen. */
export function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  return [ref, inView] as const;
}
