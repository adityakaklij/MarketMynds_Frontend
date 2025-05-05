import { BadgeIndianRupee, Receipt, Download, FileCheck, User, Mail, MessageSquare, AlertCircle, Clock, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
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
`;

const plans = [
  {
    title: "1 Month",
    price:99,
    description: "Full pre-market access, billed monthly.",
    bonus: false,
    planId: "1"
  },
  {
    title: "3 Months",
    price: 249,
    description: "Save 16% - Full access for 3 months.",
    bonus: false,
    planId: "2"
  },
  {
    title: "6 Months",
    price: 449,
    description: "Save 24% - Full access for 6 months.",
    bonus: false,
    planId: "3"
  },
  {
    title: "12 Months",
    price: 649,
    description: "Best value - Full access for 12 months.",
    bonus: true,
    planId: "4"
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [remainingSpots, setRemainingSpots] = useState(200);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Form validation states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    whatsappNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate spots decreasing randomly
  useEffect(() => {
    const randomDecrement = () => {
      const timeout = Math.floor(Math.random() * 20000) + 5000; // Random time between 5-25 seconds
      setTimeout(() => {
        setRemainingSpots(prev => {
          const newValue = Math.max(prev - 1, 1);
          return newValue;
        });
        if (remainingSpots > 1) randomDecrement();
      }, timeout);
    };
    
    randomDecrement();
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setPaymentOpen(true);
    // Reset form fields and errors when opening the dialog
    setName("");
    setEmail("");
    setWhatsappNumber("");
    setErrors({
      name: "",
      email: "",
      whatsappNumber: ""
    });
    setIsSubmitting(false);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      whatsappNumber: ""
    };
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // WhatsApp number validation
    if (!whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(whatsappNumber.replace(/\D/g, ''))) {
      newErrors.whatsappNumber = "Please enter a valid 10-digit number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePayment = async () => {
    if (validateForm()) {
      setProcessingPayment(true);

      // let makePayment = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/make-payment`, {
      let makePayment = await axios.post(`http://localhost:5001/api/make-payment`, {
        name: name,
        email: email,
        mobile: whatsappNumber,
        plan: selectedPlan.planId,
        amount: selectedPlan.price,
      },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })

      console.log("makePayment",makePayment);
      window.location.href = makePayment.data.data?.redirect_url
      setProcessingPayment(false);
      
      // Simulate payment processing with a random success/failure
      // setTimeout(() => {
      //   setProcessingPayment(false);
      //   setPaymentOpen(false);
        
      //   // For demo purposes: 80% success rate
      //   const isSuccessful = Math.random() < 0.8;
        
      //   if (isSuccessful) {
      //     navigate('/payment-success');
      //   } else {
      //     navigate('/payment-failed');
      //   }
      // }, 2000); // Simulate a 2-second payment process
    }
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
          className="relative rounded-xl border-2 border-finance-green p-1 bg-gradient-to-b from-black to-finance-blue/20 shadow-xl"
          style={{ 
            animation: 'pulse-border 2s infinite',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Corner badge */}
          <div className="absolute -top-4 -right-4 bg-finance-green text-black font-bold py-2 px-4 rounded-full shadow-lg z-10 transform rotate-12">
            EXCLUSIVE
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
                    Lifetime Access
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative">
                    {/* <span className="text-3xl font-extrabold">₹1,999</span> */}
                    <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -rotate-12"></span>
                  </div>
                  <span className="text-4xl font-extrabold text-finance-green">₹999</span>
                </div>
                
                <p className="text-gray-300 mb-4">One-time payment, lifetime access - never pay again!</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="text-finance-green h-4 w-4" />
                    <span className="text-gray-200">Limited time offer - ending soon!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="text-finance-green h-4 w-4" />
                    <span className="text-gray-200">
                      Only for first 200 Subscribers
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-none" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <Button 
                  className="bg-finance-green hover:bg-finance-green/90 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-finance-green/30"
                  onClick={() => handlePlanSelect({
                    title: "Lifetime",
                    price: 999,
                    description: "One-time payment, lifetime access to MarketMynds reports.",
                    bonus: true,
                    planId: "5"
                  })}
                >
                  Get Lifetime Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Regular plans */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
        {plans.map((plan) => (
          <div key={plan.title} className="rounded-xl border border-finance-green/20 bg-gradient-to-b from-finance-blue/5 to-black p-8 flex flex-col items-center shadow-lg shadow-black/20">
            <div className="flex items-center gap-2 mb-2">
              <BadgeIndianRupee className="text-finance-green" />
              <span className="text-2xl font-semibold">{plan.title}</span>
              {plan.bonus && (
                <span className="ml-2 px-2 py-1 rounded bg-finance-green/10 text-finance-green text-xs font-medium">Best Value</span>
              )}
            </div>
            <div className="text-3xl font-extrabold mb-2"> ₹{plan.price}</div>
            <div className="text-gray-400 mb-6">{plan.description}</div>
            <Button 
              className="bg-finance-green hover:bg-finance-green/90 text-black/90 w-full font-semibold"
              onClick={() => handlePlanSelect(plan)}
            >
              Choose {plan.title}
            </Button>
          </div>
        ))}
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

      {/* Payment Dialog */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="bg-black border border-finance-green/20 text-white max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-finance-green">
              {selectedPlan && `${selectedPlan.title} Plan`}
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              {selectedPlan && selectedPlan.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="text-center mb-4">
              <div className="text-3xl font-extrabold mb-2"> ₹{selectedPlan && selectedPlan.price}</div>
              <div className="text-gray-400 text-sm">One-time payment. No auto-renewal.</div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className={`bg-gray-900 border-gray-700 focus:border-finance-green text-white pl-10 ${errors.name ? 'border-red-500' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {errors.name && (
                  <div className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`bg-gray-900 border-gray-700 focus:border-finance-green text-white pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1">WhatsApp Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="Your WhatsApp number"
                    className={`bg-gray-900 border-gray-700 focus:border-finance-green text-white pl-10 ${errors.whatsappNumber ? 'border-red-500' : ''}`}
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                  />
                </div>
                {errors.whatsappNumber && (
                  <div className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.whatsappNumber}
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">We'll send reports to this WhatsApp number</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="bg-finance-green hover:bg-finance-green/90 text-black w-full font-semibold py-5 mt-2"
              onClick={handlePayment}
              disabled={processingPayment}
            >
              {processingPayment ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </div>
              ) : (
                'Make Payment'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
