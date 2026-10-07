import { Check } from "lucide-react";
import { getResource } from "@/lib/resources";
import { getService } from "@/lib/services";
import { cn } from "@/lib/cn";
import { WA_LINK } from "@/lib/whatsapp";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Button } from "./ui";

/* Shared, server-rendered building blocks for the content pages (services, industries, resources).
   No client JavaScript beyond the navbar: every word is in the HTML. */

export const wrap = "relative mx-auto w-full max-w-[1140px]";
export const band = "section-edge relative px-5 py-20 md:px-8 md:py-28";
export const h2 = "display text-balance text-[clamp(1.9rem,3.6vw,2.9rem)] text-text";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar base="/" />
      <main id="main">{children}</main>
      <Footer base="/" />
    </>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="label inline-flex items-center gap-2.5 text-accent">
      <span aria-hidden className="h-px w-6 bg-accent/70" />
      {children}
    </span>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-subtle">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {it.href ? (
              <a href={it.href} className="inline-flex min-h-6 items-center transition-colors hover:text-accent">
                {it.name}
              </a>
            ) : (
              <span aria-current="page" className="text-muted">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: { name: string; href?: string }[];
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="hero-atmos relative overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.6 } as React.CSSProperties} />
      <div className={wrap}>
        <Breadcrumbs items={crumbs} />
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display mt-5 max-w-[20ch] text-balance text-[clamp(2.4rem,5vw,4.1rem)] text-text" style={{ fontWeight: 760, lineHeight: 1.04 }}>
          {title}
        </h1>
        <p className="mt-7 max-w-[660px] text-[17px] leading-[1.7] text-muted md:text-[19px]">{intro}</p>
        {children ?? (
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button size="lg" href="/#audit">
              Get My Free Audit
            </Button>
            <Button size="lg" variant="whatsapp" {...WA_LINK}>
              Chat on WhatsApp
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export function CardGrid({ items, cols = 2 }: { items: { title: string; body: string }[]; cols?: 2 | 3 | 4 }) {
  return (
    <ul className={cn("mt-10 grid gap-4 md:grid-cols-2", cols === 3 && "lg:grid-cols-3", cols === 4 && "lg:grid-cols-4")}>
      {items.map((x, i) => (
        <li key={x.title} className="rounded-2xl border border-border bg-surface p-6 md:p-7">
          {cols === 4 && <span className="label text-subtle">0{i + 1}</span>}
          <h3 className={cn("item-title", cols === 4 && "mt-3")}>{x.title}</h3>
          <p className="mt-2 text-[15.5px] leading-[1.7] text-muted">{x.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** Example automation flows: trigger → steps → outcome. */
export function Flows({ items }: { items: { title: string; flow: string[] }[] }) {
  return (
    <ul className="mt-10 grid gap-4 lg:grid-cols-3">
      {items.map((x) => (
        <li key={x.title} className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="item-title">{x.title}</h3>
          <ol className="mt-4 space-y-2.5">
            {x.flow.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-[15px] leading-[1.5] text-muted">
                <span
                  className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-semibold",
                    i === x.flow.length - 1 ? "border-accent/60 bg-accent/15 text-accent-2" : "border-border-bright text-subtle"
                  )}
                >
                  {i === x.flow.length - 1 ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                <span className={i === x.flow.length - 1 ? "text-text" : undefined}>{step}</span>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ul>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-border-bright px-3.5 py-1.5 text-[14px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3.5">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-3 text-[16px] leading-[1.5] text-text">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent/10 text-accent">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Native <details>: crawlable, keyboard-friendly, no JavaScript. */
export function FaqList({ title, faqs }: { title: string; faqs: readonly (readonly [string, string])[] }) {
  return (
    <section className={`${band} bg-[#150e0a]`}>
      <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className={`${h2} mt-4`}>{title}</h2>
        </div>
        <div className="border-b border-border">
          {faqs.map(([q, a], i) => (
            <details key={q} className="faq-item group border-t border-border" open={i === 0}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-medium text-text transition-colors hover:text-accent md:text-[19px]">
                <h3>{q}</h3>
                <span aria-hidden className="text-[22px] leading-none text-accent transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[40rem] pb-6 text-[16px] leading-[1.75] text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkList({ label, links }: { label: string; links: { href: string; text: string; sub?: string }[] }) {
  if (!links.length) return null;
  return (
    <nav aria-label={label}>
      <h2 className="label text-subtle">{label}</h2>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {links.map((r) => (
          <li key={r.href}>
            <a href={r.href} className="group flex min-h-14 items-center justify-between gap-4 py-3 text-[17px] text-text transition-colors hover:text-accent">
              <span>
                {r.text}
                {r.sub && <span className="mt-0.5 block text-[13.5px] text-subtle">{r.sub}</span>}
              </span>
              <span aria-hidden className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Closing band: the audit CTA plus related services and resources (the internal-linking hub of every content page). */
export function CtaAndRelated({ services = [], resources = [], title }: { services?: string[]; resources?: string[]; title?: string }) {
  const svc = services.map(getService).filter((x) => !!x).map((s) => ({ href: `/${s.slug}/`, text: s.nav }));
  const res = resources.map(getResource).filter((x) => !!x).map((r) => ({ href: `/resources/${r.slug}/`, text: r.title }));
  return (
    <section className={`${band} bg-[#18100a]`}>
      <div className={`${wrap} grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <Eyebrow>Free audit</Eyebrow>
          <h2 className={`${h2} mt-4`}>{title ?? "Find out what's worth automating in your business"}</h2>
          <p className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.75] text-muted">
            Tell us what your team does by hand. We&apos;ll map what can be automated and give you a fixed quote — free. If the audit finds
            nothing worth automating, we&apos;ll tell you straight.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" href="/#audit">
              Get My Free Audit
            </Button>
          </div>
        </div>
        <div className="space-y-10">
          <LinkList label="Related services" links={svc} />
          <LinkList label="Related guides" links={res} />
        </div>
      </div>
    </section>
  );
}
