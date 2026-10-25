"use client";

import { motion } from "motion/react";
import { Parallax } from "./motion-fx";
import { Reveal, SectionHeading } from "./ui";
import { BAND, CONTAINER } from "@/lib/layout";

const PROBLEMS = [
  { title: "Leads slip through", line: "Enquiries arrive on five channels. Some are never seen." },
  { title: "Follow-ups get forgotten", line: "The quote goes out. Then nobody chases it." },
  { title: "Tools don't talk", line: "Your CRM, sheet and WhatsApp each tell a different story." },
] as const;

/** The problem: a statement on the left, three numbered leaks on the right (editorial rows, no cards). */
export default function Problem() {
  return (
    <section id="problem" className={`${BAND} !pt-16 md:!pt-24`}>
      {/* depth: a large ring drifting behind the rows */}
      <Parallax speed={70} className="pointer-events-none absolute right-[-12vw] top-[20%] hidden h-[560px] w-[560px] lg:block">
        <div aria-hidden className="h-full w-full rounded-full border-[28px] border-signal/[0.07]" />
      </Parallax>
      <div className={`${CONTAINER} relative grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20`}>
        <SectionHeading
          index="01"
          eyebrow="The problem"
          title={
            <>
              Where enquiries <em>leak</em>.
            </>
          }
          sub="Three small leaks. Together they cost you customers every single week."
          className="lg:sticky lg:top-32"
        />
        <ol className="border-b border-border">
          {PROBLEMS.map(({ title, line }, i) => (
            <li key={title} className="border-t border-border">
              <Reveal delay={i * 0.06} className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 py-8 md:gap-x-10 md:py-10">
                <motion.span
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }}
                  className="display inline-block text-[clamp(3rem,7vw,5.5rem)] leading-none text-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:rotate-[-4deg]"
                  style={{ letterSpacing: "-0.06em" }}
                >
                  0{i + 1}
                </motion.span>
                <div>
                  <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)] text-text" style={{ letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                    {title}
                  </h3>
                  <p className="mt-3 max-w-[28rem] text-[16px] leading-[1.6] text-muted md:text-[17px]">{line}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
