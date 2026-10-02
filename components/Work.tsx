"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE, Section, SectionHeading, StatusDot, Tag } from "./ui";

type Status = "In Progress" | "Prototype" | "Live";

/* Status labels: change to "Live" only once a system is verifiably live. */
const PROJECTS: { title: string; tag: string; status: Status; flow: string[] }[] = [
  {
    title: "Physiotherapy Clinic",
    tag: "AI CRM",
    status: "In Progress",
    flow: ["Enquiry", "AI", "CRM", "Appointment", "Reminder"],
  },
  {
    title: "Lead Management",
    tag: "LEAD AUTOMATION",
    status: "Prototype",
    flow: ["Capture", "Assign", "Qualify", "Follow-up"],
  },
  {
    title: "WhatsApp Business System",
    tag: "WHATSAPP · AI",
    status: "In Progress",
    flow: ["Message", "AI Context", "Human Handoff", "Follow-up"],
  },
  {
    title: "Booking & Recovery",
    tag: "BOOKING",
    status: "Prototype",
    flow: ["Booking", "Reminder", "No-show", "Recovery"],
  },
];

const tone = { "In Progress": "warning", Prototype: "accent", Live: "success" } as const;

export default function Work() {
  return (
    <Section id="work" className="border-t border-border">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Systems we&apos;re <em>building.</em>
          </>
        }
        sub="Shown honestly. Each label says where the system really is."
      />

      <ul className="mt-10 border-t border-border md:mt-12">
        {PROJECTS.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
            className="group grid gap-5 border-b border-border py-7 transition-colors duration-300 hover:bg-surface/50 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-10 md:px-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="label text-[10px] text-subtle">0{i + 1}</span>
                <Tag tone="muted">{p.tag}</Tag>
              </div>
              <h3 className="mt-3 font-serif text-[32px] leading-tight transition-colors group-hover:text-accent md:text-[38px]">
                {p.title}
              </h3>
              <span className="label mt-2 flex items-center gap-2 text-[10.5px] text-muted">
                <StatusDot tone={tone[p.status]} pulse={p.status !== "Prototype"} /> {p.status}
              </span>
            </div>

            <ol className="flex flex-wrap items-center gap-y-2">
              {p.flow.map((s, k) => (
                <li key={s} className="flex items-center">
                  <span
                    className="rounded-full border border-border px-3.5 py-1.5 text-[13.5px] text-muted transition-all duration-300 group-hover:border-accent/60 group-hover:text-text"
                    style={{ transitionDelay: `${k * 70}ms` }}
                  >
                    {s}
                  </span>
                  {k < p.flow.length - 1 && (
                    <span
                      aria-hidden
                      className={cn(
                        "mx-1.5 text-border-bright transition-colors duration-300 group-hover:text-accent"
                      )}
                      style={{ transitionDelay: `${k * 70 + 35}ms` }}
                    >
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
