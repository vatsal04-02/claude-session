import { Link2Off, Radar, Clock } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { BAND, CONTAINER } from "@/lib/layout";

const PROBLEMS = [
  { Icon: Radar, title: "Leads slip through", line: "Enquiries arrive on five channels. Some are never seen." },
  { Icon: Clock, title: "Follow-ups get forgotten", line: "The quote goes out. Then nobody chases it." },
  { Icon: Link2Off, title: "Tools don't talk to each other", line: "Your CRM, sheet and WhatsApp each tell a different story." },
] as const;

export default function Problem() {
  return (
    <section id="problem" className={BAND}>
      <div className={`${CONTAINER} grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14`}>
        <SectionHeading eyebrow="The problem" title="Where enquiries get lost." sub="Three small leaks. Together they cost you customers every week." />
        <ul className="grid gap-4">
          {PROBLEMS.map(({ Icon, title, line }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06} className="flex items-center gap-4 rounded-[14px] border border-border bg-surface/60 p-4 md:p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-white/10 text-accent-2 md:h-11 md:w-11">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[16.5px] font-semibold leading-tight text-text md:text-[18px]">{title}</h3>
                  <p className="mt-1 text-[14.5px] leading-[1.55] text-muted md:text-[15.5px]">{line}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
