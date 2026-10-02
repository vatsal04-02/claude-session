import DemoCTA from "@/components/DemoCTA";
import DemoModal from "@/components/DemoModal";
import FlowSystem from "@/components/FlowSystem";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Industries from "@/components/Industries";
import Navbar from "@/components/Navbar";
import ProblemSection from "@/components/ProblemSection";
import Process from "@/components/Process";
import ProductShowcase from "@/components/ProductShowcase";
import Projects from "@/components/Projects";
import Solutions from "@/components/Solutions";
import TrustStrip from "@/components/TrustStrip";
import WhyFlowHQ from "@/components/WhyFlowHQ";
import { ScrollProgress } from "@/components/ui";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <FlowSystem />
        <Solutions />
        <Projects />
        <ProductShowcase />
        <HowItWorks />
        <Industries />
        <WhyFlowHQ />
        <Process />
        <DemoCTA />
      </main>
      <Footer />
      <DemoModal />
    </>
  );
}
