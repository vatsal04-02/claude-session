import { Reveal } from "./ui";

const ITEMS = [
  "Lead capture",
  "AI summaries",
  "CRM timelines",
  "WhatsApp automation",
  "Booking reminders",
  "No-show recovery",
  "Follow-up workflows",
  "Revenue recovery",
];

const FOR = ["Clinics", "Gyms", "Coaching institutes", "Real estate", "Salons", "Professional services"];

export default function TrustStrip() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section aria-label="What FlowHQ builds" className="relative border-y border-border/70 bg-bg-soft/60 py-8">
      <Reveal className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-5 md:px-8">
        <p className="label text-center text-subtle">
          Built for {FOR.join(" · ")}
        </p>
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <ul className="anim-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
            {row.map((t, i) => (
              <li
                key={i}
                aria-hidden={i >= ITEMS.length}
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
