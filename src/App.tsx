import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import RefundPolicy from "./pages/RefundPolicy";
import Upgrade from "./pages/Upgrade";
import KAICredits from "./pages/KAICredits";
import KAICreditsPaymentSuccess from "./pages/KAICreditsPaymentSuccess";
import KAICreditsPaymentFailed from "./pages/KAICreditsPaymentFailed";
import ReferProgram from "./pages/ReferProgram";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="dark">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/refund-policy" element={<RefundPolicy/>} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/kai-credits" element={<KAICredits />} />
            <Route path="/kai-credits-payment-success" element={<KAICreditsPaymentSuccess />} />
            <Route path="/kai-credits-payment-failed" element={<KAICreditsPaymentFailed />} />
            <Route path="/refer-program" element={<ReferProgram />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
