import { band, Eyebrow, PageHero, Shell, wrap } from "@/components/content";
import { breadcrumbs, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const OPERATOR_EMAIL = "vatsallink04@gmail.com";

export const metadata = pageMetadata({
  title: "FlowHQ Lead Research Crawler | Flow HQ",
  description: "Information about the FlowHQ lead research crawler: its purpose, the operator, and how to contact us about crawler activity.",
  path: "/research-bot/",
});

const row = "rounded-[14px] border border-border bg-surface/60 p-5 md:p-6";
const label = "label text-[11px] text-subtle";

/** Public information page for the FlowHQ research crawler (what it is, who runs it, how to reach the operator). */
export default function Page() {
  return (
    <Shell>
      <JsonLd graph={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Research crawler", path: "/research-bot/" }])]} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Research crawler" }]}
        eyebrow="Crawler information"
        title="FlowHQ Lead Research Crawler"
        intro="FlowHQ operates this crawler for authorized website research and lead-enrichment testing."
      >
        <></>
      </PageHero>
      <section className={`${band} bg-bg-soft !pt-0`}>
        <div className={`${wrap} max-w-[820px]`}>
          <Eyebrow>About this crawler</Eyebrow>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className={`${row} sm:col-span-2`}>
              <dt className={label}>Purpose</dt>
              <dd className="mt-2 text-[16px] leading-[1.7] text-text md:text-[17px]">
                Evaluate extraction of publicly accessible business information and the quality of lead-enrichment results.
              </dd>
            </div>
            <div className={row}>
              <dt className={label}>Operator</dt>
              <dd className="mt-2 text-[16px] text-text md:text-[17px]">FlowHQ</dd>
            </div>
            <div className={row}>
              <dt className={label}>Contact</dt>
              <dd className="mt-2 text-[16px] md:text-[17px]">
                <a href={`mailto:${OPERATOR_EMAIL}`} className="break-all text-text underline decoration-border-bright underline-offset-4 transition-colors hover:text-accent">
                  {OPERATOR_EMAIL}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-8 max-w-[62ch] text-[16px] leading-[1.75] text-muted md:text-[17px]">
            The crawler accesses public pages conservatively. It does not intentionally access login-protected content. Website access rules and
            applicable restrictions are respected.
          </p>
          <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.75] text-muted md:text-[17px]">
            For questions or requests about crawler activity, contact the operator using the email above.
          </p>
        </div>
      </section>
    </Shell>
  );
}
