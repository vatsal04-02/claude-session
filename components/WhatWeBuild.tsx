"use client";

import { CalendarCheck, Database, MessageCircle, RotateCcw, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  Highlight,
  Reveal,
  Section,
  SectionHeading,
  SpotlightCard,
  Stagger,
  StaggerItem,
  SWIPE_ITEM,
  SWIPE_ROW,
  SwipeHint,
} from "./ui";

/* "What FlowHQ does" + "Services", merged: AI, CRM, automation and integrations are folded into the specific systems. */
const SYSTEMS: { name: string; body: string; icon: LucideIcon }[] = [
  { icon: Database, name: "AI CRM Systems", body: "Every lead, chat and booking — on one screen." },
  { icon: Zap, name: "Lead Automation", body: "Every enquiry answered in seconds, assigned, and followed up." },
  { icon: MessageCircle, name: "WhatsApp Automation", body: "Chats that book, remind and follow up — on autopilot." },
  { icon: CalendarCheck, name: "Booking Automation", body: "Bookings that confirm themselves. No-shows that chase themselves." },
  { icon: RotateCcw, name: "Revenue Recovery", body: "We find the money hiding in your missed calls and dead leads." },
  { icon: Sparkles, name: "AI Business Assistants", body: "An assistant trained on your business — not a generic chatbot." },
];

export default function WhatWeBuild() {
  return (
    <Section id="systems" grid="strong" className="warm-a bg-[#140e0a]">
      <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <SectionHeading eyebrow="What we build" title={<>We automate the work that <Highlight>eats your day.</Highlight></>} />
        <Reveal delay={0.12}>
          <p className="max-w-[30rem] text-[16px] leading-[1.75] text-muted md:text-[17px]">
            We build the automation layer around the way your business already operates.
          </p>
        </Reveal>
      </div>

      <Stagger className={cn("mt-12 md:mt-14", SWIPE_ROW, "md:grid-cols-2 md:gap-5 lg:grid-cols-3")}>
        {SYSTEMS.map((s) => (
          <StaggerItem key={s.name} className={SWIPE_ITEM}>
            <SpotlightCard className="group relative flex h-full flex-col overflow-hidden p-7 md:p-8">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-accent/50 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <s.icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </span>
              <h3 className="item-title mt-5">{s.name}</h3>
              <p className="mt-2 max-w-[34ch] text-[16px] leading-[1.7] text-muted">{s.body}</p>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
      <SwipeHint>Swipe · 6 systems</SwipeHint>

      <Reveal delay={0.1} className="mt-8 md:mt-10">
        <p className="max-w-[40rem] text-[16px] leading-[1.75] text-muted">
          Connects with WhatsApp, email, calendar, forms, payments and your CRM.{" "}
          <a
            href="#audit"
            className="group inline-flex cursor-pointer items-center gap-1.5 text-text underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent"
          >
            Something else? Tell us what to automate
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
