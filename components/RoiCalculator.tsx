"use client";

import { useState } from "react";
import { Reveal } from "./ui";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function RoiCalculator() {
  const [enq, setEnq] = useState(40);
  const [ignored, setIgnored] = useState(30);
  const [avg, setAvg] = useState(5000);

  // monthly_leak = (enquiries_per_week × 4.33) × (slow_reply_pct ÷ 100) × avg_customer_value
  const leaking = enq * 4.33 * (ignored / 100) * avg;

  return (
    <div id="roi" className="mt-16 border-t border-border pt-14 md:mt-20 md:pt-16">
      <Reveal>
        <span className="label inline-flex items-center gap-2.5 text-accent">
          <span className="h-px w-6 bg-accent/70" /> Revenue leak
        </span>
        <h3 className="display mt-4 text-[clamp(1.75rem,3.2vw,2.5rem)] text-text">How much are you leaking?</h3>
        <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.75] text-muted md:text-[17px]">
          Drag the sliders. Watch the number. (Estimate — your real number comes from the free audit.)
        </p>
      </Reveal>

      <Reveal className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="roi-enq" className="text-[16px] text-text">Enquiries per week</label>
              <span className="text-[20px] font-semibold tabular-nums text-accent">{enq}</span>
            </div>
            <input
              id="roi-enq"
              type="range"
              min={0}
              max={200}
              step={1}
              value={enq}
              onChange={(e) => setEnq(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-accent"
            />
            <div className="label mt-1 flex justify-between text-[10px] text-subtle"><span>0</span><span>200</span></div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="roi-ign" className="text-[16px] text-text">Enquiries with a slow or no reply</label>
              <span className="text-[20px] font-semibold tabular-nums text-accent">{ignored}%</span>
            </div>
            <input
              id="roi-ign"
              type="range"
              min={0}
              max={100}
              step={1}
              value={ignored}
              onChange={(e) => setIgnored(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-accent"
            />
            <div className="label mt-1 flex justify-between text-[10px] text-subtle"><span>0%</span><span>100%</span></div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="roi-avg" className="text-[16px] text-text">Average value of one customer</label>
              <span className="text-[20px] font-semibold tabular-nums text-accent">{inr(avg)}</span>
            </div>
            <input
              id="roi-avg"
              type="range"
              min={500}
              max={50000}
              step={500}
              value={avg}
              onChange={(e) => setAvg(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-accent"
            />
            <div className="label mt-1 flex justify-between text-[10px] text-subtle"><span>₹500</span><span>₹50,000</span></div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-accent/30 bg-accent/[0.05] p-6 md:p-10">
          <p className="text-[16px] leading-[1.6] text-muted">Estimated revenue leaking every month:</p>
          <div
            data-testid="roi-result"
            className="display mt-3 break-words text-[clamp(2.75rem,7vw,5rem)] leading-[1.05] tabular-nums text-accent"
          >
            {inr(leaking)}
          </div>
          <span className="sr-only" aria-live="polite">Estimated revenue leaking every month: {inr(leaking)}</span>
          <a
            href="#audit"
            className="group mt-3 inline-flex min-h-11 items-center gap-2 self-start text-[15px] text-text underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/60"
          >
            Find your real number
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </Reveal>
    </div>
  );
}
