import { CLIENTS, SHOW_PROOF, STATS } from "@/lib/content";
import Slot from "./Slot";
import { Reveal } from "./ui";
import { BAND, CONTAINER } from "@/lib/layout";

/** Social proof. Rendered only when every slot in lib/content.ts is filled (previews show the placeholders). */
export default function ProofStrip() {
  if (!SHOW_PROOF) return null;
  const cell = "bg-bg px-4 py-5 md:px-6 md:py-6";
  return (
    <section aria-labelledby="proof-title" className={`${BAND} !py-10 md:!py-14`}>
      <Reveal className={CONTAINER}>
        <h2 id="proof-title" className="label text-center text-[11px] text-subtle">
          Trusted by growing businesses in Lucknow
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-5">
          {CLIENTS.map((c, i) => (
            <div key={i} className={cell}>
              {c.logo ? (
                <img src={c.logo} alt={c.name} loading="lazy" decoding="async" className="h-7 w-auto max-w-full" />
              ) : (
                <div className="text-[16px] font-semibold text-text">
                  <Slot value={c.name} />
                </div>
              )}
              <div className="mt-1 text-[13px] text-muted">
                <Slot value={c.detail} />
              </div>
            </div>
          ))}
          {STATS.map((s, i) => (
            <div key={i} className={`${cell} ${i === STATS.length - 1 && STATS.length % 2 === 1 ? "col-span-2 md:col-span-1" : ""}`}>
              <div className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none tabular-nums text-accent">
                <Slot value={s.value} />
              </div>
              <div className="mt-2 text-[13px] leading-[1.4] text-muted">
                <Slot value={s.label} />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
