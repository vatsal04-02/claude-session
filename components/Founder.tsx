import { Check } from "lucide-react";
import { FOUNDER_NUMBERS, FOUNDER_PREFILL, waUrl } from "@/lib/whatsapp";
import { Reveal } from "./ui";
import { BAND, CONTAINER } from "@/lib/layout";

const FOUNDERS = [
  // face: where the face sits in the photo (x% y%) — the crop zooms in around it
  { name: "Prachi Pathak", first: "Prachi", photo: "/founder-prachi.webp", face: "50% 40%", number: FOUNDER_NUMBERS.prachi },
  { name: "Vatsal Tripathi", first: "Vatsal", photo: "/founder-vatsal.webp", face: "50% 40%", number: FOUNDER_NUMBERS.vatsal, filter: "contrast(1.04)" },
] as const;

const PLEDGE = [
  ["You own everything", "The system, the data and the accounts."],
  ["A fixed quote", "Agreed before we start. No hourly billing."],
  ["You talk to the builder", "No account managers in between."],
] as const;

/** Founders + pledge: big portraits beside the promise. */
export default function Founder() {
  return (
    <section id="founders" className={BAND}>
      <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20`}>
        <Reveal>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {FOUNDERS.map((f, i) => (
              <figure key={f.name} className={i === 1 ? "mt-10 md:mt-16" : undefined}>
                <div className="founder-photo relative aspect-[3/4] overflow-hidden rounded-[24px] bg-surface-2">
                  <img
                    src={f.photo}
                    srcSet={`${f.photo.replace(".webp", "-520.webp")} 520w, ${f.photo} 900w`}
                    sizes="(min-width: 1024px) 300px, 45vw"
                    alt={`${f.name}, co-founder of Flow HQ`}
                    decoding="async"
                    width={900}
                    height={1200}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: f.face, transformOrigin: f.face, ...("filter" in f ? { filter: f.filter } : {}) }}
                  />
                </div>
                <figcaption className="mt-4">
                  <div className="display text-[20px] text-text md:text-[22px]" style={{ letterSpacing: "-0.03em" }}>
                    {f.name}
                  </div>
                  <a
                    href={waUrl(f.number, FOUNDER_PREFILL)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-1.5 text-[14.5px] font-medium text-[#147a3a] transition-opacity hover:opacity-80"
                  >
                    Chat with {f.first}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="kicker">
            <span className="kicker-n">06</span> The founders
          </span>
          <h2 className="display mt-5 text-balance text-[clamp(2.4rem,5vw,4.25rem)] text-text">
            You work with the people who <em>build</em> it.
          </h2>
          <p className="mt-5 max-w-[34rem] text-[16px] leading-[1.65] text-muted md:text-[18px]">
            Flow HQ is run by Prachi Pathak and Vatsal Tripathi in Lucknow. We build every system ourselves.
          </p>
          <ul className="mt-8 border-b border-border">
            {PLEDGE.map(([t, d]) => (
              <li key={t} className="flex items-start gap-4 border-t border-border py-4">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-signal text-ink">
                  <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-[16px] leading-[1.5] text-text md:text-[17px]">
                  <span className="font-semibold">{t}.</span> <span className="text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
