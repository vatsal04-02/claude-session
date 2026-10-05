"use client";

import { Highlight } from "./ui";

/* Brand statement strip, directly below the hero: giant serif line, no section chrome. */
export default function Manifesto() {
  return (
    <div aria-label="Manifesto" role="region" className="relative overflow-x-clip px-5 py-14 text-center md:px-8 md:py-20">
      <p className="font-serif mx-auto max-w-[20ch] text-balance text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] tracking-[-0.01em] text-text">
        We don&apos;t sell marketing. We install <Highlight>growth engines.</Highlight>
      </p>
      <p className="label mt-6 text-subtle" style={{ letterSpacing: "0.24em" }}>
        Built To Automate.
      </p>
    </div>
  );
}
