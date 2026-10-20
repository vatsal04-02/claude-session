import { Quote } from "lucide-react";
import { VISIBLE_REVIEWS } from "@/lib/content";
import { BAND, CONTAINER } from "@/lib/layout";
import { Reveal, SectionHeading } from "./ui";

/** Client reviews from lib/content.ts (production shows only finished ones). No star ratings: we don't invent scores. */
export default function Reviews() {
  if (!VISIBLE_REVIEWS.length) return null;
  return (
    <section id="reviews" className={`${BAND} !pt-0`}>
      <div className={CONTAINER}>
        <SectionHeading eyebrow="Reviews" title="What people say about Flow HQ." />
        {/* phones: swipe row; md+: grid */}
        <ul
          tabIndex={0}
          aria-label="Reviews"
          className="no-scrollbar -mx-6 mt-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
        >
          {VISIBLE_REVIEWS.map((r, i) => (
            <li key={r.name} className="w-[86%] shrink-0 snap-start md:w-auto">
              <Reveal delay={i * 0.06} className="flex h-full flex-col rounded-[14px] border border-border bg-surface/60 p-5 md:p-6">
                <figure className="flex h-full flex-col">
                <Quote aria-hidden className="h-5 w-5 text-accent-2" />
                <blockquote className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-text/90 md:text-[15px]">“{r.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.07] text-[14px] font-semibold text-muted">
                    {r.name.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold leading-tight text-text">{r.name}</span>
                    <span className="mt-0.5 block text-[13px] text-subtle">
                      {r.role}
                      {r.company ? ` · ${r.company}` : ""}
                    </span>
                  </span>
                </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="label mt-3 text-[10px] text-subtle md:hidden">Swipe →</p>
      </div>
    </section>
  );
}
