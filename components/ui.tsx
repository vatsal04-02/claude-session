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

const SPACE = {
  md: "py-20 md:py-[120px]",
  lg: "py-24 md:py-[150px]",
  xl: "py-28 md:py-[180px]",
} as const;

export function Section({
  id,
  className,
  space = "md",
  children,
}: {
  id?: string;
  className?: string;
  space?: keyof typeof SPACE;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("section-edge relative px-5 md:px-8", SPACE[space], className)}>
      <div className="mx-auto w-full max-w-[1140px]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  size = "md",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  size?: "md" | "sm";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <span className="label inline-flex items-center gap-2.5 text-accent">
          <span className="h-px w-6 bg-accent/70" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.07}>
        <h2
          className={cn(
            "display mt-4 text-balance text-text",
            size === "md" ? "text-[clamp(2.25rem,4.4vw,3.5rem)]" : "text-[clamp(1.9rem,3.4vw,2.75rem)]"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.14}>
          <div className="mt-5 max-w-[34rem] text-[16px] leading-[1.75] text-muted md:text-[17px]">{sub}</div>
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
      ? "bg-accent text-[#1a0a03] hover:-translate-y-0.5 hover:bg-accent-2 hover:shadow-[0_12px_30px_-10px_rgba(233,107,47,0.7)]"
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

/** Phones: horizontal snap-swipe row with the next card peeking. md+: the caller's grid. */
export const SWIPE_ROW =
  "no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0";
export const SWIPE_ITEM = "w-[84%] shrink-0 snap-start md:h-full md:w-auto";
export function SwipeHint({ children }: { children: React.ReactNode }) {
  return <p className="label mt-3 text-[10px] text-subtle md:hidden">{children} →</p>;
}

/** Signature motion: the word fades to orange, a thin line sweeps under it, a soft glow settles. */
export function Highlight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const on = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      <motion.span
        className="inline-block"
        initial={{ color: "#f2e9df", textShadow: "0 0 0 rgba(234,106,47,0)" }}
        animate={on ? { color: "#ea6a2f", textShadow: "0 0 0.45em rgba(234,106,47,0.35)" } : undefined}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute -bottom-[0.06em] left-0 h-[0.07em] min-h-[2px] w-full origin-left rounded-full bg-accent"
        initial={{ scaleX: 0 }}
        animate={on ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut", delay: delay + 0.25 }}
      />
    </span>
  );
}

/** A short chip sequence ("Lead → Contact → Pipeline") that lights up once on reveal. */
export function FlowChain({
  steps,
  step = 0.55,
  className,
}: {
  steps: readonly string[];
  step?: number;
  className?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const run = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const cycle = steps.length * step + 2.4;
  return (
    <ol
      ref={ref}
      data-run={run}
      aria-label={steps.join(", then ")}
      style={{ "--cycle": `${cycle}s` } as React.CSSProperties}
      className={cn("flow-chain flex flex-wrap items-center gap-y-2", className)}
    >
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          <span
            className="flow-chip text-[13px] leading-none text-muted"
            style={{ animationDelay: `${0.5 + i * step}s` }}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="flow-arrow mx-2 text-[12px] text-border-bright"
              style={{ animationDelay: `${0.5 + i * step + 0.25}s` }}
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
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
