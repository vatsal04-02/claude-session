"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { FOUNDER_NUMBERS, FOUNDER_PREFILL, waUrl } from "@/lib/whatsapp";
import { Reveal, Section, SectionHeading } from "./ui";

const FOUNDERS = [
  { name: "Prachi Pathak", photo: "/founder-prachi.webp", w: 900, h: 1196, number: FOUNDER_NUMBERS.prachi },
  { name: "Vatsal Tripathi", photo: "/founder-vatsal.webp", w: 900, h: 1200, number: FOUNDER_NUMBERS.vatsal },
] as const;

const POINTS = ["Every system personally built", "No SaaS lock-in — you own it", "You talk to the builder, not a rep"];

/** Muted looping clip; click toggles play/pause. Stays paused for reduced-motion users. */
function FounderVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [flash, setFlash] = useState(0);

  // React sets `muted` as a property only, so the static HTML lacks it and iOS refuses to autoplay: force it.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
    setFlash((n) => n + 1);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause video" : "Play video"}
      className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-accent/30 bg-bg shadow-[0_0_44px_-10px_rgba(234,106,47,0.4)]"
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/pipeline-video-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/pipeline-video.mp4" type="video/mp4" />
        <source src="/pipeline-video.webm" type="video/webm" />
      </video>
      <span
        key={flash}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border-bright bg-bg/70 text-text backdrop-blur-sm",
          playing ? (flash ? "founder-flash" : "opacity-0") : "opacity-100"
        )}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z" /></svg>
        )}
      </span>
    </button>
  );
}

export default function Founder() {
  return (
    <Section id="founder" className="bg-[#140e0a]">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* photos + tagline */}
        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            {FOUNDERS.map((f) => (
              <figure key={f.name}>
                <div className="founder-photo relative overflow-hidden rounded-2xl border border-border bg-surface">
                  <img src={f.photo} alt={f.name} width={f.w} height={f.h} loading="lazy" className="block h-auto w-full" />
                </div>
                <figcaption className="mt-3">
                  <div className="text-[16px] font-semibold text-text">{f.name}</div>
                  <a
                    href={waUrl(f.number, FOUNDER_PREFILL)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-1.5 text-[14px] text-[#25D366] transition-opacity hover:opacity-80"
                  >
                    Chat with me directly
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="label mt-5 text-accent/80" style={{ letterSpacing: "0.22em" }}>
            Built To Automate.
          </p>
        </Reveal>

        {/* copy */}
        <div>
          <SectionHeading
            eyebrow="Built in Lucknow"
            title="Meet the people who build your system."
            sub="We're Prachi Pathak and Vatsal Tripathi. We build automation systems for businesses losing hours to manual follow-up — every workflow, WhatsApp flow, and dashboard on this page was built by us, on infrastructure our clients own. No sales team, no juniors, no outsourcing."
          />
          <Reveal delay={0.2}>
            <ul className="mt-7 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[16px] leading-[1.5] text-text">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent/10 text-accent">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* video, full width below */}
      <Reveal className="mx-auto mt-14 max-w-[960px] md:mt-16">
        <FounderVideo />
        <p className="mt-4 text-center text-[14.5px] text-muted">Thirty seconds: enquiry to customer, on autopilot.</p>
      </Reveal>
    </Section>
  );
}
