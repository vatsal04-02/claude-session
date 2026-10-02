"use client";

import { Section, SectionHeading, Stagger, StaggerItem } from "./ui";

/* Replace public/screenshot-1.png … screenshot-3.png with real captures. */
const SHOTS = [
  { src: "screenshot-1.png", title: "Pipeline", rest: "every lead, one board", alt: "FlowHQ CRM pipeline board" },
  { src: "screenshot-2.png", title: "WhatsApp inbox", rest: "chats and follow-ups", alt: "FlowHQ WhatsApp inbox" },
  { src: "screenshot-3.png", title: "Dashboard", rest: "your numbers at a glance.", alt: "FlowHQ dashboard" },
];

export default function ProductScreens() {
  return (
    <Section id="product-screens" className="bg-[#140e0a]">
      <SectionHeading
        eyebrow="The product"
        title="This is what your screen looks like."
        sub="The actual FlowHQ CRM — leads, pipeline, WhatsApp inbox, bookings."
      />
      <Stagger className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3">
        {SHOTS.map((s) => (
          <StaggerItem key={s.src}>
            <figure>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]">
                <img src={s.src} alt={s.alt} loading="lazy" className="aspect-[16/10] w-full object-cover" />
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
