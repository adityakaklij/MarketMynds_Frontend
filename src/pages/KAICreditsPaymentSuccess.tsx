import { CheckCircle, ArrowRight, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Add type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function KAICreditsPaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [transactionInfo, setTransactionInfo] = useState({
    id: '',
    amount: 0,
    credits: 0,
    phone: ''
  });
  
  useEffect(() => {
    // Parse URL parameters to get transaction details
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('payment_id') || `ORDER-${Date.now()}`;
    const amount = Number(queryParams.get('amount')) || 0;
    const credits = Number(queryParams.get('credits')) || 0;
    const phone = queryParams.get('phone') || '';
    
    setTransactionInfo({
      id: paymentId,
      amount,
      credits,
      phone
    });
    
    // Send purchase event to Google Analytics
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: paymentId,
        value: amount,
        currency: 'INR',
        items: [{
          item_name: `${credits} KAI Credits`,
          item_category: 'KAI Credits',
          price: amount
        }]
      }
    });
    
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 px-4 pb-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="p-8 rounded-xl border border-finance-green/20 bg-gradient-to-b from-finance-blue/5 to-black shadow-lg">
            <div className="flex flex-col items-center text-center">
              {/* Success animation */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-finance-green/20 animate-ping"></div>
                <div className="relative">
                  <CheckCircle className="h-24 w-24 text-finance-green" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">Credits Purchased!</h1>
              
              <p className="text-gray-300 mb-6">
                Your KAI credits have been successfully purchased and will be added to your account shortly.
              </p>

              {transactionInfo.id && (
                <div className="bg-finance-blue/10 border border-finance-blue/20 rounded-lg p-3 mb-6 w-full">
                  <p className="text-sm text-gray-300 flex justify-between">
                    <span className="text-finance-blue">Payment ID:</span> 
                    <span>{transactionInfo.id}</span>
                  </p>
                  <p className="text-sm text-gray-300 flex justify-between">
                    {/* <span className="text-finance-blue">Credits:</span>  */}
                    {/* <span>{transactionInfo.credits} KAI credits</span> */}
                  </p>
                  <p className="text-sm text-gray-300 flex justify-between">
                    {/* <span className="text-finance-blue">Amount:</span>  */}
                    {/* <span>₹{transactionInfo.amount}</span> */}
                  </p>
                  {transactionInfo.phone && (
                    <p className="text-sm text-gray-300 flex justify-between">
                      <span className="text-finance-blue">WhatsApp:</span> 
                      <span>+91 {transactionInfo.phone}</span>
                    </p>
                  )}
                </div>
              )}

              <div className="bg-finance-green/10 rounded-lg p-4 mb-6 text-left w-full">
                <h2 className="text-finance-green font-medium mb-2 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  What happens next?
                </h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Send className="h-5 w-5 text-finance-green flex-shrink-0 mt-0.5" />
                    <span>Your KAI credits will be credited to your WhatsApp number.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Send className="h-5 w-5 text-finance-green flex-shrink-0 mt-0.5" />
                    <span>You'll receive a confirmation message on WhatsApp shortly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Send className="h-5 w-5 text-finance-green flex-shrink-0 mt-0.5" />
                    <span>Start analyzing stocks by messaging any stock name to our WhatsApp bot.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  className="bg-finance-green hover:bg-finance-green/90 text-black font-medium flex items-center gap-2 flex-1"
                  onClick={() => navigate("/kai-credits")}
                >
                  Buy More Credits
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-white/5 flex items-center gap-2 flex-1"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
