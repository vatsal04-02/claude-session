"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { HOME_FAQS as FAQS } from "@/lib/faq";
import { WA_LINK } from "@/lib/whatsapp";
import { Reveal, Section, SectionHeading } from "./ui";



export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="bg-bg-soft !border-t-0">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="07" eyebrow="FAQ" title={<>Fair <em>questions</em>.</>} />
          <p className="mt-5 max-w-[34ch] text-[15.5px] leading-[1.65] text-muted">
            Something else on your mind?{" "}
            <a {...WA_LINK} className="font-medium text-text underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-accent">
              Ask us on WhatsApp
            </a>{" "}
            — it comes straight to the founders.
          </p>
        </div>
        <Reveal>
          <ul className="border-b border-border-bright">
            {FAQS.map(([q, a], i) => {
              const on = open === i;
              return (
                <li key={q} className="border-t border-border-bright">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(on ? null : i)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-[19px] font-semibold tracking-[-0.025em] text-text transition-colors hover:text-accent md:py-7 md:text-[24px]"
                    >
                      {q}
                      <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-300", on ? "rotate-45 border-signal bg-signal text-ink" : "border-border-bright text-text group-hover:border-text")}>
                        <Plus aria-hidden className="h-5 w-5" />
                      </span>
                    </button>
                  </h3>
                  {/* every answer stays in the HTML (crawlable); closed ones collapse to zero height */}
                  <div
                    id={`faq-${i}`}
                    role="region"
                    aria-hidden={!on}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[40rem] pb-7 text-[15.5px] leading-[1.7] text-muted md:text-[17px]">{a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
