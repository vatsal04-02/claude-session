"use client";

import { useEffect, useRef, useState } from "react";

/** The hero's animated automation dashboard (a 12s, ~340KB loop; source in video/hero-bg).
    The still poster paints with the page; the video is only fetched after the page has loaded,
    plays muted on a loop, pauses when the hero is off-screen, and is skipped for reduced motion. */
export default function HeroBackground() {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => setLoad(true);
    if (document.readyState === "complete") start();
    else addEventListener("load", start, { once: true });
    return () => removeEventListener("load", start);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!load || !v) return;
    v.muted = true;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [load]);

  return (
    <div aria-hidden className="hero-bg pointer-events-none absolute inset-0">
      {load && (
        <video ref={ref} className="h-full w-full object-cover" muted loop playsInline preload="auto" poster="/hero-bg-poster.webp" disablePictureInPicture>
          <source src="/hero-bg.webm" type="video/webm" />
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
