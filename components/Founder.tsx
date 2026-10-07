"use client";

import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { FOUNDER_NUMBERS, FOUNDER_PREFILL, waUrl } from "@/lib/whatsapp";
import { Reveal, Section, SectionHeading } from "./ui";

const FOUNDERS = [
  // face: where the face sits in the photo (x% y%) — the crop zooms in around it
  { name: "Prachi Pathak", photo: "/founder-prachi.webp", w: 900, h: 1196, face: "58% 40%", number: FOUNDER_NUMBERS.prachi },
  { name: "Vatsal Tripathi", photo: "/founder-vatsal.webp", w: 900, h: 1200, face: "50% 38%", number: FOUNDER_NUMBERS.vatsal },
] as const;

const POINTS = ["Every system personally built", "No SaaS lock-in — you own it", "You talk to the builder, not a rep"];

/** The founders' talking video. Drop the file at public/founders.mp4, then set `ready: true` and rebuild.
    Until then the 16:9 frame shows a "coming soon" placeholder (and requests nothing). */
const FOUNDERS_VIDEO = { src: "/founders.mp4", ready: false };

/** Click-to-play with sound: no autoplay, no loop, not muted. Click again to pause. */
function FounderVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!FOUNDERS_VIDEO.ready) {
    return (
      <div className="relative grid aspect-video w-full place-items-center overflow-hidden rounded-2xl border border-dashed border-accent/40 bg-surface">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border-bright bg-bg/70 text-subtle">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden><path d="M8 5.5v13l10.5-6.5z" /></svg>
          </span>
          <p className="label mt-4 text-[11px] text-subtle">Founders video · coming soon</p>
        </div>
      </div>
    );
  }

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      v.play().catch(() => {});
    } else v.pause();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause video" : "Play video with sound"}
      className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-accent/30 bg-bg shadow-[0_0_44px_-10px_rgba(234,106,47,0.4)]"
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={FOUNDERS_VIDEO.src}
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border-bright bg-bg/70 text-text backdrop-blur-sm transition-opacity duration-300",
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z" /></svg>
        )}
      </span>
    </button>
  );
}

export default function Founder() {
  return (
    <Section id="founder" className="bg-[#130d09]">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* photos + tagline */}
        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            {FOUNDERS.map((f) => (
              <figure key={f.name}>
                <div className="founder-photo relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-surface">
                  <img
                    src={f.photo}
                    srcSet={`${f.photo.replace(".webp", "-520.webp")} 520w, ${f.photo} 900w`}
                    sizes="(min-width: 1024px) 260px, 45vw"
                    alt={`${f.name}, co-founder of FlowHQ`}
                    decoding="async"
                    width={f.w}
                    height={f.h}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: f.face, transformOrigin: f.face }}
                  />
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
            sub="We're Prachi Pathak and Vatsal Tripathi. We build automation systems for businesses losing hours to repetitive work — every workflow, WhatsApp flow, and dashboard on this page was built by us, on infrastructure our clients own. No sales team, no juniors, no outsourcing."
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
        <p className="mt-4 text-center text-[14.5px] text-muted">Meet the people behind FlowHQ.</p>
      </Reveal>
    </Section>
  );
}
