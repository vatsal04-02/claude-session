import HeroFlow from "./HeroFlow";
import { Ambient, Button, Magnetic } from "./ui";

/* Entrance: pure CSS (.hero-rise in globals.css), so the headline paints before JavaScript loads (LCP). */
const rise = (delay: number) => ({ style: { "--rd": `${delay}s` } as React.CSSProperties });

const SERVICE_LINKS = [
  { label: "AI automation", href: "/ai-automation/" },
  { label: "Workflow automation", href: "/workflow-automation/" },
  { label: "Process automation", href: "/business-process-automation/" },
  { label: "WhatsApp automation", href: "/whatsapp-automation/" },
];

export default function Hero() {
  return (
    <section id="top" className="hero-atmos relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
      {/* quiet background: faint dot texture, one warm light, a couple of ambient details */}
      <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.7 } as React.CSSProperties} />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%] h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(234,106,47,0.055)] blur-[140px]" />
      <Ambient className="-left-40 top-24 hidden h-[420px] w-[420px] md:block" />
      <Ambient className="-right-48 top-[52%] hidden h-[520px] w-[520px] rotate-90 md:block" />

      <div className="relative mx-auto max-w-[1140px]">
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
              Put your business on <span className="text-accent">autopilot.</span>
            </span>
          </h1>

          <p {...rise(0.1)} className="hero-lift mt-7 max-w-[620px] text-balance text-[17.5px] leading-[1.65] text-muted md:text-[19px]">
            We build custom AI and automation systems that handle repetitive work, connect your tools and keep your business moving — so
            you can focus on growth.
          </p>

          <div {...rise(0.62)} className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
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

        {/* the one visual hook: PHONE → AI → CALENDAR */}
        <div {...rise(0.6)} className="hero-rise mt-14 md:mt-16">
          <HeroFlow />
        </div>

        <nav aria-label="Automation services" {...rise(0.72)} className="hero-rise label mt-12 flex flex-wrap justify-center gap-x-4 gap-y-1 text-subtle sm:gap-x-2 md:mt-14">
          {SERVICE_LINKS.map((l, i) => (
            <span key={l.href} className="inline-flex items-center gap-2" style={{ fontSize: 10.5, letterSpacing: "0.1em" }}>
              {i > 0 && <span aria-hidden className="hidden sm:inline">·</span>}
              <a href={l.href} className="inline-flex min-h-6 items-center underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/60">
                {l.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
