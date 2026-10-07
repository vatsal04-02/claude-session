import { NAV_LINKS } from "@/lib/site";
import { INDUSTRIES } from "@/lib/industries";
import { CLUSTERS, getResource } from "@/lib/resources";
import { SERVICES } from "@/lib/services";
import { WA_LINK } from "@/lib/whatsapp";
import Logo from "./Logo";
import { Button, StatusDot } from "./ui";

const linkCls = "inline-flex min-h-11 items-center transition-colors hover:text-accent md:min-h-9";

/** `base` = "" on the homepage (in-page anchors), "/" on other pages. */
export default function Footer({ base = "" }: { base?: "" | "/" }) {
  return (
    <footer className="border-t border-border px-5 pt-12 md:px-8 lg:pb-10">
      <div className="mx-auto grid max-w-[1140px] gap-10 md:grid-cols-2 md:items-start lg:grid-cols-[1.1fr_0.9fr_1fr_0.7fr_auto] lg:gap-8">
        <div>
          <a href={base ? "/" : "#top"} className="inline-flex min-h-11 items-center">
            <Logo />
          </a>
          <p className="label mt-2 text-accent" style={{ letterSpacing: "0.18em" }}>Built To Automate.</p>
          <p className="mt-4 max-w-[30ch] text-[14px] leading-[1.6] text-muted">
            Custom AI + automation systems that put your business on autopilot. Lucknow, working across India.
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
              <a href={`${base}#audit`} className={linkCls}>
                Free audit
              </a>
            </li>
          </ul>
        </nav>

        <div className="rounded-2xl border border-border bg-surface p-5 md:w-full lg:max-w-[240px] lg:justify-self-end">
          <div className="label text-[10.5px] text-subtle">Contact</div>
          <Button variant="whatsapp" {...WA_LINK} className="mt-4 w-full">
            Chat on WhatsApp
          </Button>
          <p className="mt-4 text-[14.5px] text-muted">Lucknow, India</p>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1140px] flex-wrap items-center justify-between gap-4 border-t border-border pt-5 text-[13px] text-subtle">
        <span>© 2026 Flow HQ</span>
        <span className="label inline-flex items-center gap-2.5 rounded-full border border-border px-3 py-1.5 text-[10px] text-muted">
          <StatusDot tone="accent" /> Flow HQ System · Online
        </span>
      </div>
    </footer>
  );
}
