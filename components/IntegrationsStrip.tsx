import { BRAND_ICONS } from "./brand-icons";
import { CONTAINER } from "@/lib/layout";

/** "Works with": an endless marquee of the tools we connect (simple-icons paths, see brand-icons.ts).
    Two identical sets slide by half their width for a seamless loop; hover pauses it. Reduced motion: one static, wrapping row. */
export default function IntegrationsStrip() {
  const set = (dup: boolean) => (
    <ul aria-hidden={dup || undefined} className={`flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16 ${dup ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6"}`}>
      {BRAND_ICONS.map((b) => (
        <li key={b.name} className="flex items-center gap-3 text-text/70 transition-colors duration-200 hover:text-text">
          <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 shrink-0 fill-current md:h-7 md:w-7">
            <path d={b.path} />
          </svg>
          <span className="display whitespace-nowrap text-[22px] md:text-[28px]" style={{ letterSpacing: "-0.035em" }}>
            {b.name}
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Integrations" className="relative pb-4 pt-14 md:pt-20">
      <div className={`${CONTAINER} mb-6 flex items-end justify-between gap-6 md:mb-8`}>
        <p className="kicker">Plugs into the tools you already use</p>
        <p className="hidden text-[13.5px] text-subtle md:block">Anything with an API or webhook, too.</p>
      </div>
      <div className="relative overflow-hidden border-y border-border py-6 md:py-8 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max animate-marquee motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          {set(false)}
          {set(true)}
        </div>
      </div>
    </section>
  );
}
