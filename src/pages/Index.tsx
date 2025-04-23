
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PreviewSection } from "@/components/PreviewSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SubscriptionCTA } from "@/components/SubscriptionCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PreviewSection />
      <TestimonialsSection />
      <SubscriptionCTA />
      <Footer />
    </div>
  );
};

export default Index;
