"use client";

import { useDemo } from "@/lib/demo-context";
import { WHATSAPP_MESSAGES, waLink } from "@/lib/whatsapp";
import { Button, Highlight, Reveal } from "./ui";

export default function FinalCTA() {
  const { open } = useDemo();
  return (
    <section id="demo" className="section-edge relative overflow-hidden bg-[#1a110b] px-5 py-24 md:px-8 md:py-[150px]">
      <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.5 } as React.CSSProperties} />
      <div aria-hidden className="anim-glow pointer-events-none absolute -left-20 bottom-0 h-[380px] w-[380px] rounded-full bg-[rgba(234,106,47,0.14)] blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1140px] items-end gap-12 lg:grid-cols-[1.45fr_0.55fr] lg:gap-16">
        <Reveal>
          <h2 className="display text-[clamp(2.4rem,5vw,4.25rem)]">
            Tell us what your team does manually.
            <span className="mt-4 block text-[0.48em] font-semibold leading-[1.2] text-accent">
              We&apos;ll show you what can be <Highlight>automated.</Highlight>
            </span>
          </h2>
        </Reveal>
        <div>
          <Reveal delay={0.1}>
            <p className="text-[17px] leading-[1.75] text-muted">
              Book a free 20-minute demo and we&apos;ll map a workflow around your business.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={open}>
              Book a Free Demo
            </Button>
            <Button size="lg" variant="whatsapp" {...waLink(WHATSAPP_MESSAGES.general)}>
              WhatsApp Us
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
