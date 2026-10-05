import Faq from "@/components/Faq";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import LiveDemoChat from "@/components/LiveDemoChat";
import Manifesto from "@/components/Manifesto";
import Navbar from "@/components/Navbar";
import ProblemCards from "@/components/ProblemCards";
import RoiCalculator from "@/components/RoiCalculator";
import WhatWeBuild from "@/components/WhatWeBuild";
import Workflow from "@/components/Workflow";
import { ScrollProgress } from "@/components/ui";
import { SHOW_FOUNDER } from "@/lib/site";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <ProblemCards />
        <WhatWeBuild />
        <Workflow />
        <RoiCalculator />
        <LiveDemoChat />
        <FinalCTA />
        {SHOW_FOUNDER && <Founder />}
        <Faq />
      </main>
      <Footer />
    </>
  );
}
