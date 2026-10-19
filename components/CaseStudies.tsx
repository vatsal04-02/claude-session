import { SHOW_CASES, SHOW_PLACEHOLDERS, VISIBLE_CASES } from "@/lib/content";
import Slot from "./Slot";
import { Reveal, SectionHeading } from "./ui";

/** Two case-study cards. Production shows only finished ones (all four text fields filled); previews show every card. */
export default function CaseStudies() {
  if (!SHOW_CASES) return null;
  return (
    <section id="work" className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeading eyebrow="Work" title="Work we've built." />
        <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2">
          {VISIBLE_CASES.map((c, i) => (
            <li key={c.label}>
              <Reveal delay={i * 0.08} className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60">
                {c.screenshot ? (
                  <img src={c.screenshot} alt={c.screenshotAlt ?? `${c.label} screenshot`} loading="lazy" decoding="async" className="aspect-[16/10] w-full border-b border-border object-cover" />
                ) : (
                  SHOW_PLACEHOLDERS && (
                    <div className="grid aspect-[16/10] w-full place-items-center border-b border-dashed border-warning/50 bg-warning/[0.04] text-[13px] text-warning" data-placeholder>
                      [SCREENSHOT]
                    </div>
                  )
                )}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="label w-fit rounded-full border border-border-bright px-2.5 py-1.5 text-[10px] leading-none text-muted">{c.label}</span>
                  <p className="mt-4 text-[15px] text-subtle">
                    <Slot value={c.clientType} />
                  </p>
                  <dl className="mt-4 space-y-4 text-[15.5px] leading-[1.6]">
                    <div>
                      <dt className="label text-[10px] text-subtle">Problem</dt>
                      <dd className="mt-1 text-muted">
                        <Slot value={c.problem} />
                      </dd>
                    </div>
                    <div>
                      <dt className="label text-[10px] text-subtle">What we built</dt>
                      <dd className="mt-1 text-muted">
                        <Slot value={c.built} />
                      </dd>
                    </div>
                    <div className="border-t border-border pt-4">
                      <dt className="label text-[10px] text-subtle">Result</dt>
                      <dd className="mt-1 text-[17px] font-semibold text-accent-2">
                        <Slot value={c.result} />
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
