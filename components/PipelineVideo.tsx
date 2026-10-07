"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Reveal, Section } from "./ui";

const SRC = "/pipeline-video.mp4"; // H.264: Safari, Chrome, Edge, Firefox
const SRC_WEBM = "/pipeline-video.webm"; // VP9 fallback for browsers built without H.264
const POSTER = "/pipeline-video-poster.jpg"; // the video's first frame

/** "Watch it in motion": the 30s pipeline video, silent autoplay loop, click to pause/play. */
export default function PipelineVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [flash, setFlash] = useState(0); // bumps on every toggle to replay the centre icon

  // React sets `muted` as a property, not an attribute, so the static HTML lacks it and
  // iOS Safari would refuse to autoplay. Force it on the element and start playback.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
    setFlash((n) => n + 1);
  };

  return (
    <Section id="pipeline-video" grid="soft" className="bg-[#100a07]">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="label inline-flex items-center gap-2.5 text-accent">
            <span className="h-px w-6 bg-accent/70" />
            WATCH IT IN MOTION
            <span className="h-px w-6 bg-accent/70" />
          </span>
        </Reveal>
        <Reveal delay={0.07}>
          <h2 className="display mt-4 text-balance text-[clamp(2.25rem,4.4vw,3.5rem)] text-text">The pipeline, live.</h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-5 max-w-[34rem] text-[16px] leading-[1.75] text-muted md:text-[17px]">
            Thirty seconds: enquiry to customer, on autopilot.
          </p>
        </Reveal>
      </div>

      {/* full-bleed on mobile (cancels the section's 20px gutter), centred 960px card from md up */}
      <Reveal className="-mx-5 mt-10 md:mx-auto md:mt-12 md:max-w-[960px]">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="group relative block aspect-video w-full cursor-pointer overflow-hidden border-y border-accent/30 bg-bg shadow-[0_0_44px_-10px_rgba(234,106,47,0.4)] md:rounded-2xl md:border"
        >
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            poster={POSTER}
            autoPlay
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
            <source src={SRC} type="video/mp4" />
            <source src={SRC_WEBM} type="video/webm" />
          </video>
          {/* inner hairline so the glow reads as a border */}
          <span aria-hidden className="pointer-events-none absolute inset-0 md:rounded-2xl md:shadow-[inset_0_0_0_1px_rgba(234,106,47,0.12)]" />

          {/* centre icon: flashes on toggle, stays while paused */}
          <span
            key={flash}
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border-bright bg-bg/70 text-text backdrop-blur-sm transition-opacity duration-300 md:h-16 md:w-16",
              playing ? (flash ? "pv-flash" : "opacity-0") : "opacity-100"
            )}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 md:h-6 md:w-6" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z" /></svg>
            )}
          </span>
        </button>
      </Reveal>
      <style>{`@keyframes pv-flash{0%{opacity:1}70%{opacity:1}100%{opacity:0}}.pv-flash{animation:pv-flash .7s ease forwards}`}</style>
    </Section>
  );
}
