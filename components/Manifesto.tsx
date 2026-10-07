import { SERVICES } from "@/lib/services";
import LivePipeline from "./LivePipeline";
import { Ambient, FocusReveal } from "./ui";

const SERVICE_LINKS = [
  ...SERVICES.map((x) => ({ label: x.nav, href: `/${x.slug}/` })),
  { label: "Industries", href: "/industries/" },
  { label: "Guides", href: "/resources/" },
];

/* The page's big statement, then the proof right underneath it: the live pipeline.
   Server component (the links are plain HTML); only the heading's focus-pull and the pipeline run on the client. */
export default function Manifesto() {
  return (
    <section id="pipeline" aria-labelledby="pipeline-title" className="relative overflow-x-clip bg-[#110b08] px-5 pb-8 pt-6 md:px-8 md:pb-14 md:pt-8">
      <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.35 } as React.CSSProperties} />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[58%] h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(234,106,47,0.05)] blur-[120px]" />
      <Ambient className="-left-44 top-[46%] hidden h-[440px] w-[440px] lg:block" />

      <div className="relative mx-auto max-w-[1140px]">
        <FocusReveal
          as="h2"
          id="pipeline-title"
          className="font-serif mx-auto max-w-[14ch] text-balance text-center text-[clamp(2.75rem,6vw,4.5rem)] leading-[1] tracking-[-0.015em] text-text md:max-w-none"
        >
          Less manual work<span className="text-accent">.</span>
        </FocusReveal>

        <div className="mt-14 md:mt-20">
          <LivePipeline />
        </div>

        <nav aria-label="Automation services" className="label mt-10 flex flex-wrap justify-center gap-x-4 gap-y-1 text-subtle sm:gap-x-2 md:mt-16">
          {SERVICE_LINKS.map((l, i) => (
            <span key={l.href} className="inline-flex items-center gap-2" style={{ fontSize: 10.5, letterSpacing: "0.1em" }}>
              {i > 0 && <span aria-hidden className="hidden sm:inline">·</span>}
              <a
                href={l.href}
                className="inline-flex min-h-6 items-center underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent/60"
              >
                {l.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
