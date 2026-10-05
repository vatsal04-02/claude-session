"use client";

import { Highlight, Reveal } from "./ui";

/* Brand statement strip, directly below the hero. */
export default function Manifesto() {
  return (
    <section aria-label="Manifesto" className="section-edge relative bg-[#160f0b] px-5 py-16 md:px-8 md:py-[104px]">
      <div className="relative mx-auto max-w-[1140px] text-center">
        <Reveal>
          <p className="display mx-auto max-w-[22ch] text-balance text-[clamp(2.1rem,5vw,4rem)] text-text">
            We don&apos;t sell marketing. We install <Highlight>growth engines.</Highlight>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
