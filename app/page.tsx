import Capabilities from "@/components/Capabilities";
import DemoModal from "@/components/DemoModal";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductPreview from "@/components/ProductPreview";
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
        <Workflow />
        <Capabilities />
        <Work />
        <ProductPreview />
        <FinalCTA />
      </main>
      <Footer />
      <DemoModal />
    </>
  );
}
