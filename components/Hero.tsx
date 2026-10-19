import { PRIMARY_CTA } from "@/lib/content";
import HeroVisual from "./HeroVisual";
import { Button } from "./ui";
import { CONTAINER } from "@/lib/layout";

/* Headline options (pick one; swap the text in the <h1> below):
     A (current)  "Never lose a lead again."
     B            "Every lead captured. Every follow-up sent."
     C            "Your leads, followed up in seconds. Automatically."
   Entrance: pure CSS (.hero-rise / .hero-lift in globals.css), so the headline paints before JavaScript (LCP).
   The hero is content-height (not full-screen): copy left, product visual right; stacked on phones. */
const rd = (s: number) => ({ "--rd": `${s}s` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-[96px] md:pt-[112px] lg:pb-24">
      {/* hero-only texture: warm glow, faint line grid, fine noise */}
      <div aria-hidden className="pointer-events-none absolute left-[62%] top-[34%] h-[620px] w-[min(1100px,170vw)] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(closest-side, rgba(234,106,47,0.07), transparent)" }} />
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-noise pointer-events-none absolute inset-0" />

      <div className={`${CONTAINER} relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14`}>
        <div>
          <p className="hero-rise label inline-flex items-center gap-2.5 text-accent" style={rd(0.05)}>
            <span aria-hidden className="h-px w-6 bg-accent/70" /> Not just AI. Systems that work.
          </p>
          <h1 className="hero-lift display mt-4 text-balance text-[clamp(2.5rem,6vw,4.5rem)] text-text" style={{ fontWeight: 700, lineHeight: 1.04, ...rd(0) }}>
            Never lose a <span className="text-accent">lead</span> again.
          </h1>
          <p className="hero-lift mt-4 max-w-[34rem] text-[16px] leading-[1.65] text-muted md:mt-5 md:text-[18px] md:leading-[1.7]" style={rd(0.1)}>
            We build AI systems that capture enquiries from your website, WhatsApp, Instagram and calls — then follow up, book, and update
            your CRM automatically.
          </p>
          <div className="hero-rise mt-6 grid grid-cols-2 gap-3 sm:flex sm:items-center md:mt-8" style={rd(0.2)}>
            <Button
              size="md"
              href={PRIMARY_CTA.href}
              className="px-3 sm:h-12 sm:px-7 sm:text-[15px]"
              {...(PRIMARY_CTA.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {PRIMARY_CTA.label}
            </Button>
            <Button size="md" variant="ghost" arrow={null} href="#try-it" className="px-3 sm:h-12 sm:px-7 sm:text-[15px]">
              See it in action
            </Button>
          </div>
        </div>

        <div className="hero-rise" style={rd(0.3)}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
