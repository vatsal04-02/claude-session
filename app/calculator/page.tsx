import { PageHero, Shell } from "@/components/content";
import RoiCalculator from "@/components/RoiCalculator";
import { breadcrumbs, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Manual Work Cost Calculator | Flow HQ",
  description:
    "Estimate what slow replies and repetitive admin cost your business every month. A rough guide for small businesses — your real number comes from a free audit.",
  path: "/calculator/",
});

export default function Page() {
  return (
    <Shell>
      <JsonLd graph={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Calculator", path: "/calculator/" }])]} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Calculator" }]}
        eyebrow="Calculator"
        title="What is manual work costing you?"
        intro="Two costs hide in most businesses: hours spent on repetitive work, and enquiries nobody got to in time. Drag the sliders for a rough estimate — the defaults describe a small local business."
      >
        <></>
      </PageHero>
      <RoiCalculator auditHref="/#audit" heading={false} />
    </Shell>
  );
}
