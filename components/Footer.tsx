import { FOOTER_LINKS } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 pb-24 pt-9 md:px-8 md:pb-10">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#top" aria-label="FlowHQ home">
            <Logo />
          </a>
          <p className="label mt-3 text-accent/80">AI Automation Studio</p>
          <p className="mt-2 max-w-[34ch] text-[14.5px] text-muted">AI systems for businesses that want less manual work.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[14px] text-muted">
            {FOOTER_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-[1140px] border-t border-border pt-5 text-[13px] text-subtle">
        © 2026 FlowHQ
      </div>
    </footer>
  );
}
