import { ArrowUpRight, Mail } from "lucide-react";
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL } from "@/lib/site";
import { BAND, CONTAINER } from "@/lib/layout";
import { Instagram } from "./channels";
import { Linkedin, Youtube } from "./social-icons";
import { Reveal, SectionHeading } from "./ui";

const LINKS = [
  { name: "Instagram", handle: "@flowhq.in", href: INSTAGRAM_URL, Icon: Instagram, external: true },
  { name: "YouTube", handle: "@FlowHQ_in", href: YOUTUBE_URL, Icon: Youtube, external: true },
  { name: "LinkedIn", handle: "Flow HQ", href: LINKEDIN_URL, Icon: Linkedin, external: true },
  { name: "Email", handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, Icon: Mail, external: false },
] as const;

/** Where to find Flow HQ: one card per account (icon, platform, handle). */
export default function Socials() {
  return (
    <section id="social" aria-labelledby="social-title" className={`${BAND} !pt-0`}>
      <div className={`${CONTAINER} grid items-center gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12`}>
        <SectionHeading eyebrow="Find us" title="Follow Flow HQ." sub="See what we're building, or just say hello." size="sm" />
        <ul className="grid grid-cols-2 gap-4">
          {LINKS.map(({ name, handle, href, Icon, external }, i) => (
            <li key={name}>
              <Reveal delay={i * 0.05} className="h-full">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={external ? `Flow HQ on ${name}` : `Email ${handle}`}
                  className="group flex h-full min-h-[76px] flex-col gap-3 rounded-[14px] border border-border bg-surface/60 p-4 transition-colors duration-200 hover:border-accent/50 sm:flex-row sm:items-center sm:gap-3.5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border border-white/10 text-muted transition-colors duration-200 group-hover:border-accent/50 group-hover:text-accent-2">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1 sm:flex-1">
                    <span className="block text-[15px] font-semibold leading-tight text-text">{name}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-subtle sm:truncate">
                      {name === "Email" ? (
                        <>
                          {handle.split("@")[0]}
                          <wbr />@{handle.split("@")[1]}
                        </>
                      ) : (
                        handle
                      )}
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden className="hidden h-4 w-4 shrink-0 text-subtle transition-[color,transform] duration-200 sm:block group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-2" />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
