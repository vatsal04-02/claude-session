import { VISIBLE_REVIEWS } from "@/lib/content";
import { BAND, CONTAINER } from "@/lib/layout";
import { Rise3D } from "./motion-fx";
import { SectionHeading } from "./ui";

/** Client reviews from lib/content.ts (production shows only finished ones). No star ratings: we don't invent scores. */
export default function Reviews() {
  if (!VISIBLE_REVIEWS.length) return null;
  return (
    <section id="reviews" className={BAND}>
      <div className={CONTAINER}>
        <SectionHeading
          index="04"
          eyebrow="Reviews"
          title={
            <>
              What people <em>say</em>.
            </>
          }
        />
        {/* phones: swipe row; md+: grid */}
        <ul
          tabIndex={0}
          aria-label="Reviews"
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-16 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
        >
          {VISIBLE_REVIEWS.map((r, i) => (
            <li key={r.name} className="w-[86%] shrink-0 snap-start md:w-auto">
              <Rise3D delay={i * 0.08} className="h-full">
              <div
                className={`elev elev-hover flex h-full flex-col rounded-[24px] p-6 md:p-8 md:hover:!rotate-0 ${i === 1 ? "theme-ink md:translate-y-6 md:rotate-[1.2deg]" : `border border-border bg-surface ${i === 0 ? "md:rotate-[-1.2deg]" : "md:rotate-[0.8deg]"}`}`}
              >
                <figure className="flex h-full flex-col">
                  <span aria-hidden className="font-serif text-[88px] italic leading-[0.6] text-signal">“</span>
                  <blockquote className="mt-4 flex-1 text-[15.5px] leading-[1.7] text-text md:text-[16px]">{r.quote}</blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                    <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-signal font-display text-[16px] font-bold text-ink">
                      {r.name.slice(0, 1)}
                    </span>
                    <span>
                      <span className="block text-[15.5px] font-semibold leading-tight text-text">{r.name}</span>
                      <span className="mt-0.5 block text-[13.5px] text-subtle">
                        {r.role}
                        {r.company ? ` · ${r.company}` : ""}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </div>
              </Rise3D>
            </li>
          ))}
        </ul>
        <p className="label mt-3 text-[10px] text-subtle md:hidden">Swipe →</p>
      </div>
    </section>
  );
}
