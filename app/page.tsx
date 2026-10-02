import DemoModal from "@/components/DemoModal";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import ProductPreview from "@/components/ProductPreview";
import Services from "@/components/Services";
import WhatWeDo from "@/components/WhatWeDo";
import WhyFlowHQ from "@/components/WhyFlowHQ";
import Work from "@/components/Work";
import Workflow from "@/components/Workflow";
import { ScrollProgress } from "@/components/ui";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <Workflow />
        <Services />
        <WhyFlowHQ />
        <ProductPreview />
        <Work />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
      <DemoModal />
    </>
  );
}
