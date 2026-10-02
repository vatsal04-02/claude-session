"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  Building2,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Scissors,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { EASE, Reveal, Section, SectionHeading, StatusDot } from "./ui";

type Industry = {
  id: string;
  label: string;
  icon: LucideIcon;
  flow: string[];
  blurb: string;
  automates: string[];
};

const INDUSTRIES: Industry[] = [
  {
    id: "clinics",
    label: "Clinics",
    icon: Stethoscope,
    flow: ["Enquiry", "Appointment", "Visit", "Follow-up"],
    blurb: "Fewer missed calls and empty slots, with every patient followed up after the visit.",
    automates: ["Enquiry capture from calls and forms", "Appointment reminders", "Post-visit check-ins"],
  },
  {
    id: "physio",
    label: "Physiotherapy",
    icon: HeartPulse,
    flow: ["Enquiry", "Assessment", "Sessions", "Progress check"],
    blurb: "Keep patients on their plan with reminders and progress follow-ups.",
    automates: ["Assessment booking", "Session reminders", "Missed-session recovery"],
  },
  {
    id: "gyms",
    label: "Gyms",
    icon: Dumbbell,
    flow: ["Enquiry", "Trial", "Membership", "Renewal"],
    blurb: "Turn walk-ins and trials into members, then remind them before renewal.",
    automates: ["Trial slot booking", "Follow-up after trial", "Renewal reminders"],
  },
  {
    id: "coaching",
    label: "Coaching",
    icon: GraduationCap,
    flow: ["Enquiry", "Counselling", "Admission", "Fee follow-up"],
    blurb: "Track every parent and student enquiry through to admission and fees.",
    automates: ["Counselling scheduling", "Admission pipeline", "Fee payment reminders"],
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: Building2,
    flow: ["Enquiry", "Qualification", "Site visit", "Deal"],
    blurb: "Respond to portal leads in minutes and never lose track of a site visit.",
    automates: ["Instant lead response", "Buyer qualification", "Site-visit scheduling"],
  },
  {
    id: "salons",
    label: "Salons",
    icon: Scissors,
    flow: ["Booking", "Reminder", "Visit", "Rebook"],
    blurb: "Fill the calendar, cut no-shows and bring regulars back on schedule.",
    automates: ["Booking confirmations", "No-show recovery", "Rebooking nudges"],
  },
  {
    id: "services",
    label: "Professional Services",
    icon: Briefcase,
    flow: ["Enquiry", "Consultation", "Proposal", "Onboarding"],
    blurb: "Keep proposals moving and onboard new clients without chasing.",
    automates: ["Consultation booking", "Proposal follow-ups", "Client onboarding tasks"],
  },
];

export default function Industries() {
  const [id, setId] = useState(INDUSTRIES[0].id);
  const cur = INDUSTRIES.find((i) => i.id === id)!;

  return (
    <Section id="industries">
      <SectionHeading
        eyebrow="Industries"
        title={
          <>
            Built for businesses that <span className="grad-text">run on enquiries</span>.
          </>
        }
        sub="Choose an industry to see a sample workflow."
      />

      <Reveal className="mt-10" delay={0.1}>
        <div
          role="tablist"
          aria-label="Industries"
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          {INDUSTRIES.map((ind) => {
            const on = ind.id === id;
            return (
              <button
                key={ind.id}
                role="tab"
                aria-selected={on}
                aria-controls="industry-panel"
                onClick={() => setId(ind.id)}
                className={cn(
                  "relative flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] transition-colors",
                  on ? "border-transparent text-[#04161b]" : "border-border bg-surface text-muted hover:border-accent/40 hover:text-text"
                )}
              >
                {on && (
                  <motion.span
                    layoutId="industry-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <ind.icon className="relative h-4 w-4" />
                <span className="relative font-medium">{ind.label}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          id="industry-panel"
          role="tabpanel"
          className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-surface p-6 md:p-10"
        >
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative"
            >
              <div className="label flex items-center gap-2 text-accent">
                <cur.icon className="h-4 w-4" /> Sample workflow · {cur.label}
              </div>
              <p className="mt-3 max-w-2xl text-lg text-muted md:text-xl">{cur.blurb}</p>

              {/* flow */}
              <ol className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:gap-0">
                {cur.flow.map((s, i) => (
                  <li key={s} className="flex flex-1 items-center md:contents">
                    <motion.div
                      initial={{ opacity: 0, y: 14, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease: EASE }}
                      className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-4 md:flex-col md:gap-2 md:py-5 md:text-center"
                    >
                      <span className="label text-[10px] text-subtle">0{i + 1}</span>
                      <span className="text-base font-medium md:text-lg">{s}</span>
                      <StatusDot tone={i === cur.flow.length - 1 ? "success" : "accent"} className="ml-auto md:ml-0" />
                    </motion.div>
                    {i < cur.flow.length - 1 && (
                      <motion.span
                        aria-hidden
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
                        className="hidden h-px w-8 origin-left bg-gradient-to-r from-accent to-accent-2 md:block lg:w-12"
                      />
                    )}
                  </li>
                ))}
              </ol>

              <ul className="mt-8 grid gap-3 md:grid-cols-3">
                {cur.automates.map((a, i) => (
                  <motion.li
                    key={a}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.45, ease: EASE }}
                    className="flex items-center gap-3 rounded-lg border border-border/70 bg-bg/40 px-4 py-3 text-[15px] text-muted"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {a}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
