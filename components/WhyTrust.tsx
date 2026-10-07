"use client";

import { Check, X } from "lucide-react";
import { Button, Reveal, Section, SectionHeading } from "./ui";

const PLEDGE = [
  "You own the system, the data, and the accounts — from day one.",
  "Built on Meta's official WhatsApp Business API. No grey-area tools.",
  "Fixed quote before we start. No hourly billing.",
  "Your customer data never leaves infrastructure you own.",
];

const VERSUS = [
  ["Fixed quote upfront", "Hourly billing that creeps"],
  ["You own everything", "You're locked into their platform"],
  ["You talk to the founder", "You talk to an account manager"],
  ["Systems that save you hours", "Reports about ad clicks"],
] as const;

/** "Why FlowHQ": honest trust section — no fake social proof, a no lock-in pledge, and a plain comparison. */
export default function WhyTrust() {
  return (
    <Section id="why-flowhq" className="bg-[#140d09]">
      <div className="mx-auto max-w-[800px]">
        <SectionHeading
          eyebrow="Why Flow HQ"
          title="No testimonials. Yet."
          sub="We're new, so we won't fake social proof. Instead, look at this page: the demo chat, the calculator, the video — every one of them was built by us, and each is the kind of system we install for clients. That's our portfolio."
        />

        <Reveal delay={0.1} className="mt-12 md:mt-14">
          <h3 className="item-title">The no lock-in pledge</h3>
          <ul className="mt-5 space-y-3.5">
            {PLEDGE.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[16px] leading-[1.55] text-text md:text-[17px]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent/10 text-accent">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 md:mt-14">
          <h3 className="item-title">Us vs the typical agency</h3>
          <ul className="mt-5 overflow-hidden rounded-2xl border border-border">
            {VERSUS.map(([us, them]) => (
              <li key={us} className="grid grid-cols-2 border-t border-border first:border-t-0">
                <span className="flex items-start gap-2.5 border-r border-accent/25 bg-accent/[0.08] px-4 py-4 text-[15px] font-medium leading-[1.45] text-accent-2 md:px-6 md:text-[16px]">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                  {us}
                </span>
                <span className="flex items-start gap-2.5 px-4 py-4 text-[15px] leading-[1.45] text-muted md:px-6 md:text-[16px]">
                  <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-subtle" strokeWidth={2.5} />
                  {them}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 md:mt-14">
          <p className="text-[16px] leading-[1.7] text-text md:text-[17px]">
            If the free audit finds nothing worth automating, we&apos;ll tell you straight — and it&apos;s still free.
          </p>
          <div className="mt-7">
            <Button size="lg" href="#audit">
              Get My Free Audit
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
