import { BadgeIndianRupee, Receipt, Download, FileCheck, User, Mail, MessageSquare, AlertCircle, Clock, Sparkles, UserCheck, Tag } from "lucide-react";
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
`;

// Add type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

const plans = [
  
  // {
  //   title: "3 Months",
  //   price: 249,
  //   description: "Save 16% - Full access for 3 months.",
  //   bonus: false,
  //   planId: "2"
  // },
  {
    title: "12 Months",
    price: 649,
    description: "Full access for 12 months.",
    bonus: true,
    planId: "4"
  },
  {
    title: "6 Months",
    price: 449,
    description: "Full access for 6 months.",
    bonus: false,
    planId: "3"
  },

  {
    title: "1 Month",
    price: 99,
    description: "Try for one month.",
    bonus: false,
    planId: "1"
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState({title: "1 Month",
                    price: 99,
                    description: "Full pre-market access for 30 days.",
                    bonus: true,
                    planId: "1"});
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [remainingSpots, setRemainingSpots] = useState(200);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [showCouponField, setShowCouponField] = useState(false);
  
  // Form validation states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    whatsappNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Data events.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        items: [{
          item_name: plan?.title,
          item_category: 'Subscription Plan',
          price: plan?.price
        }]
      }
    });

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

    // WhatsApp number validation (allow international format)
    if (!whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
      isValid = false;
    } else if (!/^\+?\d{8,15}$/.test(whatsappNumber.replace(/\s/g, ''))) {
      newErrors.whatsappNumber = "Please enter a valid number without country code (e.g. 9876543210)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setValidatingCoupon(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/validate-coupon`, {
        coupon_code: couponCode,
        amount: selectedPlan.price,
        email: email,
        plan: selectedPlan.planId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("response",response);

      if (response.data.status === "success") {
        const newDiscountedPrice = response.data.data.final_amount || 0;
        setDiscountedPrice(newDiscountedPrice);
        
        // Calculate discount percentage
        // const originalPrice = selectedPlan.price || 0;
        // const discount = originalPrice - newDiscountedPrice;
        // const percentage = Math.round((discount / originalPrice) * 100);
        // setDiscountPercentage(isNaN(percentage) ? 0 : percentage);
        setDiscountPercentage(response.data.data.discount_percentage);
        console.log("discount_percentage",response.data.data.discount_percentage);
        
        // setCouponSuccess(`Coupon applied successfully! (${isNaN(percentage) ? 0 : percentage}% off)`);
        setCouponSuccess(`Coupon applied successfully! (${response.data.data.discount_percentage}% off)`);
      } else {
        setCouponError(response.data.message || "Invalid coupon");
        setDiscountedPrice(0);
        setDiscountPercentage(0);
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setCouponError(error.response.data.message);
      } else {
        setCouponError("Failed to validate coupon. Please try again.");
      }
      setDiscountedPrice(0);
      setDiscountPercentage(0);
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handlePayment = async () => {
    if (validateForm()) {
      setProcessingPayment(true);

      // Event Events.
      window.dataLayer.push({
        event: 'add_payment_info',
        ecommerce: {
          payment_type: 'Online Payment',
          items: [{
            item_name: selectedPlan.title,
            item_category: 'Subscription Plan',
            price: discountedPrice > 0 ? discountedPrice : selectedPlan.price
          }]
        }
      });
    
      // Get referral code from state (which was populated from localStorage)
      const refCode = referralCode || '';

      let makePayment = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/make-payment`, {
        name: name,
        email: email,
        mobile: whatsappNumber,
        plan: selectedPlan.planId,
        amount: discountedPrice > 0 ? discountedPrice : selectedPlan.price,
        referralCode: refCode, // Send referral code with payment data
        couponCode: couponSuccess ? couponCode : "", // Send coupon code only if it was successfully applied
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log("makePayment",makePayment);
      if (makePayment.data.data?.redirect_url) {
        window.location.href = makePayment.data.data.redirect_url;
      } else {
        console.error("No redirect URL received from payment API");
        // Fallback to a generic payment error page or show an error message
        alert("Payment processing error. Please try again or contact support.");
      }
      setProcessingPayment(false);
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
          className="relative rounded-xl border-2 border-gray-700 p-1 bg-gradient-to-b from-black to-finance-blue/20 shadow-xl opacity-90"
        >
          {/* Sold Out Overlay */}
          {/* <div className="absolute inset-0  flex items-center justify-center z-20 rounded-xl">
            <div className="bg-red-600 text-white px-8 py-4 rounded-full transform rotate-12 text-2xl font-extrabold shadow-lg">
              SOLD OUT
            </div>
          </div> */}
          
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
                    Lifetime Access*
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
                    <span className="text-gray-200">Limited time offer - SOLD OUT!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="text-finance-green h-4 w-4" />
                    <span className="text-gray-200">
                      All 200 spots have been claimed
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-none">
                <Button 
                  className="bg-gray-700 text-gray-300 font-bold text-lg px-8 py-6 rounded-xl shadow-lg cursor-not-allowed"
                  disabled={true}
                >
                  Sold Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Regular plans */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
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
      <Dialog open={paymentOpen} onOpenChange={(open) => {
        setPaymentOpen(open);
        if (!open) {
          // Reset coupon state when dialog closes
          setCouponCode("");
          setDiscountedPrice(0);
          setCouponError("");
          setCouponSuccess("");
          setDiscountPercentage(0);
          setShowCouponField(false);
        }
      }}>
        <DialogContent className="bg-black border border-finance-green/20 text-white max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-finance-green">
              {selectedPlan && `${selectedPlan.title} Plan`}
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              {selectedPlan && selectedPlan.description}
            </DialogDescription>
          </DialogHeader>

          {/* Price display section */}
          <div className="my-6 text-center">
            {discountedPrice > 0 ? (
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-3 mb-1">
                  <div className="relative">
                    <span className="text-2xl font-bold text-gray-400">₹{selectedPlan?.price}</span>
                    <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -rotate-12"></span>
                  </div>
                  <span className="text-3xl font-extrabold text-finance-green">₹{discountedPrice}</span>
                  <span className="text-xs font-medium bg-finance-green/10 text-finance-green py-0.5 px-2 rounded-full">
                    {discountPercentage}% OFF
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-5xl font-extrabold mb-2">₹{selectedPlan && selectedPlan.price}</div>
            )}
            <div className="text-gray-400 text-sm mt-2">One-time payment. No auto-renewal.</div>
          </div>

          {/* Form section */}
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
                  placeholder="e.g. 9876543210"
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

            {/* Coupon Code Section */}
            <div>
              {showCouponField || couponSuccess ? (
                <>
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-300 mb-1">Coupon Code</label>
                  <div className="flex space-x-2">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="coupon"
                        type="text"
                        placeholder="Enter coupon code"
                        className={`bg-gray-900 border-gray-700 focus:border-finance-green text-white pl-10 ${couponError ? 'border-red-500' : couponSuccess ? 'border-green-500' : ''}`}
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      />
                    </div>
                    <Button 
                      className="bg-finance-green hover:bg-finance-green/90 text-black font-semibold"
                      onClick={validateCoupon}
                      disabled={validatingCoupon}
                    >
                      {validatingCoupon ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      ) : "Apply"}
                    </Button>
                  </div>
                  {couponError && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {couponError}
                    </div>
                  )}
                  {couponSuccess && (
                    <div className="text-green-500 text-xs mt-1 flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Coupon applied successfully!
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setShowCouponField(true)}
                  className="text-finance-green text-sm flex items-center gap-1 hover:underline focus:outline-none mt-2"
                >
                  <Tag className="h-3.5 w-3.5" />
                  Add coupon code
                </button>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4 sm:mt-2">
            <Button
              className="bg-finance-green hover:bg-finance-green/90 text-black w-full font-semibold py-5"
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
                `Make Payment${discountedPrice > 0 ? ` - ₹${discountedPrice}` : ''}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
