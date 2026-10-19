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
    <Section id="faq">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" title="Fair questions." />
          <p className="mt-5 max-w-[34ch] text-[15.5px] leading-[1.65] text-muted">
            Something else on your mind?{" "}
            <a {...WA_LINK} className="text-accent-2 underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent">
              Ask us on WhatsApp
            </a>{" "}
            — it comes straight to the founders.
          </p>
        </div>
        <Reveal>
          <ul className="border-b border-border">
            {FAQS.map(([q, a], i) => {
              const on = open === i;
              return (
                <li key={q} className="border-t border-border">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(on ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-[16.5px] font-medium text-text transition-colors hover:text-accent md:py-5 md:text-[19px]"
                    >
                      {q}
                      <Plus className={cn("h-5 w-5 shrink-0 text-accent transition-transform duration-300", on && "rotate-45")} />
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
                      <p className="max-w-[40rem] pb-5 text-[15px] leading-[1.7] text-muted md:text-[16.5px]">{a}</p>
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
