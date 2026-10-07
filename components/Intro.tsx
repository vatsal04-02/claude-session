"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import LogoMark from "./LogoMark";

/** Runs before paint (in <head>): the intro plays once per session, never for reduced-motion users,
    and any click, key, wheel or touch skips it — even before hydration. */
export const INTRO_SCRIPT = `try{var d=document.documentElement;if(sessionStorage.getItem("flowhq-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="off"}else{sessionStorage.setItem("flowhq-intro","1");var s=function(){if(!d.dataset.intro)d.dataset.intro="skip"};["pointerdown","wheel","touchstart","keydown"].forEach(function(e){addEventListener(e,s,{passive:true,once:true})})}}catch(e){}`;

const LETTERS = "LOW HQ".split("");

/* ~1s brand intro: the F draws in, "LOW HQ" types beside it, then the black overlay fades.
   Timing and skipping are pure CSS (see .intro in globals.css); this only removes the node when done. */
export default function Intro() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "off") setGone(true);
  }, []);

  if (gone) return null;
  return (
    <div
      aria-hidden
      className="intro"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) setGone(true);
      }}
    >
      <div className="font-logo flex items-center gap-[0.05em] text-[clamp(2.5rem,7vw,4.25rem)] font-bold leading-none tracking-[-0.01em]">
        <LogoMark draw gradientId="flowhq-intro" className="h-[1.75em] w-auto" />
        <span className="flex whitespace-pre">
          {LETTERS.map((l, i) => (
            <span key={i} className={cn("intro-l", i < 3 ? "text-[#F8E9C9]" : "text-[#FF6510]")} style={{ "--i": i } as React.CSSProperties}>
              {l}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
