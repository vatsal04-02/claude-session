"use client";

import { useState } from "react";
import { Counter, Reveal } from "./ui";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function RoiCalculator() {
  const [tasks, setTasks] = useState(120);
  const [minutes, setMinutes] = useState(10);
  const [rate, setRate] = useState("300");

  const rateValue = Math.min(100_000, Math.max(0, Number(rate) || 0));
  // repeat tasks per week × 4 weeks × minutes each → hours; hours × cost of an hour of staff time
  const hours = (tasks * 4 * minutes) / 60;
  const cost = hours * rateValue;

  return (
    <div id="roi" className="mt-16 border-t border-border pt-14 md:mt-20 md:pt-16">
      <Reveal>
        <h3 className="display text-[clamp(1.75rem,3.2vw,2.5rem)] text-text">What does repeat work cost you?</h3>
        <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.75] text-text md:text-[17px]">
          Drag the sliders. Watch the number. (Estimate — your real number comes from the free audit.)
        </p>
      </Reveal>

      <Reveal className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="roi-tasks" className="text-[16px] text-text">Repeat tasks per week</label>
              <span className="text-[20px] font-semibold tabular-nums text-accent">{tasks}</span>
            </div>
            <input
              id="roi-tasks"
              type="range"
              min={0}
              max={500}
              step={5}
              value={tasks}
              onChange={(e) => setTasks(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-accent"
            />
            <div className="mt-1 flex justify-between text-[13px] tabular-nums text-subtle"><span>0</span><span>500</span></div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="roi-min" className="text-[16px] text-text">Minutes each task takes</label>
              <span className="text-[20px] font-semibold tabular-nums text-accent">{minutes}</span>
            </div>
            <input
              id="roi-min"
              type="range"
              min={1}
              max={60}
              step={1}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-accent"
            />
            <div className="mt-1 flex justify-between text-[13px] tabular-nums text-subtle"><span>1</span><span>60</span></div>
          </div>

          <div>
            <label htmlFor="roi-rate" className="text-[16px] text-text">Cost of one hour of staff time</label>
            <div className="mt-3 flex items-center rounded-xl border border-border bg-bg/60 px-4 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
              <span className="text-[17px] text-muted">₹</span>
              <input
                id="roi-rate"
                type="number"
                inputMode="numeric"
                min={0}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full bg-transparent px-2 py-3 text-[17px] text-text outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-accent/30 bg-accent/[0.05] p-6 md:p-10">
          <p className="text-[16px] leading-[1.6] text-text">Staff time spent on repeat work every month:</p>
          <div
            aria-hidden
            className="display mt-3 break-words text-[clamp(2.75rem,7vw,5rem)] leading-[1.05] text-accent"
          >
            <Counter to={cost} prefix="₹" duration={0.6} />
          </div>
          <p aria-hidden className="mt-3 text-[16px] tabular-nums text-text">
            About {Math.round(hours).toLocaleString("en-IN")} hours a month
          </p>
          <span className="sr-only" aria-live="polite">
            Staff time spent on repeat work every month: {inr(cost)}, about {Math.round(hours)} hours.
          </span>
        </div>
      </Reveal>
    </div>
  );
}
