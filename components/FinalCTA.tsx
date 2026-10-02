"use client";

import { useDemo } from "@/lib/demo-context";
import { whatsappHref } from "@/lib/site";
import { Button, Reveal } from "./ui";

export default function FinalCTA() {
  const { open } = useDemo();
  // Without a configured WhatsApp number the button opens the demo form instead of a dead link.
  const wa = whatsappHref
    ? ({ href: whatsappHref, target: "_blank", rel: "noopener noreferrer" } as const)
    : ({ href: "#demo", onClick: (e: React.MouseEvent) => (e.preventDefault(), open()) } as const);

  return (
    <section id="demo" className="relative overflow-hidden border-t border-border px-5 py-28 md:px-8 md:py-[200px]">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="anim-glow pointer-events-none absolute -left-20 bottom-0 h-[380px] w-[380px] rounded-full bg-accent/[0.12] blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1140px] items-end gap-12 lg:grid-cols-[1.45fr_0.55fr] lg:gap-16">
        <Reveal>
          <h2 className="display text-[clamp(2.5rem,5.6vw,4.6rem)]">
            Tell us what your team does manually.
            <em className="mt-3 block text-[0.55em] leading-[1.1]">We&apos;ll show you what can be automated.</em>
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
            <Button size="lg" variant="ghost" arrow={null} {...wa}>
              WhatsApp Us
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
