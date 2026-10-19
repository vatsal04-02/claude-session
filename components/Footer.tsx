import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, NAV_LINKS, YOUTUBE_URL } from "@/lib/site";
import { INDUSTRIES } from "@/lib/industries";
import { CLUSTERS, getResource } from "@/lib/resources";
import { SERVICES } from "@/lib/services";
import { WA_LINK } from "@/lib/whatsapp";
import { Instagram } from "./channels";
import Logo from "./Logo";
import { Linkedin, Youtube } from "./social-icons";
import { Button } from "./ui";
import { CONTAINER } from "@/lib/layout";

const linkCls = "inline-flex min-h-11 items-center transition-colors hover:text-accent md:min-h-9";

/** `base` = "" on the homepage (in-page anchors), "/" on other pages. */
export default function Footer({ base = "" }: { base?: "" | "/" }) {
  return (
    <footer className="border-t border-border pt-12">
      <div className={`${CONTAINER} grid grid-cols-2 gap-x-6 gap-y-8 md:items-start lg:grid-cols-[1.1fr_0.9fr_1fr_0.7fr_auto] lg:gap-8`}>
        <div className="col-span-2 md:col-span-1">
          <a href={base ? "/" : "#top"} className="inline-flex min-h-11 items-center">
            <Logo />
          </a>
          <p className="label mt-2 text-accent" style={{ letterSpacing: "0.18em" }}>Not just AI. Systems that work.</p>
          <p className="mt-4 max-w-[30ch] text-[14px] leading-[1.6] text-muted">
            AI systems that capture leads, follow up and keep your CRM updated. Lucknow, working across India.
          </p>
        </div>

        <nav aria-label="Services">
          <div className="label mb-2 text-[10.5px] text-subtle">Services</div>
          <ul className="grid gap-1 text-[14.5px] text-muted">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <a href={`/${s.slug}/`} className={linkCls}>
                  {s.nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Industries and resources">
          <div className="label mb-2 text-[10.5px] text-subtle">Industries</div>
          <ul className="grid gap-1 text-[14.5px] text-muted">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <a href={`/industries/${i.slug}/`} className={linkCls}>
                  {i.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="label mb-2 mt-6 text-[10.5px] text-subtle">Resources</div>
          <ul className="grid gap-1 text-[14.5px] text-muted">
            {CLUSTERS.map((c) => (
              <li key={c.id}>
                <a href={`/resources/${getResource(c.pillar)!.slug}/`} className={linkCls}>
                  {c.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/resources/" className={linkCls}>
                All guides
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer">
          <div className="label mb-2 text-[10.5px] text-subtle">Flow HQ</div>
          <ul className="grid gap-1 text-[14.5px] text-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={`${base}${l.href}`} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/calculator/" className={linkCls}>
                Cost calculator
              </a>
            </li>
            <li>
              <a href={`${base}#audit`} className={linkCls}>
                Free audit
              </a>
            </li>
          </ul>
        </nav>

        <div className="col-span-2 rounded-[14px] border border-border bg-surface p-5 md:col-span-1 md:w-full lg:max-w-[240px] lg:justify-self-end">
          <div className="label text-[10.5px] text-subtle">Contact</div>
          <Button variant="whatsapp" {...WA_LINK} className="mt-4 w-full">
            Chat on WhatsApp
          </Button>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex min-h-11 w-full items-center break-all text-[14px] text-text transition-colors hover:text-accent">
            {CONTACT_EMAIL}
          </a>
          <ul className="mt-1 flex gap-2">
            {[
              { name: "Instagram", href: INSTAGRAM_URL, Icon: Instagram },
              { name: "YouTube", href: YOUTUBE_URL, Icon: Youtube },
              { name: "LinkedIn", href: LINKEDIN_URL, Icon: Linkedin },
            ].map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Flow HQ on ${name}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border-bright text-muted transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14.5px] text-muted">Lucknow, India</p>
        </div>
      </div>

      <div className={`${CONTAINER} mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border py-5 text-[13px] text-subtle`}>
        <span>© 2026 Flow HQ</span>
        <span className="inline-flex items-center gap-2.5 rounded-full border border-border px-3 py-1.5 text-[12px] text-muted">
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#34d399] opacity-60 motion-reduce:hidden" />
            <span className="relative h-2 w-2 rounded-full bg-[#34d399]" />
          </span>
          System online
        </span>
      </div>
    </footer>
  );
}
