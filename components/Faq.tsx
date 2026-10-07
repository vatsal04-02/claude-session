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
    <Section id="faq" className="bg-[#150e0a]">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
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
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[18px] font-medium text-text transition-colors hover:text-accent md:text-[20px]"
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
                      <p className="max-w-[40rem] pb-6 text-[16px] leading-[1.75] text-muted md:text-[17px]">{a}</p>
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
