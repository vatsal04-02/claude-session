"use client";

import { Reveal, Section, SectionHeading } from "./ui";

/* Replace public/founder-photo.png with your photo. */
export default function Founder() {
  return (
    <Section id="founder" className="bg-[#140e0a]">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="Founder" title="Built in Lucknow." />
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.75] text-muted md:text-[18px]">
              I&apos;m Vatsal. I build AI systems for local businesses that are tired of losing enquiries to slow
              replies and messy follow-ups. No big agency layers — you talk to the person who builds your system.
            </p>
          </Reveal>
        </div>
        <Reveal y={28} className="mx-auto w-full max-w-[360px] lg:ml-auto">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <img src="founder-photo.png" alt="Vatsal, founder of FlowHQ" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
