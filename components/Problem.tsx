import { Link2Off, Radar, Clock } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const PROBLEMS = [
  { Icon: Radar, title: "Leads slip through", line: "Enquiries arrive on five channels. Some are never seen." },
  { Icon: Clock, title: "Follow-ups get forgotten", line: "The quote goes out. Then nobody chases it." },
  { Icon: Link2Off, title: "Tools don't talk to each other", line: "Your CRM, sheet and WhatsApp each tell a different story." },
] as const;

export default function Problem() {
  return (
    <section id="problem" className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeading eyebrow="The problem" title="Where enquiries get lost." />
        <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
          {PROBLEMS.map(({ Icon, title, line }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="h-full rounded-2xl border border-border bg-surface/60 p-6 md:p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-border-bright text-accent-2">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold leading-tight text-text">{title}</h3>
                <p className="mt-2 text-[15.5px] leading-[1.65] text-muted">{line}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
