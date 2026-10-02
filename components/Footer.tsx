import { FOOTER_LINKS } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-soft/70 px-5 pb-28 pt-16 md:px-8 md:pb-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#top" aria-label="FlowHQ home">
              <Logo />
            </a>
            <p className="mt-4 max-w-[28ch] text-muted">AI systems for modern businesses.</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-14 gap-y-3 text-[15px]">
              {FOOTER_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-muted transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#demo" className="font-medium text-accent hover:underline">
                  Book Demo →
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div
          aria-hidden
          className="grad-text mt-14 select-none text-center text-[clamp(4rem,19vw,15rem)] font-bold leading-[0.8] tracking-[-0.05em] opacity-[0.12]"
          style={{
            maskImage: "linear-gradient(to bottom, #000 30%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 30%, transparent 95%)",
          }}
        >
          FLOWHQ
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6 text-sm text-subtle md:flex-row md:justify-between">
          <span>© 2026 FlowHQ · AI Automation Studio</span>
          <span className="label text-[11px]">Website → Leads → CRM → AI → Automation → Bookings → Follow-up</span>
        </div>
      </div>
    </footer>
  );
}
