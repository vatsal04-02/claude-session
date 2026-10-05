import AutomationList from "@/components/AutomationList";
import Faq from "@/components/Faq";
import ProblemCards from "@/components/ProblemCards";
import LiveDemoChat from "@/components/LiveDemoChat";
import ProductScreens from "@/components/ProductScreens";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
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
        <Manifesto />
        <WhatWeDo />
        <Workflow />
        <Services />
        <ProblemCards />
        <LiveDemoChat />
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
    </>
  );
}
