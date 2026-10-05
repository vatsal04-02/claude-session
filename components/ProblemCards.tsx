"use client";

import { cn } from "@/lib/cn";
import { Section, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "./ui";

const PROBLEMS = [
  {
    title: "Leads going cold",
    line: "Every enquiry answered in seconds, follow-ups that never forget. No lead dies in someone's inbox.",
  },
  {
    title: "No-shows and empty slots",
    line: "Booking, confirmation, reminders and re-booking — your calendar fills itself.",
  },
  {
    title: "Manual busywork",
    line: "Data entry, reports, notifications, reconciliations — the repetitive work your team hates, handled.",
  },
  {
    title: "Silent customers",
    line: "Review requests, repeat offers, win-back nudges — past customers become revenue again.",
  },
  {
    title: "Your specific problem",
    line: "Tell us what your team does manually. We'll map exactly what can be automated.",
    href: "#audit",
  },
] as const;

export default function ProblemCards() {
  return (
    <Section id="problems" className="bg-[#160f0b]">
      <SectionHeading
        eyebrow="Problems we solve"
        title="What we automate"
        sub="Every business wastes hours differently. These are the problems we automate most — yours might be next."
      />

      <Stagger className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-5">
        {PROBLEMS.map((p, i) => {
          const link = "href" in p;
          const body = (
            <>
              <span className="label text-subtle">0{i + 1}</span>
              <h3 className="item-title mt-4">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-muted">{p.line}</p>
              {link && (
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] text-accent transition-transform duration-300 group-hover:translate-x-1">
                  Get My Free Audit →
                </span>
              )}
            </>
          );
          return (
            <StaggerItem key={p.title} className="h-full">
              <SpotlightCard className={cn("h-full", link && "border-accent/40 bg-accent/[0.05]")}>
                {link ? (
                  <a href={p.href} className="group block h-full p-6">
                    {body}
                  </a>
                ) : (
                  <div className="h-full p-6">{body}</div>
                )}
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
