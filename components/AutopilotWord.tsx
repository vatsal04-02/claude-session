"use client";

import { useEffect, useRef, useState } from "react";

/** The hero's one cinematic moment: a small aircraft crosses "autopilot." and uncovers it.
    The motion itself is pure CSS (.ap in globals.css — transforms and opacity only), so it plays on first
    paint, before any JavaScript. This component only re-arms it: once the word has fully left the screen,
    it resets (invisibly); when it comes back into view, the flight plays once more. */
export default function AutopilotWord() {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState<"play" | "idle">("play");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const e = entries[entries.length - 1];
      setRun(e.isIntersecting ? "play" : "idle");
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="ap text-accent" data-run={run}>
      <span className="ap-win">
        <span className="ap-in">autopilot.</span>
      </span>
      <span aria-hidden className="ap-fly">
        <span className="ap-craft">
          {/* minimal top-view jet, nose to the right */}
          <svg viewBox="0 0 64 32">
            <defs>
              <linearGradient id="ap-body" x1="64" y1="16" x2="4" y2="16" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FFF4EA" />
                <stop offset="1" stopColor="#E9C3A4" />
              </linearGradient>
            </defs>
            <g fill="url(#ap-body)">
              <path d="M41 13.6 26 1.6h-4.8l8.6 12Z" />
              <path d="M41 18.4 26 30.4h-4.8l8.6-12Z" />
              <path d="M15 13.6 8.2 6.4H5.4l4.2 7.2Z" />
              <path d="m15 18.4-6.8 7.2H5.4l4.2-7.2Z" />
              <path d="M6 16c0-1.6 1.6-2.6 3.4-2.6H52c4.6 0 9.2 1.3 11 2.6-1.8 1.3-6.4 2.6-11 2.6H9.4C7.6 18.6 6 17.6 6 16Z" />
            </g>
          </svg>
        </span>
      </span>
    </span>
  );
}
