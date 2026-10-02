"use client";

import { useDemo } from "@/lib/demo-context";
import { whatsappHref } from "@/lib/site";
import { Button, Reveal } from "./ui";

export default function FinalCTA() {
  const { open } = useDemo();
  const wa = whatsappHref
    ? ({ href: whatsappHref, target: "_blank", rel: "noopener noreferrer" } as const)
    : ({ href: "#demo", onClick: (e: React.MouseEvent) => (e.preventDefault(), open()) } as const);

  return (
    <section id="demo" className="relative overflow-hidden border-t border-border px-5 py-20 md:px-8 md:py-28">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="anim-glow pointer-events-none absolute -left-20 bottom-0 h-[380px] w-[380px] rounded-full bg-accent/[0.12] blur-[120px]" />
      <div className="relative mx-auto max-w-[1140px]">
        <Reveal>
          <h2 className="display max-w-[14ch] text-[clamp(2.8rem,7vw,5.6rem)]">
            Have repetitive work? We can <em>automate it.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-muted md:text-xl">Book a free 20-minute demo.</p>
        </Reveal>
        <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Button size="lg" onClick={open}>
            Book a Free Demo
          </Button>
          <a {...wa} className="text-[15px] text-text transition-colors hover:text-accent">
            or WhatsApp us →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
