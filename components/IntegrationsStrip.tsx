import { BRAND_ICONS } from "./brand-icons";
import { CONTAINER } from "@/lib/layout";

/** "Works with" strip: monochrome brand marks at low opacity that brighten on hover (simple-icons paths, see brand-icons.ts). */
export default function IntegrationsStrip() {
  return (
    <section aria-label="Integrations" className="border-y border-border">
      <div className={`${CONTAINER} flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:gap-10 md:py-7`}>
        <p className="label shrink-0 text-[11px] text-subtle">Works with</p>
        <ul className="grid grid-cols-4 gap-x-2 gap-y-4 md:flex md:flex-1 md:flex-wrap md:justify-between md:gap-x-6">
          {BRAND_ICONS.map((b) => (
            <li key={b.name} className="group flex flex-col items-center gap-1.5 text-center text-text/40 transition-colors duration-200 hover:text-text md:flex-row md:gap-2 md:text-left">
              <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 shrink-0 fill-current">
                <path d={b.path} />
              </svg>
              <span className="text-[11px] font-medium leading-tight text-text/65 transition-colors duration-200 group-hover:text-text md:text-[13px]">{b.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
