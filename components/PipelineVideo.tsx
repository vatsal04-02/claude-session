"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Reveal, Section } from "./ui";

const SRC = "/pipeline-video.mp4"; // H.264: Safari, Chrome, Edge, Firefox
const SRC_WEBM = "/pipeline-video.webm"; // VP9 fallback for browsers built without H.264
const POSTER = "/pipeline-video-poster.jpg"; // the video's first frame

/** "Watch it in motion": the 30s pipeline video. Autoplays muted in a loop (browsers block autoplay
    with sound); click to pause/play, and the sound button turns the voiceover on from the start. */
export default function PipelineVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [flash, setFlash] = useState(0); // bumps on every toggle to replay the centre icon
  const [muted, setMuted] = useState(true);

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

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      v.currentTime = 0; // the voiceover only makes sense from the top
      v.play().catch(() => {});
    } else {
      v.muted = true;
    }
    setMuted(v.muted);
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
            A day in your business, with the system on autopilot.
          </p>
        </Reveal>
      </div>

      {/* full-bleed on mobile (cancels the section's 20px gutter), centred 960px card from md up */}
      <Reveal className="relative -mx-5 mt-10 md:mx-auto md:mt-12 md:max-w-[960px]">
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
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
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

        {/* sound toggle: a sibling of the play/pause button, not nested in it */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Mute"}
          aria-pressed={!muted}
          className={cn(
            "absolute right-3 top-3 z-10 inline-flex h-10 items-center gap-2 rounded-full border bg-bg/75 px-3.5 text-[13px] font-medium text-text backdrop-blur-sm transition-[border-color,color,box-shadow] duration-300 md:right-4 md:top-4 md:h-11 md:px-4 md:text-[14px]",
            muted
              ? "border-accent/60 shadow-[0_0_20px_-4px_rgba(234,106,47,0.55)] hover:border-accent"
              : "border-border-bright hover:border-accent/60 hover:text-accent"
          )}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[18px] md:w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="m22 9-6 6M16 9l6 6" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[18px] md:w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
          )}
          <span>{muted ? "Sound on" : "Mute"}</span>
        </button>
      </Reveal>
      <style>{`@keyframes pv-flash{0%{opacity:1}70%{opacity:1}100%{opacity:0}}.pv-flash{animation:pv-flash .7s ease forwards}`}</style>
    </Section>
  );
}
