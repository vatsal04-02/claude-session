"use client";

import { useState } from "react";
import { Counter, Reveal } from "./ui";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function RoiCalculator() {
  const [enq, setEnq] = useState(40);
  const [ignored, setIgnored] = useState(30);
  const [avg, setAvg] = useState("2000");

  const avgValue = Math.min(10_000_000, Math.max(0, Number(avg) || 0));
  // enquiries per week × 4 weeks × share ignored × value of one customer
  const leaking = enq * 4 * (ignored / 100) * avgValue;

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
            <label htmlFor="roi-avg" className="text-[16px] text-text">Average value of one customer</label>
            <div className="mt-3 flex items-center rounded-xl border border-border bg-bg/60 px-4 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
              <span className="text-[17px] text-muted">₹</span>
              <input
                id="roi-avg"
                type="number"
                inputMode="numeric"
                min={0}
                value={avg}
                onChange={(e) => setAvg(e.target.value)}
                className="w-full bg-transparent px-2 py-3 text-[17px] text-text outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-accent/30 bg-accent/[0.05] p-6 md:p-10">
          <p className="text-[16px] leading-[1.6] text-muted">Estimated revenue leaking every month:</p>
          <div
            aria-hidden
            className="display mt-3 break-words text-[clamp(2.75rem,7vw,5rem)] leading-[1.05] text-accent"
          >
            <Counter to={leaking} prefix="₹" duration={0.6} />
          </div>
          <span className="sr-only" aria-live="polite">Estimated revenue leaking every month: {inr(leaking)}</span>
        </div>
      </Reveal>
    </div>
  );
}
