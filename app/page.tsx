import CaseStudies from "@/components/CaseStudies";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import IntegrationsStrip from "@/components/IntegrationsStrip";
import LiveDemoChat from "@/components/LiveDemoChat";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import Problem from "@/components/Problem";
import Reviews from "@/components/Reviews";
import Socials from "@/components/Socials";
import ProofStrip from "@/components/ProofStrip";
import { ScrollProgress } from "@/components/ui";
import { HOME_FAQS } from "@/lib/faq";
import { faqPage, JsonLd, webPage } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Flow HQ | Custom Operational AI Systems, Lucknow";
const DESCRIPTION =
  "Custom operational AI systems built around how your business runs: workflows, AI assistants, integrations and dashboards that handle replies, bookings, approvals and reporting. Built in Lucknow.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
  socialTitle: "Flow HQ — Operations on autopilot.",
});

/* Section order: hero → integrations → proof → problem → features (bento) → the system (demo) → reviews → work → packages → founders → social links → FAQ → closing CTA + audit form.
   Proof and Work render nothing in production until their content in lib/content.ts is filled. */
export default function Home() {
  return (
    <>
      <JsonLd graph={[webPage({ path: "/", name: TITLE, description: DESCRIPTION, speakable: ["#hero-summary", "#faq-0"] }), faqPage(HOME_FAQS, "/")]} />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <IntegrationsStrip />
        <ProofStrip />
        <Problem />
        <Features />
        <LiveDemoChat />
        <Reviews />
        <CaseStudies />
        <Packages />
        <Founder />
        <Socials />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
