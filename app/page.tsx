import Faq from "@/components/Faq";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import LiveDemoChat from "@/components/LiveDemoChat";
import Manifesto from "@/components/Manifesto";
import Navbar from "@/components/Navbar";
import PipelineVideo from "@/components/PipelineVideo";
import ProblemCards from "@/components/ProblemCards";
import RoiCalculator from "@/components/RoiCalculator";
import WhyTrust from "@/components/WhyTrust";
import Workflow from "@/components/Workflow";
import { ScrollProgress } from "@/components/ui";
import { SHOW_FOUNDER } from "@/lib/site";
import { HOME_FAQS } from "@/lib/faq";
import { faqPage, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Flow HQ | Custom AI Automation Systems for Growing Businesses",
  description:
    "Flow HQ builds custom AI and automation systems that reduce manual work, connect your tools, and put repetitive business processes on autopilot.",
  path: "/",
  socialTitle: "Flow HQ — Put your business on autopilot.",
});

export default function Home() {
  return (
    <>
      <JsonLd graph={[faqPage(HOME_FAQS, "/")]} />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Manifesto />
        <PipelineVideo />
        <ProblemCards />
        <Workflow />
        <RoiCalculator />
        <LiveDemoChat />
        <FinalCTA />
        {SHOW_FOUNDER && <Founder />}
        <WhyTrust />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
