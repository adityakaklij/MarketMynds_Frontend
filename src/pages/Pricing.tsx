import { BadgeIndianRupee, Receipt, Download, FileCheck, Clock, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";



// Add animation keyframes CSS
const animationStyles = `
  @keyframes pulse-border {
    0% { box-shadow: 0 0 0 0 rgba(0, 209, 102, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(0, 209, 102, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 209, 102, 0); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  @keyframes subtle-glow {
    0% { box-shadow: 0 0 5px 0 rgba(0, 209, 102, 0.3); }
    50% { box-shadow: 0 0 15px 0 rgba(0, 209, 102, 0.5); }
    100% { box-shadow: 0 0 5px 0 rgba(0, 209, 102, 0.3); }
  }
`;

// Add type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Add type for plan
interface Plan {
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  bonus: boolean;
  planId: string;
}

const plans: Plan[] = [
  
  
  {
    title: "1 Year",
    price: 649,
    originalPrice: 1399,
    description: "Full access for 1 year. Includes 100 KAI credits.",
    bonus: true,
    planId: "4"
  },
  {
    title: "6 Months",
    price: 449,
    originalPrice: 749,
    description: "Full access for 6 months. Includes 50 KAI credits.",
    bonus: false,
    planId: "3"
  },
  // {
  //   title: "Lifetime",
  //   price: 1999,
  //   description: "Lifetime access*. \n Only for next 200 users.",
  //   bonus: false,
  //   planId: "5"
  // },
  {
    title: "3 Months",
    price: 349,
    originalPrice: 449,
    description: "Full access for 3 months. Includes 20 KAI credits.",
    bonus: false,
    planId: "2"
  },

  // {
  //   title: "1 Month",
  //   price: 99,
  //   description: "Try for one month.",
  //   bonus: false,
  //   planId: "1"
  // },
];

export default function Pricing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [remainingSpots, setRemainingSpots] = useState(200);
  const [referralCode, setReferralCode] = useState("");

  // Check for referral code in URL and save to localStorage
  useEffect(() => {
    // Parse the URL search params
    const queryParams = new URLSearchParams(location.search);
    const refCode = queryParams.get('ref');
    
    // If referral code exists in URL, save it to localStorage
    if (refCode) {
      localStorage.setItem('referralCode', refCode);
      setReferralCode(refCode);
    } else {
      // If no code in URL, check localStorage
      const storedRefCode = localStorage.getItem('referralCode');
      if (storedRefCode) {
        setReferralCode(storedRefCode);
      }
    }
  }, [location]);

  const handlePlanSelect = (plan: Plan) => {
    // Data events.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        items: [{
          item_name: plan.title,
          item_category: 'Subscription Plan',
          price: plan.price
        }]
      }
    });

    // Instead of opening dialog, redirect to payment page with plan data
    navigate("/payment", { state: { plan } });
  };


  const downloadSampleReport = () => {
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = '/MarketMynds.pdf';
    link.download = 'MarketMynds-Sample-Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="pricing" className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
      {/* Add animation styles */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-1">Plans & Pricing</h1>
        <p className="mb-8 text-gray-300 text-lg">Simple, transparent pricing. No auto-renewals. 3-day refund window.</p>
      </div>
      
      {/* Lifetime Deal - Special Offer */}
      <div className="max-w-3xl mx-auto mb-12">
        <div 
          className="relative rounded-xl border-2 border-finance-green/40 p-1 bg-gradient-to-b from-black to-finance-blue/20 shadow-xl"
        >          
          <div className="absolute -top-4 -right-4 bg-finance-green text-black font-bold py-2 px-4 rounded-full shadow-lg z-10 transform rotate-12">
            ON DEMAND
          </div>
          
          <div className="rounded-lg p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-yellow-400 h-6 w-6" />
                  <h3 
                    className="text-3xl font-bold"
                    style={{
                      background: 'linear-gradient(90deg, #00D166, #0099FF, #00D166)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'shimmer 3s linear infinite',
                    }}
                  >
                    Lifetime Access*
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl font-extrabold text-finance-green">₹1999</span>
                </div>
                
                <p className="text-gray-300 mb-4">One-time payment, lifetime access - never pay again!</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="text-finance-green h-4 w-4" />
                    <span className="text-gray-200">Limited time offer - Few spots left!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="text-finance-green h-4 w-4" />
                    <span className="text-gray-200">
                      Limited to 200 members only.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-finance-green h-4 w-4" />
                    <span className="text-gray-200">
                      Includes 300 KAI credits every 3 months
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-none">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-finance-green to-finance-blue opacity-75 rounded-lg blur"></div>
                  <Button 
                    className="relative bg-finance-green hover:bg-finance-green/90 text-black/90 font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
                    onClick={() => handlePlanSelect({
                      title: "Lifetime",
                      price: 1999,
                      description: "Lifetime access*. Only for next 200 users.",
                      bonus: false,
                      planId: "5"
                    })}
                    style={{ animation: 'pulse-border 2s infinite' }}
                  >
                    Choose Lifetime
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Regular plans */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        {plans.map((plan) => {
          // Special rendering for Lifetime plan
          if (plan.title === "Lifetime") {
            return (
              <div key={plan.title} className="rounded-xl border border-finance-green/40 bg-[#0A0E17] p-8 flex flex-col items-center shadow-lg shadow-finance-green/10 relative overflow-hidden hover:border-finance-green/70 transition-all duration-300 hover:-translate-y-1"
                style={{ animation: 'subtle-glow 3s infinite' }}
              >
                {/* EXCLUSIVE banner */}
                <div 
                  className="absolute top-5 right-[-30px] bg-finance-green text-black font-bold py-1 transform rotate-45 text-xs text-center"
                  style={{ width: '120px' }}
                >
                  ON DEMAND
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <BadgeIndianRupee className="text-finance-green" />
                  <span className="text-2xl font-semibold">Lifetime</span>
                </div>
                
                <div 
                  className="text-3xl font-extrabold mb-2"
                  style={{
                    background: 'linear-gradient(90deg, #00D166, #3182ce, #00D166)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 3s linear infinite',
                  }}
                >
                  ₹1999
                </div>
                
                <div className="text-gray-400 mb-6">
                  <p>Lifetime access*. Only for next 200 users.</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Sparkles className="text-finance-green h-3.5 w-3.5 flex-shrink-0" />
                    <span>Includes 300 KAI credits every 3 months</span>
                  </div>
                </div>
                
                {/* <div className="w-full mb-4">
                  <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                    <span>Limited spots</span>
                    <span>{remainingSpots}/200 remaining</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-finance-green to-finance-blue h-full rounded-full" 
                      style={{ width: `${(remainingSpots / 200) * 100}%` }}
                    ></div>
                  </div>
                </div> */}
                
                <div className="w-full relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-finance-green to-finance-blue opacity-75 rounded-lg blur"></div>
                  <Button 
                    className="relative bg-finance-green hover:bg-finance-green/90 text-black/90 w-full font-semibold py-3"
                    onClick={() => handlePlanSelect(plan)}
                    style={{ animation: 'pulse-border 2s infinite' }}
                  >
                    Choose Lifetime
                  </Button>
                </div>
              </div>
            );
          }
          
          // Special rendering for 1 Year plan
          if (plan.title === "1 Year") {
            return (
              <div 
                key={plan.title} 
                className="rounded-xl border border-finance-green/30 bg-gradient-to-b from-finance-blue/5 to-black p-8 flex flex-col items-center shadow-lg shadow-finance-green/10 relative overflow-hidden hover:border-finance-green/70 transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: '0 0 15px 0 rgba(0, 209, 102, 0.1)' }}
              >
                {/* BEST VALUE sticker */}
                <div 
                  className="absolute top-5 right-[-30px] bg-finance-green text-black font-bold py-1 transform rotate-45 text-xs text-center"
                  style={{ width: '120px' }}
                >
                  BEST VALUE
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <BadgeIndianRupee className="text-finance-green" />
                  <span className="text-2xl font-semibold">{plan.title}</span>
                  <span className="ml-2 px-2 py-1 rounded bg-finance-green/10 text-finance-green text-xs font-medium">Save 54%</span>
                </div>
                
                {plan.originalPrice && (
                  <div className="flex flex-col items-center">
                    <div className="relative mb-1">
                      <span className="text-xl font-bold text-gray-400">₹{plan.originalPrice}</span>
                      <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -rotate-12"></span>
                    </div>
                    <div className="text-3xl font-extrabold text-finance-green mb-2">₹{plan.price}</div>
                  </div>
                )}
                
                <div className="text-gray-400 mb-6">
                  <p>{plan.description.split('. ')[0]}</p>
                  {plan.description.includes('Includes') && (
                    <div className="flex items-center gap-1 mt-2">
                      <Sparkles className="text-finance-green h-3.5 w-3.5 flex-shrink-0" />
                      <span>Includes {
                        plan.title.includes("3 Months") ? "20" : 
                        plan.title.includes("6 Months") ? "50" : 
                        "100"
                      } KAI credits</span>
                    </div>
                  )}
                </div>
                
                <div className="w-full relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-finance-green to-finance-blue opacity-50 rounded-lg"></div>
                  <Button 
                    className="relative bg-finance-green hover:bg-finance-green/90 text-black/90 w-full font-semibold py-3"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Choose {plan.title}
                  </Button>
                </div>
              </div>
            );
          }
          
          // Regular plan rendering
          return (
            <div key={plan.title} className="rounded-xl border border-finance-green/20 bg-gradient-to-b from-finance-blue/5 to-black p-8 flex flex-col items-center shadow-lg shadow-black/20">
              <div className="flex items-center gap-2 mb-2">
                <BadgeIndianRupee className="text-finance-green" />
                <span className="text-2xl font-semibold">{plan.title}</span>
                {plan.bonus && plan.title !== "1 Year" && (
                  <span className="ml-2 px-2 py-1 rounded bg-finance-green/10 text-finance-green text-xs font-medium">Save 54%</span>
                )}
              </div>
              {plan.originalPrice ? (
                <div className="flex flex-col items-center">
                  <div className="relative mb-1">
                    <span className="text-xl font-bold text-gray-400">₹{plan.originalPrice}</span>
                    <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -rotate-12"></span>
                  </div>
                  <div className="text-3xl font-extrabold text-finance-green mb-2">₹{plan.price}</div>
                </div>
              ) : (
                <div className="text-3xl font-extrabold mb-2">₹{plan.price}</div>
              )}
                <div className="text-gray-400 mb-6">
                  <p>{plan.description.split('. ')[0]}</p>
                  {plan.description.includes('Includes') && (
                    <div className="flex items-center gap-1 mt-2">
                      <Sparkles className="text-finance-green h-3.5 w-3.5 flex-shrink-0" />
                      <span>Includes {
                        plan.title.includes("3 Months") ? "20" : 
                        plan.title.includes("6 Months") ? "50" : 
                        "100"
                      } KAI credits</span>
                    </div>
                  )}
                </div>
              <Button 
                className="bg-finance-green hover:bg-finance-green/90 text-black/90 w-full font-semibold py-3"
                onClick={() => handlePlanSelect(plan)}
              >
                Choose {plan.title}
              </Button>
            </div>
          );
        })}
      </div>
      <div className="max-w-lg mx-auto text-center">
        <div className="text-lg font-medium flex items-center justify-center gap-2 mb-4">
          <Receipt className="text-finance-green" size={20} />No auto-renewals. 3-day refund window after purchase.
        </div>
        
        <div className="mt-6">
          {/* <Button 
            variant="outline" 
            className="border-finance-green/30 text-finance-green hover:bg-finance-green/10 flex items-center gap-2"
            onClick={downloadSampleReport}
          >
            <FileCheck size={16} />
            View Sample Report
          </Button> */}
        </div>
      </div>

    </div>
  );
}
