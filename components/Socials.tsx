import { ArrowUpRight, Mail } from "lucide-react";
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL } from "@/lib/site";
import { BAND, CONTAINER } from "@/lib/layout";
import { Instagram } from "./channels";
import { Linkedin, Youtube } from "./social-icons";
import { Reveal } from "./ui";

const LINKS = [
  { name: "Instagram", handle: "@flowhq.in", href: INSTAGRAM_URL, Icon: Instagram, external: true },
  { name: "YouTube", handle: "@FlowHQ_in", href: YOUTUBE_URL, Icon: Youtube, external: true },
  { name: "LinkedIn", handle: "Flow HQ", href: LINKEDIN_URL, Icon: Linkedin, external: true },
  { name: "Email", handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, Icon: Mail, external: false },
] as const;

/** Where to find Flow HQ: big editorial link rows (platform in display type, handle beside it). */
export default function Socials() {
  return (
    <section id="social" aria-labelledby="social-title" className={`${BAND} !pt-0`}>
      <div className={CONTAINER}>
        <div className="flex items-baseline justify-between gap-6">
          <h2 id="social-title" className="kicker">
            Find us
          </h2>
          <p className="text-[14px] text-subtle">See what we&apos;re building, or just say hello.</p>
        </div>
        <ul className="mt-6 border-b border-border">
          {LINKS.map(({ name, handle, href, Icon, external }, i) => (
            <li key={name} className="border-t border-border">
              <Reveal delay={i * 0.04}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={external ? `Flow HQ on ${name}` : `Email ${handle}`}
                  className="group flex min-h-[84px] items-center gap-4 py-5 transition-colors duration-300 md:gap-8 md:py-6"
                >
                  <Icon className="h-6 w-6 shrink-0 text-subtle transition-colors duration-300 group-hover:text-signal md:h-7 md:w-7" />
                  <span className="display text-[clamp(1.9rem,5vw,4rem)] text-text transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" style={{ letterSpacing: "-0.045em", lineHeight: 1 }}>
                    {name}
                  </span>
                  <span className="ml-auto hidden min-w-0 truncate text-[15px] text-muted sm:block">{handle}</span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-bright text-text transition-[background-color,color,border-color] duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-ink max-sm:ml-auto">
                    <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
