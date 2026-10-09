import localFont from "next/font/local";
import AutopilotWord from "./AutopilotWord";
import { Button, Magnetic } from "./ui";

/* Hero-only typefaces (files + licences in ./fonts). Preloaded on the homepage; metric-matched fallbacks avoid layout shift. */
const grotesk = localFont({ src: "./fonts/space-grotesk-latin-700-normal.woff2", weight: "700", display: "swap" });
const inter = localFont({ src: "./fonts/inter-latin-400-normal.woff2", weight: "400", display: "swap" });
const mono = localFont({
  src: "./fonts/jetbrains-mono-latin-500-normal.woff2",
  weight: "500",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

/* Entrance: pure CSS (.hero-rise / .hero-lift / .ap in globals.css), so the headline paints before JavaScript loads (LCP).
   Order of events: headline + copy settle → the aircraft uncovers "autopilot." → the feed settles in last. */
const rise = (delay: number) => ({ style: { "--rd": `${delay}s` } as React.CSSProperties });

/* Illustrative rows only: decorative texture, not live or customer data. */
const FEED = [
  ["14:02:11", "lead created"],
  ["14:02:14", "follow-up sent"],
  ["14:02:19", "booking confirmed"],
  ["14:02:23", "CRM updated"],
] as const;

export default function Hero() {
  return (
    <section
      id="top"
      /* height: one screen. On short screens the floors keep the exact height the hero's content used to give it,
         so nothing below moves (non-overlapping width ranges, so the order of the classes doesn't matter) */
      className={[
        "relative flex flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#140d09_0%,#110b08_60%)] px-5 pb-32 pt-24 md:px-8 md:pt-32",
        "min-h-[max(100svh,729px)] max-[339px]:min-h-[max(100svh,755px)] md:max-lg:min-h-[max(100svh,617px)] lg:max-[1134px]:min-h-[max(100svh,600px)]",
        "min-[1135px]:max-xl:min-h-[max(100svh,674px)] xl:max-[1439px]:min-h-[max(100svh,689px)] min-[1440px]:min-h-[max(100svh,698px)]",
        /* extra room under the CTAs for the feed, wherever that still fits inside the floors above */
        "md:max-lg:pb-24 lg:max-[1134px]:pb-12 min-[1135px]:pb-24",
      ].join(" ")}
    >
      {/* the hero fades into the next section instead of ending on an edge (and softens the feed on the way out) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-b from-transparent to-[#110b08]" />

      <div className="relative mx-auto w-full max-w-[1140px]">
        <div className="relative z-[3] mx-auto flex max-w-[1040px] flex-col items-center text-center">
          {/* one H1: the keyword line (styled as the eyebrow) + the promise */}
          <h1 className="text-text">
            <span
              className="hero-rise flex items-center justify-center gap-3 text-[11.5px] uppercase text-accent-2"
              style={{ ...mono.style, fontWeight: 500, letterSpacing: "0.2em", "--rd": "0.05s" } as React.CSSProperties}
            >
              <span aria-hidden className="hidden h-px w-6 bg-text/20 sm:block" /> Custom AI + automation systems{" "}
              <span aria-hidden className="hidden h-px w-6 bg-text/20 sm:block" />
            </span>
            <span
              className="hero-lift mx-auto mt-5 block md:mt-6 max-w-[13ch] text-balance text-[clamp(2.8rem,1.6rem+6vw,6.25rem)] lg:max-w-none"
              style={{ ...grotesk.style, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.0, "--rd": "0s" } as React.CSSProperties}
            >
              Put your business on <AutopilotWord />
            </span>
          </h1>

          <p
            className="hero-lift mt-6 max-w-[600px] md:mt-7 text-balance text-[1.125rem] leading-[1.7] text-text/70"
            style={{ ...inter.style, fontWeight: 400, "--rd": "0.1s" } as React.CSSProperties}
          >
            We build custom AI and automation systems that handle repetitive work, connect your tools and keep your business moving — so
            you can focus on growth.
          </p>

          <div {...rise(0.2)} className="hero-rise mt-8 flex md:mt-9 flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Magnetic strength={0.2} max={6}>
              <Button size="lg" href="#audit">
                Get My Free Audit
              </Button>
            </Magnetic>
            <Magnetic strength={0.2} max={6}>
              <a
                href="#workflow"
                className="group inline-flex min-h-11 items-center gap-2 text-[15px] text-text underline decoration-transparent underline-offset-[6px] transition-colors hover:decoration-text/50 focus-visible:outline-text/70!"
              >
                See How It Works
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* background texture: one dim, upright log feed hanging below the CTAs (out of flow, so it never changes the hero's height) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full z-[1] flex justify-center pt-12 md:pt-14">
          <div
            className="hero-rise w-full max-w-[400px] rounded-[10px] border border-text/12 bg-[rgba(9,6,4,0.6)] px-5 py-4 [mask-image:linear-gradient(to_bottom,#000_40%,transparent_100%)] md:px-6"
            style={{ ...mono.style, fontWeight: 500, "--rd": "0.35s" } as React.CSSProperties}
          >
            <ul className="space-y-1.5 text-[12px] leading-[1.9] md:text-[12.5px]">
              {FEED.map(([t, e]) => (
                <li key={t} className="flex gap-5 whitespace-nowrap">
                  <span className="text-text/25">{t}</span>
                  <span className="text-text/45">{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
