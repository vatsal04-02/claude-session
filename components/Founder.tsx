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

/** Founders + pledge: one compact block. */
export default function Founder() {
  return (
    <section id="founders" className={BAND}>
      <div className={CONTAINER}>
      <div className="grid items-center gap-8 rounded-[14px] border border-border bg-surface/50 p-5 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-10">
        <Reveal>
          <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-4 lg:mx-0">
            {FOUNDERS.map((f) => (
              <figure key={f.name}>
                <div className="founder-photo relative aspect-[3/4] overflow-hidden rounded-[10px] border border-border bg-surface">
                  <img
                    src={f.photo}
                    srcSet={`${f.photo.replace(".webp", "-520.webp")} 520w, ${f.photo} 900w`}
                    sizes="(min-width: 1024px) 200px, 40vw"
                    alt={`${f.name}, co-founder of Flow HQ`}
                    decoding="async"
                    width={900}
                    height={1200}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: f.face, transformOrigin: f.face, ...("filter" in f ? { filter: f.filter } : {}) }}
                  />
                </div>
                <figcaption className="mt-3">
                  <div className="text-[15px] font-semibold text-text">{f.name}</div>
                  <a
                    href={waUrl(f.number, FOUNDER_PREFILL)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-1.5 text-[14px] text-[#25D366] transition-opacity hover:opacity-80"
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
          <span className="label inline-flex items-center gap-2.5 text-accent">
            <span aria-hidden className="h-px w-6 bg-accent/70" /> The founders
          </span>
          <h2 className="display mt-4 text-balance text-[clamp(1.9rem,3.4vw,2.75rem)] text-text">You work with the people who build it.</h2>
          <p className="mt-3 max-w-[34rem] text-[15.5px] leading-[1.65] text-muted md:text-[17px]">
            Flow HQ is run by Prachi Pathak and Vatsal Tripathi in Lucknow. We build every system ourselves.
          </p>
          <ul className="mt-5 space-y-3.5">
            {PLEDGE.map(([t, d]) => (
              <li key={t} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent/10 text-accent">
                  <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-[16px] leading-[1.5] text-text">
                  <span className="font-semibold">{t}.</span> <span className="text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
