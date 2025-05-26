import { XCircle, ArrowRight, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Add type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function PaymentFailed() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse URL parameters to get error details
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id') || `ERROR-${Date.now()}`;
    const amount = Number(queryParams.get('amount')) || 0;
    const plan = queryParams.get('plan') || 'Subscription Plan';
    const errorCode = queryParams.get('error_code') || 'unknown';
    
    // Send payment_failed event to Google Analytics
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'payment_failed',
      ecommerce: {
        transaction_id: orderId,
        value: amount,
        currency: 'INR',
        error_code: errorCode,
        items: [{
          item_name: plan,
          item_category: 'Subscription Plan',
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
          <div className="p-8 rounded-xl border border-red-500/20 bg-gradient-to-b from-red-900/5 to-black shadow-lg">
            <div className="flex flex-col items-center text-center">
              {/* Failure icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse"></div>
                <div className="relative">
                  <XCircle className="h-24 w-24 text-red-500" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">Payment Failed</h1>
              
              <p className="text-gray-300 mb-6">
                We're sorry, but your payment could not be processed at this time. No charges have been made to your account.
              </p>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6 text-left w-full">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <h2 className="text-yellow-500 font-medium">Common reasons for payment failure:</h2>
                </div>
                <ul className="space-y-2 text-gray-300 ml-7 list-disc">
                  <li>Incorrect payment details</li>
                  <li>Transaction declined by your bank</li>
                  <li>Network or connectivity issues</li>
                  <li>Payment gateway issues</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  className="bg-white hover:bg-gray-200 text-black font-medium flex items-center gap-2 flex-1"
                  onClick={() => navigate("/pricing")}
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
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

              <p className="text-gray-400 text-sm mt-6">
                Need help? <a href="mailto:support@marketmynds.com" className="text-finance-green hover:underline">Contact our support team</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 