
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhatsInsideSection } from "@/components/WhatsInsideSection";
import { NoNoiseSection } from "@/components/NoNoiseSection";
import { DeliverySection } from "@/components/DeliverySection";
import { PlansSection } from "@/components/PlansSection";
import { DataDrivenSection } from "@/components/DataDrivenSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <WhatsInsideSection />
      <NoNoiseSection />
      <DeliverySection />
      <PlansSection />
      <DataDrivenSection />
      <Footer />
    </div>
  );
};

export default Index;
