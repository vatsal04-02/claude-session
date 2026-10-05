import { NAV_LINKS } from "@/lib/site";
import { WA_LINK } from "@/lib/whatsapp";
import Logo from "./Logo";
import { Button, StatusDot } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 pt-12 md:px-8 lg:pb-10">
      <div className="mx-auto grid max-w-[1140px] gap-10 md:grid-cols-3 md:items-start md:gap-10">
        <div>
          <a href="#top" aria-label="FlowHQ home" className="inline-flex min-h-11 items-center">
            <Logo />
          </a>
          <p className="label mt-2 text-accent/80" style={{ letterSpacing: "0.18em" }}>Built To Automate.</p>
        </div>

        <nav aria-label="Footer" className="md:justify-self-center">
          <ul className="grid gap-1 text-[14.5px] text-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center transition-colors hover:text-accent md:min-h-9">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rounded-2xl border border-border bg-surface p-5 md:w-full md:max-w-[300px] md:justify-self-end">
          <div className="label text-[10.5px] text-subtle">Contact</div>
          <Button variant="whatsapp" {...WA_LINK} className="mt-4 w-full">
            Chat on WhatsApp
          </Button>
          <p className="mt-4 text-[14.5px] text-muted">Lucknow, India</p>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1140px] flex-wrap items-center justify-between gap-4 border-t border-border pt-5 text-[13px] text-subtle">
        <span>© 2026 FlowHQ</span>
        <span className="label inline-flex items-center gap-2.5 rounded-full border border-border px-3 py-1.5 text-[10px] text-muted">
          <StatusDot tone="accent" /> FlowHQ System · Online
        </span>
      </div>
    </footer>
  );
}
