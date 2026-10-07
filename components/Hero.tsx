import AutopilotWord from "./AutopilotWord";
import HeroBackground from "./HeroBackground";
import { Ambient, Button, Magnetic } from "./ui";

/* Entrance: pure CSS (.hero-rise / .hero-lift / .ap in globals.css), so the headline paints before JavaScript loads (LCP).
   Order of events: headline + copy settle → the aircraft uncovers "autopilot." → the transition line arrives as it leaves. */
const rise = (delay: number) => ({ style: { "--rd": `${delay}s` } as React.CSSProperties });

export default function Hero() {
  return (
    <section id="top" className="hero-atmos relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-12 pt-28 md:px-8 md:pb-14 md:pt-32">
      {/* quiet background: faint dot texture, one warm light, a couple of ambient details */}
      {/* animated automation dashboard behind everything (poster first, video after load) */}
      <HeroBackground />
      <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.35 } as React.CSSProperties} />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%] h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(234,106,47,0.055)] blur-[140px]" />
      <Ambient className="-left-40 top-24 hidden h-[420px] w-[420px] md:block" />
      <Ambient className="-right-48 top-[52%] hidden h-[520px] w-[520px] rotate-90 md:block" />
      {/* the atmosphere fades into the next section instead of ending on an edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#110b08]" />

      <div className="relative mx-auto w-full max-w-[1140px]">
        <div className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
          {/* one H1: the keyword line (styled as the eyebrow) + the promise */}
          <h1 className="text-text">
            <span
              className="hero-rise label flex items-center justify-center gap-3 font-normal text-accent-2"
              style={{ letterSpacing: "0.18em", "--rd": "0.05s" } as React.CSSProperties}
            >
              <span aria-hidden className="hidden h-px w-6 bg-accent sm:block" /> Custom AI + automation systems{" "}
              <span aria-hidden className="hidden h-px w-6 bg-accent sm:block" />
            </span>
            <span
              className="hero-lift display mx-auto mt-6 block max-w-[13ch] text-balance text-[clamp(2.75rem,6.4vw,5.4rem)] lg:max-w-none"
              style={{ fontWeight: 780, lineHeight: 1.0, "--rd": "0s" } as React.CSSProperties}
            >
              Put your business on <AutopilotWord />
            </span>
          </h1>

          <p {...rise(0.1)} className="hero-lift mt-7 max-w-[620px] text-balance text-[17.5px] leading-[1.65] text-muted md:text-[19px]">
            We build custom AI and automation systems that handle repetitive work, connect your tools and keep your business moving — so
            you can focus on growth.
          </p>

          <div {...rise(0.2)} className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Magnetic strength={0.2} max={6}>
              <Button size="lg" href="#audit">
                Get My Free Audit
              </Button>
            </Magnetic>
            <Magnetic strength={0.2} max={6}>
              <a
                href="#workflow"
                className="group inline-flex min-h-11 items-center gap-2 text-[15px] text-text underline decoration-transparent underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent/60"
              >
                See How It Works
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
          </div>

        </div>

        {/* the hand-off to the rest of the page: work flows down into the live pipeline below */}
        <div {...rise(1.1)} className="hero-rise mt-14 flex flex-col items-center md:mt-16">
          <p className="text-balance text-center text-[clamp(1.3rem,2.1vw,1.62rem)] font-semibold leading-[1.25] tracking-[-0.015em] text-text">
            Work in. <span className="text-accent-2">Automation takes over.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
