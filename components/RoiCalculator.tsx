"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Ambient, Button, Reveal, Section, SectionHeading, SPRING } from "./ui";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  display,
  minLabel,
  maxLabel,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  minLabel: string;
  maxLabel: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15.5px] text-text md:text-[16px]">
          {label}
        </label>
        <span className="text-[22px] font-semibold tabular-nums text-accent-2">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flow-range mt-2 w-full"
        style={{ "--p": `${pct}%` } as React.CSSProperties}
      />
      <div className="label mt-1 flex justify-between text-[10px] text-subtle">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

/* the ₹ token: two faces so the flip never shows a mirrored glyph */
function Coin({ flip }: { flip: boolean }) {
  const face =
    "coin-face absolute inset-0 grid place-items-center rounded-full font-logo text-[44px] font-bold text-[#3b1607] md:text-[52px]";
  return (
    <motion.div
      className="relative h-[96px] w-[96px] [transform-style:preserve-3d] md:h-[116px] md:w-[116px]"
      initial={false}
      animate={{ rotateY: flip ? 360 : 0 }}
      transition={{ duration: 1.0, ease: [0.33, 1, 0.68, 1] }}
    >
      <span className={face}>₹</span>
      <span className={`${face} [transform:rotateY(180deg)]`}>₹</span>
    </motion.div>
  );
}

export default function RoiCalculator() {
  const [enq, setEnq] = useState(40);
  const [ignored, setIgnored] = useState(30);
  const [avg, setAvg] = useState(5000);

  // monthly_leak = (enquiries_per_week × 4.33) × (slow_reply_pct ÷ 100) × avg_customer_value
  const leaking = enq * 4.33 * (ignored / 100) * avg;

  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const seen = useInView(stage, { once: true, margin: "0px 0px -20% 0px" });
  const [revealed, setRevealed] = useState(false);
  const shown = useMotionValue(0);
  const text = useTransform(shown, (v) => inr(v));

  // entry: coin pops + flips (CSS/motion), then the number counts up and lands
  useEffect(() => {
    if (!seen) return;
    if (reduce) {
      shown.set(leaking);
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => {
      animate(shown, leaking, { duration: 1.1, ease: [0.16, 1, 0.3, 1], onComplete: () => setRevealed(true) });
    }, 750);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, reduce]);

  // after the reveal, slider changes glide the number to its new value
  useEffect(() => {
    if (!revealed) return;
    const c = animate(shown, leaking, reduce ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 28 });
    return () => c.stop();
  }, [leaking, revealed, reduce, shown]);

  return (
    <Section id="calculator" grid="soft" className="overflow-x-clip bg-[#140d09]">
      <Ambient className="-left-48 top-[30%] hidden h-[520px] w-[520px] md:block" />
      <SectionHeading
        eyebrow="Revenue leak"
        title="How much are you leaking?"
        sub="Drag the sliders. Watch the number. (Estimate — your real number comes from the free audit.)"
      />

      <div className="mt-10 grid items-stretch gap-5 md:mt-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
        <Reveal className="glass space-y-8 rounded-[24px] p-6 md:p-8">
          <Slider id="roi-enq" label="Enquiries per week" value={enq} min={0} max={200} step={1} display={`${enq}`} minLabel="0" maxLabel="200" onChange={setEnq} />
          <Slider
            id="roi-ign"
            label="Enquiries with a slow or no reply"
            value={ignored}
            min={0}
            max={100}
            step={1}
            display={`${ignored}%`}
            minLabel="0%"
            maxLabel="100%"
            onChange={setIgnored}
          />
          <Slider
            id="roi-avg"
            label="Average value of one customer"
            value={avg}
            min={500}
            max={50000}
            step={500}
            display={inr(avg)}
            minLabel="₹500"
            maxLabel="₹50,000"
            onChange={setAvg}
          />
        </Reveal>

        {/* result stage: the number is the hero of this section */}
        <div
          ref={stage}
          className="relative flex flex-col items-center justify-center overflow-hidden rounded-[24px] border border-accent/25 bg-[radial-gradient(ellipse_at_50%_30%,rgba(234,106,47,0.16),transparent_65%)] px-6 py-10 text-center md:px-10 md:py-12"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.6, y: 10 }}
            animate={seen ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={SPRING.success}
          >
            <Coin flip={!!seen && !reduce} />
          </motion.div>

          <p className="mt-6 text-[15px] leading-[1.6] text-muted md:text-[16px]">Estimated revenue leaking every month</p>
          <motion.div
            aria-hidden
            className="display mt-2 max-w-full break-words text-[clamp(3rem,7.5vw,5.6rem)] leading-[1.02] tabular-nums text-text"
            initial={false}
            animate={revealed && !reduce ? { scale: [1.06, 1] } : undefined}
            transition={SPRING.success}
          >
            <motion.span>{text}</motion.span>
          </motion.div>
          <span data-testid="roi-result" className="sr-only" aria-live="polite">
            {inr(leaking)}
          </span>

          <motion.div
            className="mt-7 flex flex-col items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5 }}
          >
            <p className="max-w-[34ch] text-[14.5px] leading-[1.6] text-subtle">
              Money that walks away because nobody replied in time — every month.
            </p>
            <Button href="#audit">Find your real number</Button>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
