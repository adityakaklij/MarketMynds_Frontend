import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ReferEarnSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-finance-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-finance-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-finance-green/10 text-finance-green mb-4">
            <span className="mr-2">💰</span>
            <span className="font-medium">EARN REAL CASH</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Refer Friends & <span className="text-finance-green">Earn Cash</span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-8 md:mb-10">
            Earn flat 20% for every friend who joins MarketMynds with your referral.
            No limits on earnings, withdraw directly to your bank account.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <Button
              className="bg-finance-green hover:bg-finance-green/90 text-black text-lg px-8 py-6 h-5 w-full md:w-auto"
              onClick={() => navigate("/refer-program")}
            >
              Get Your Referral Link
            </Button>
            
            {/* <Button
              variant="outline" 
              className="border-gray-700 hover:bg-gray-800 text-lg px-8 py-6 h-5 w-full md:w-auto"
              onClick={() => navigate("/how-it-works")}
            >
              Learn More
            </Button> */}
          </div>
          
          <div className="mt-10 flex items-center justify-center">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-black flex items-center justify-center text-xs font-medium">JD</div>
              <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-black flex items-center justify-center text-xs font-medium">AR</div>
              <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-black flex items-center justify-center text-xs font-medium">SK</div>
            </div>
            <span className="ml-3 text-gray-300">
              <span className="text-finance-green font-medium">124+</span> users are already earning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
