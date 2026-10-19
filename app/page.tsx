import CaseStudies from "@/components/CaseStudies";
import Faq from "@/components/Faq";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import LiveDemoChat from "@/components/LiveDemoChat";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import Problem from "@/components/Problem";
import ProofStrip from "@/components/ProofStrip";
import { ScrollProgress } from "@/components/ui";
import { HOME_FAQS } from "@/lib/faq";
import { faqPage, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Flow HQ | AI Lead Capture & Follow-up Automation, Lucknow",
  description:
    "AI systems that capture leads from your website, WhatsApp, Instagram, calls and email — then follow up, book and update your CRM. Built in Lucknow.",
  path: "/",
  socialTitle: "Flow HQ — Never lose a lead again.",
});

/* Section order: hero → proof → problem → the system (demo) → work → packages → founders → FAQ → closing CTA + audit form.
   Proof and Work render nothing in production until their content in lib/content.ts is filled. */
export default function Home() {
  return (
    <>
      <JsonLd graph={[faqPage(HOME_FAQS, "/")]} />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Problem />
        <LiveDemoChat />
        <CaseStudies />
        <Packages />
        <Founder />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
