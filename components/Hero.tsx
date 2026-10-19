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
   Order of events: headline + copy settle → the aircraft uncovers "autopilot." → the feed card settles in last. */
const rise = (delay: number) => ({ style: { "--rd": `${delay}s` } as React.CSSProperties });

/* Illustrative rows only: generic event types, not customer data or real activity. */
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
      /* top padding clears the floating nav (72px phones / 88px desktop); on tall screens the extra bottom padding lifts the centred
         content a little, on short screens it stays small so the hero only grows as far as its content needs */
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#140d09_0%,#110b08_60%)] px-5 pb-14 pt-[84px] md:px-8 lg:pt-[100px] [@media(min-height:860px)]:pb-32"
    >
      {/* background: one faint warm glow behind the headline + an ultra-subtle line grid that fades out toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,220,200,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,220,200,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "center top",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 38%, #000 0%, transparent 78%)",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 38%, #000 0%, transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[34%] h-[620px] w-[min(1000px,160vw)] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(closest-side, rgba(234,106,47,0.055), transparent)" }}
      />
      {/* the hero fades into the next section instead of ending on an edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-b from-transparent to-[#110b08]" />

      <div className="relative z-[3] mx-auto flex w-full max-w-[1040px] flex-col items-center text-center">
        {/* one H1: the keyword line (styled as the eyebrow) + the promise */}
        <h1 className="text-text">
          <span
            className="hero-rise flex items-center justify-center gap-3 text-[11.5px] uppercase text-accent-2"
            style={{ ...mono.style, fontWeight: 500, letterSpacing: "0.2em", "--rd": "0.05s" } as React.CSSProperties}
          >
            <span aria-hidden className="hidden h-px w-6 bg-text/20 sm:block" /> Custom AI + automation systems{" "}
            <span aria-hidden className="hidden h-px w-6 bg-text/20 sm:block" />
          </span>
          {/* forced break after "on" so "autopilot." owns the second line (no orphaned "on"); balanced where the first line must wrap */}
          <span
            className="hero-lift mx-auto mt-4 block text-balance text-[clamp(2.8rem,1.6rem+6vw,6.25rem)]"
            style={{ ...grotesk.style, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.0, textWrap: "balance", "--rd": "0s" } as React.CSSProperties}
          >
            Put your business on <br />
            <AutopilotWord />
          </span>
        </h1>

        <p
          className="hero-lift mt-5 max-w-[600px] text-balance text-[17px] leading-[1.7]"
          style={{ ...inter.style, fontWeight: 400, color: "#C9C9CF", "--rd": "0.1s" } as React.CSSProperties}
        >
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
              className="inline-flex min-h-11 items-center text-[15px] text-text/75 underline decoration-transparent underline-offset-[6px] transition-colors hover:text-text hover:decoration-text/50 focus-visible:outline-text/70!"
            >
              See how it works
            </a>
          </Magnetic>
        </div>

        {/* decorative live-system card: dim but legible, upright, behind nothing it could block (aria-hidden, no pointer events) */}
        <div
          aria-hidden
          className="hero-rise pointer-events-none relative mt-9 w-full max-w-[340px] select-none md:mt-11"
          style={{ ...mono.style, fontWeight: 500, "--rd": "0.35s" } as React.CSSProperties}
        >
          <div
            className="absolute -inset-x-14 -inset-y-10 -z-10"
            style={{ background: "radial-gradient(closest-side, rgba(234,106,47,0.08), transparent)" }}
          />
          <div className="rounded-[10px] border border-[#26262B] bg-[rgba(10,7,5,0.78)] px-5 py-4 text-left">
            <div className="flex items-center gap-2 border-b border-[#26262B] pb-3 text-[11px] uppercase tracking-[0.16em] text-[#A8A8B0]">
              <span className="feed-dot" /> Live system
            </div>
            <ul className="mt-3 space-y-1.5 text-[13px] leading-[1.55] text-[#A8A8B0]">
              {FEED.map(([t, e]) => (
                <li key={t} className="flex gap-4 whitespace-nowrap">
                  <span>{t}</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
