import { PRIMARY_CTA } from "@/lib/content";
import { CONTAINER } from "@/lib/layout";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { HeroScene } from "./effects";
import HeroVisual from "./HeroVisual";
import { DepthField, DepthLayer, Float, Parallax, ScrollTiltIn } from "./motion-fx";
import { Button, Magnetic } from "./ui";

/* Hero: an oversized editorial headline beside the Zdog "flow engine", then the product window rising out of the fold.
   Entrance is pure CSS (.line-mask / .hero-rise in globals.css), so the headline paints before JavaScript (LCP):
   each headline line slides up inside its own mask — transform only, never opacity. */
const rd = (s: number) => ({ "--rd": `${s}s` }) as React.CSSProperties;

const OUTCOMES = ["Instant reply", "Appointment booked", "CRM updated", "Team notified"] as const;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-32">
      <div aria-hidden className="grain" />
      {/* background depth: a big soft disc and a ring drifting slower than the page */}
      <Parallax speed={-60} className="pointer-events-none absolute -right-[18vw] -top-[10vw] h-[52vw] max-h-[760px] w-[52vw] max-w-[760px]">
        <div aria-hidden className="h-full w-full rounded-full bg-signal/[0.09]" />
      </Parallax>
      <Parallax speed={-30} className="pointer-events-none absolute -left-[300px] top-[8%] hidden h-[420px] w-[420px] xl:block">
        <div aria-hidden className="h-full w-full rounded-full border border-border" />
      </Parallax>

      <DepthField className={`${CONTAINER} relative`}>
        <div className="grid items-center gap-2 lg:grid-cols-[1.35fr_0.65fr] lg:gap-6">
          <DepthLayer depth={-6}>
            <p className="hero-rise kicker" style={rd(0.05)}>
              <span className="kicker-n">Lucknow · India</span> Not just AI. Systems that work.
            </p>
            <h1 className="display mt-6 text-[clamp(3.75rem,11.5vw,10rem)] text-text md:mt-8" style={{ lineHeight: 0.9, letterSpacing: "-0.045em", wordSpacing: "0.04em" }}>
              <span className="line-mask">
                <span style={rd(0)}>Never lose</span>
              </span>
              <span className="line-mask">
                <span style={rd(0.08)}>
                  a <em>lead</em> again.
                </span>
              </span>
            </h1>
          </DepthLayer>

          {/* the flow engine (decorative, drag to spin with a mouse) + floating notifications at different depths */}
          <div className="hero-rise relative mx-auto -mt-4 aspect-square w-full max-w-[300px] sm:max-w-[380px] lg:mt-0 lg:max-w-[460px]" style={rd(0.35)}>
            <DepthLayer depth={14} className="h-full w-full">
              <HeroScene />
            </DepthLayer>
            <DepthLayer depth={34} className="pointer-events-none absolute -left-4 top-[6%] sm:-left-10">
              <Float distance={7}>
                <div aria-hidden className="elev flex items-center gap-2.5 rounded-[14px] bg-surface py-2 pl-2 pr-3.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-signal text-ink">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[12.5px] font-semibold text-text">New enquiry</span>
                    <span className="block text-[11px] text-subtle">WhatsApp · just now</span>
                  </span>
                </div>
              </Float>
            </DepthLayer>
            <DepthLayer depth={24} className="pointer-events-none absolute -right-2 bottom-[10%] sm:-right-6">
              <Float distance={9} delay={1.2}>
                <div aria-hidden className="flex items-center gap-2.5 rounded-[14px] bg-ink py-2 pl-2 pr-3.5 shadow-[0_18px_40px_-18px_rgba(23,18,14,0.7)]">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 text-signal">
                    <CalendarCheck className="h-4 w-4" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[12.5px] font-semibold text-paper">Booked</span>
                    <span className="block text-[11px] text-paper/60">Sat · 10:30 AM</span>
                  </span>
                </div>
              </Float>
            </DepthLayer>
            <span aria-hidden className="label pointer-events-none absolute bottom-2 right-0 hidden text-[10px] text-subtle lg:block motion-reduce:!hidden">
              Drag to spin ↻
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-8 border-t border-border pt-8 md:mt-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <p className="hero-rise max-w-[38rem] text-[17px] leading-[1.6] text-muted md:text-[20px] md:leading-[1.55]" style={rd(0.15)}>
            We build AI systems that capture every enquiry from your website, WhatsApp, Instagram and calls — then{" "}
            <span className="text-text">follow up, book, and update your CRM</span> on their own.
          </p>
          <div className="hero-rise flex flex-col gap-3 sm:flex-row sm:items-center" style={rd(0.22)}>
            <Magnetic strength={0.3} max={10}>
              <Button size="lg" href={PRIMARY_CTA.href} className="w-full sm:w-auto" {...(PRIMARY_CTA.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {PRIMARY_CTA.label}
              </Button>
            </Magnetic>
            <Button size="lg" variant="ghost" arrow={null} href="#try-it">
              See it in action
            </Button>
          </div>
        </div>

        <ul aria-label="What happens to every enquiry" className="hero-rise mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-muted md:mt-10" style={rd(0.3)}>
          {OUTCOMES.map((o, i) => (
            <li key={o} className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
              {o}
            </li>
          ))}
        </ul>
      </DepthField>

      {/* the product, tilting up out of perspective as it scrolls in */}
      <div className={`${CONTAINER} relative mt-12 md:mt-20`}>
        <ScrollTiltIn className="theme-ink relative overflow-hidden rounded-[24px] p-3 pt-4 shadow-[0_60px_120px_-50px_rgba(23,18,14,0.55)] sm:p-5 md:rounded-[32px] md:p-8 lg:p-10">
          <div className="mb-4 flex items-center justify-between gap-4 px-1 md:mb-6">
            <p className="text-[14px] font-medium text-text md:text-[15px]">
              One pipeline for every channel <span className="text-subtle">— this is what you get.</span>
            </p>
            <span className="label hidden items-center gap-2 text-[10px] text-subtle sm:inline-flex">
              <span className="feed-dot" /> Live sample
            </span>
          </div>
          <HeroVisual />
        </ScrollTiltIn>
      </div>
    </section>
  );
}
