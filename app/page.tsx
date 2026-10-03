import AutomationList from "@/components/AutomationList";
import Faq from "@/components/Faq";
import IndustryTabs from "@/components/IndustryTabs";
import LiveDemoChat from "@/components/LiveDemoChat";
import ProductScreens from "@/components/ProductScreens";
import RoiCalculator from "@/components/RoiCalculator";
import DemoModal from "@/components/DemoModal";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import ProductPreview from "@/components/ProductPreview";
import Services from "@/components/Services";
import WhatWeDo from "@/components/WhatWeDo";
import WhatYouGet from "@/components/WhatYouGet";
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
        <IndustryTabs />
        <LiveDemoChat />
        <RoiCalculator />
        <ProductScreens />
        <AutomationList />
        <WhyFlowHQ />
        <ProductPreview />
        <WhatYouGet />
        <Work />
        <Process />
        <FinalCTA />
        <Faq />
      </main>
      <Footer />
      <DemoModal />
    </>
  );
}
