"use client";

import { Section, SectionHeading, Stagger, StaggerItem } from "./ui";

/* Screenshots live in public/screenshot-1.webp … screenshot-3.webp. */
const SHOTS = [
  { src: "screenshot-1.webp", title: "Pipeline", rest: "every lead, one board", alt: "FlowHQ CRM pipeline board" },
  { src: "screenshot-2.webp", title: "WhatsApp inbox", rest: "chats and follow-ups", alt: "FlowHQ WhatsApp inbox" },
  { src: "screenshot-3.webp", title: "Dashboard", rest: "your numbers at a glance.", alt: "FlowHQ dashboard" },
];

export default function ProductScreens() {
  return (
    <Section id="product-screens" className="bg-[#140e0a]">
      <SectionHeading
        eyebrow="The product"
        title="This is what your screen looks like."
        sub="Preview of the FlowHQ CRM — leads, pipeline, WhatsApp inbox, bookings."
      />
      <span className="label mt-6 inline-flex items-center gap-2 text-accent" style={{ fontSize: 10.5, letterSpacing: "0.14em" }}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Concept preview
      </span>
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
