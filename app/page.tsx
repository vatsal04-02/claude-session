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
        <Workflow />
        <PipelineVideo />
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
