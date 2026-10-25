import { PRIMARY_CTA } from "@/lib/content";
import { CONTAINER } from "@/lib/layout";
import { HeroScene } from "./effects";
import HeroVisual from "./HeroVisual";
import { Button } from "./ui";

/* Hero: an oversized editorial headline beside the Zdog "flow engine", then the product window rising out of the fold.
   Entrance is pure CSS (.line-mask / .hero-rise in globals.css), so the headline paints before JavaScript (LCP):
   each headline line slides up inside its own mask — transform only, never opacity. */
const rd = (s: number) => ({ "--rd": `${s}s` }) as React.CSSProperties;

const OUTCOMES = ["Instant reply", "Appointment booked", "CRM updated", "Team notified"] as const;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-32">
      <div aria-hidden className="grain" />

      <div className={`${CONTAINER} relative`}>
        <div className="grid items-center gap-2 lg:grid-cols-[1.35fr_0.65fr] lg:gap-6">
          <div>
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
          </div>

          {/* the flow engine (decorative, drag to spin with a mouse) */}
          <div className="hero-rise relative mx-auto -mt-4 aspect-square w-full max-w-[300px] sm:max-w-[380px] lg:mt-0 lg:max-w-[460px]" style={rd(0.35)}>
            <HeroScene />
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
            <Button size="lg" href={PRIMARY_CTA.href} {...(PRIMARY_CTA.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {PRIMARY_CTA.label}
            </Button>
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
      </div>

      {/* the product, rising out of the fold */}
      <div className={`${CONTAINER} relative mt-12 md:mt-20`}>
        <div className="hero-rise theme-ink relative overflow-hidden rounded-[24px] p-3 pt-4 sm:p-5 md:rounded-[32px] md:p-8 lg:p-10" style={rd(0.4)}>
          <div className="mb-4 flex items-center justify-between gap-4 px-1 md:mb-6">
            <p className="text-[14px] font-medium text-text md:text-[15px]">
              One pipeline for every channel <span className="text-subtle">— this is what you get.</span>
            </p>
            <span className="label hidden items-center gap-2 text-[10px] text-subtle sm:inline-flex">
              <span className="feed-dot" /> Live sample
            </span>
          </div>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
