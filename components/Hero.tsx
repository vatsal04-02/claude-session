import { PRIMARY_CTA } from "@/lib/content";
import LeadInbox from "./LeadInbox";
import { Button } from "./ui";

/* Headline options (pick one; swap the text in the <h1> below):
     A (current)  "Never lose a lead again."
     B            "Every lead captured. Every follow-up sent."
     C            "Your leads, followed up in seconds. Automatically."
   Entrance: pure CSS (.hero-rise / .hero-lift in globals.css), so the headline paints before JavaScript (LCP). */
const rd = (s: number) => ({ "--rd": `${s}s` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[30%] h-[560px] w-[min(1100px,170vw)] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(closest-side, rgba(234,106,47,0.05), transparent)" }}
      />
      <div className="relative mx-auto grid max-w-[1140px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <p className="hero-rise label inline-flex items-center gap-2.5 text-accent" style={rd(0.05)}>
            <span aria-hidden className="h-px w-6 bg-accent/70" /> Not just AI. Systems that work.
          </p>
          <h1
            className="hero-lift display mt-5 text-balance text-[clamp(2.5rem,6vw,4.5rem)] text-text"
            style={{ fontWeight: 700, lineHeight: 1.04, ...rd(0) }}
          >
            Never lose a <span className="text-accent">lead</span> again.
          </h1>
          <p className="hero-lift mt-6 max-w-[34rem] text-[17px] leading-[1.7] text-muted md:text-[18px]" style={rd(0.1)}>
            We build AI systems that capture enquiries from your website, WhatsApp, Instagram and calls — then follow up, book, and update
            your CRM automatically.
          </p>
          <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={rd(0.2)}>
            <Button
              size="lg"
              href={PRIMARY_CTA.href}
              className="w-full sm:w-auto"
              {...(PRIMARY_CTA.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {PRIMARY_CTA.label}
            </Button>
            <Button size="lg" variant="ghost" arrow={null} href="#try-it" className="w-full sm:w-auto">
              See it in action
            </Button>
          </div>
        </div>

        <div className="hero-rise" style={rd(0.3)}>
          <LeadInbox />
        </div>
      </div>
    </section>
  );
}
