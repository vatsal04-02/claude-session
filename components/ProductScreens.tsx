"use client";

import { Section, SectionHeading, Stagger, StaggerItem } from "./ui";

/* Screenshots live in public/screenshot-1.webp … screenshot-3.webp. */
const SHOTS = [
  { src: "screenshot-1.webp", title: "Pipeline board", rest: "work moving through stages", alt: "Example pipeline board for tracking work through stages" },
  { src: "screenshot-2.webp", title: "WhatsApp inbox", rest: "conversations your team can pick up", alt: "Example WhatsApp inbox" },
  { src: "screenshot-3.webp", title: "Dashboard", rest: "your numbers at a glance", alt: "Example reporting dashboard" },
];

export default function ProductScreens() {
  return (
    <Section id="product-screens" className="bg-[#140e0a]">
      <SectionHeading
        title="The screens your team works in."
        sub="Example interfaces from the systems we build. Yours is designed around your process, not copied from these."
      />
      <Stagger className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3">
        {SHOTS.map((s) => (
          <StaggerItem key={s.src}>
            <figure>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]">
                <img src={s.src} alt={s.alt} loading="lazy" className="aspect-[3/2] w-full object-cover" />
              </div>
              <figcaption className="mt-4 text-[15px] leading-[1.6] text-muted">
                <span className="font-medium text-text">{s.title}</span> — {s.rest}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
