import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { 
  User, 
  Mail, 
  MessageSquare, 
  AlertCircle, 
  ArrowLeft, 
  Tag,
  Sparkles,
  BadgeIndianRupee,
  Shield
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Add type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Add animation keyframes CSS
const animationStyles = `
  @keyframes pulse-border {
    0% { box-shadow: 0 0 0 0 rgba(0, 209, 102, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(0, 209, 102, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 209, 102, 0); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

// List of Indian states
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState<any>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [state, setState] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [showCouponField, setShowCouponField] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  
  // Form validation states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    state: "",
    consent: ""
  });
  
  // Cashfree SDK
  const [cashfreeSDK, setCashfreeSDK] = useState<any>(null);

  // Get plan data from location state
  useEffect(() => {
    const state = location.state;
    if (!state || !state.plan) {
      // Redirect back to pricing if no plan data
      navigate("/pricing");
      return;
    }
    
    setPlanData(state.plan);
    
    // Check for referral code in localStorage
    const storedRefCode = localStorage.getItem('referralCode');
    if (storedRefCode) {
      setReferralCode(storedRefCode);
    }
    
    // Initialize Cashfree SDK
    const initializeSDK = async () => {
      try {
        const cfSDK = await load({
          // mode: "sandbox" // Use production mode
          mode: "production" // Use production mode
        });
        setCashfreeSDK(cfSDK);
      } catch (error) {
        console.error("Error initializing Cashfree SDK:", error);
      }
    };
    
    initializeSDK();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [location, navigate]);

  // Form validation
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      whatsappNumber: "",
      state: "",
      consent: ""
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
    
    // State validation
    if (!state) {
      newErrors.state = "Please select your state";
      isValid = false;
    }

    // Consent validation
    if (!consentChecked) {
      newErrors.consent = "You must agree to the terms and privacy policy";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Coupon validation
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
        amount: planData?.price || 0,
        email: email,
        plan: planData?.planId || ""
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === "success") {
        const newDiscountedPrice = response.data.data.final_amount || 0;
        setDiscountedPrice(newDiscountedPrice);
        setDiscountPercentage(response.data.data.discount_percentage);
        
        if (response.data.data.discount_percentage === 100) {
          // Special handling for 100% off coupons
          setCouponSuccess(`Coupon applied successfully! (100% off - FREE)`);
        } else {
          setCouponSuccess(`Coupon applied successfully! (${response.data.data.discount_percentage}% off)`);
        }
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

  // Handle payment
  const handlePayment = async () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector('.text-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    try {
      setProcessingPayment(true);

      // Get final price after any discounts
      const finalPrice = discountedPrice > 0 ? discountedPrice : planData?.price;
      
      // Check if this is a 100% discount (free)
      const isFreeOrder = discountPercentage === 100 || finalPrice === 0;

      // Event tracking
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'add_payment_info',
        ecommerce: {
          payment_type: isFreeOrder ? 'Free (Coupon)' : 'Online Payment',
          items: [{
            item_name: planData?.title,
            item_category: 'Subscription Plan',
            price: finalPrice
          }]
        }
      });

      // Handle 100% discount case separately
      if (isFreeOrder) {
        // For 100% discount orders, call the free coupon API
        try {
          const freeCouponResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/process-free-coupon`, {
            name: name,
            email: email,
            mobile: whatsappNumber,
            coupon_code: couponCode,
            plan: planData?.planId,
            state: state
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (freeCouponResponse.data.status === "success") {
            // Free coupon successfully processed
            const transactionId = freeCouponResponse.data.data.transaction_id;
            const planName = freeCouponResponse.data.data.plan_name;
            
            // Construct URL params for success page
            const successParams = new URLSearchParams({
              payment_id: transactionId,
              amount: "0",
              plan: planName || planData?.title || "Subscription"
            }).toString();
            
            // Redirect to success page
            navigate(`/payment-success?${successParams}`);
          } else {
            // Error in processing free coupon
            throw new Error(freeCouponResponse.data.message || "Free coupon processing failed");
          }
        } catch (error) {
          console.error("Free coupon processing error:", error);
          
          // Show specific error message from API if available
          let errorMessage = "Free coupon processing failed. Please try again or contact support.";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          alert(errorMessage);
        }
        
        setProcessingPayment(false);
        return; // Exit early for free orders
      }
      
      // Normal payment flow for non-free orders
      // Get referral code from state
      const refCode = referralCode || '';

      // Step 1: Get payment session ID from backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/make-payment`, {
        name: name,
        email: email,
        mobile: whatsappNumber,
        state: state,
        plan: planData?.planId,
        amount: finalPrice,
        referralCode: refCode, 
        couponCode: couponSuccess ? couponCode : ""
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Step 2: Check if we received a valid payment session ID
      if (!response.data.data) {
        throw new Error("No payment session ID received");
      }
      
      const paymentSessionId = response.data.data;

      // Step 3: Initialize Cashfree checkout
      if (!cashfreeSDK) {
        throw new Error("Cashfree SDK not initialized");
      }
      
      // Step 4: Configure checkout options
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_self", // Load in the same window
      };
      
      // Step 5: Trigger Cashfree checkout
      cashfreeSDK.checkout(checkoutOptions);
      
    } catch (error) {
      console.error("Payment error:", error);
      setProcessingPayment(false);
      alert("Payment processing error. Please try again or contact support.");
    }
  };

  // Go back to pricing page
  const goBack = () => {
    navigate("/pricing");
  };

  if (!planData) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-finance-green border-t-transparent rounded-full"></div>
    </div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-20 pb-20">
        {/* Add animation styles */}
        <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
        
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <button 
            onClick={goBack}
            className="flex items-center text-gray-400 hover:text-finance-green mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to plans
          </button>
          
          {/* Page title */}
          <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Purchase</h1>
          
          {/* Plan summary card */}
          <div className="rounded-xl border border-finance-green/20 bg-gradient-to-b from-finance-blue/5 to-black p-6 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <BadgeIndianRupee className="text-finance-green h-5 w-5" />
              <h2 className="text-xl font-semibold">{planData.title} Plan</h2>
              
              {planData.title === "1 Year" && (
                <span className="ml-auto px-2 py-1 rounded bg-finance-green/10 text-finance-green text-xs font-medium">
                  BEST VALUE
                </span>
              )}
              
              {planData.title === "Lifetime" && (
                <span className="ml-auto px-2 py-1 rounded bg-finance-green/10 text-finance-green text-xs font-medium">
                  ON DEMAND
                </span>
              )}
            </div>
            
            {/* Price display */}
            <div className="mb-4">
              {discountedPrice > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="text-xl font-bold text-gray-400">₹{planData.price}</span>
                    <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -rotate-12"></span>
                  </div>
                  {discountPercentage === 100 ? (
                    <span className="text-2xl font-extrabold text-finance-green animate-pulse">FREE</span>
                  ) : (
                    <span className="text-2xl font-extrabold text-finance-green">₹{discountedPrice}</span>
                  )}
                  <span className={`text-xs font-medium ${discountPercentage === 100 ? 'bg-finance-green/20' : 'bg-finance-green/10'} text-finance-green py-0.5 px-2 rounded-full`}>
                    {discountPercentage}% OFF
                  </span>
                </div>
              ) : planData.originalPrice ? (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="text-xl font-bold text-gray-400">₹{planData.originalPrice}</span>
                    <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -rotate-12"></span>
                  </div>
                  <span className="text-2xl font-extrabold text-finance-green">₹{planData.price}</span>
                  <span className="text-xs font-medium bg-finance-green/10 text-finance-green py-0.5 px-2 rounded-full">
                    {Math.round(((planData.originalPrice - planData.price) / planData.originalPrice) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <div className="text-2xl font-extrabold text-finance-green">₹{planData.price}</div>
              )}
            </div>
            
            {/* Plan description */}
            <div className="text-gray-300 text-sm">
              <p>{planData.description.split('. ')[0]}</p>
              
              {/* KAI credits */}
              {planData.title === "Lifetime" ? (
                <div className="flex items-center gap-1 mt-2">
                  <Sparkles className="text-finance-green h-3.5 w-3.5 flex-shrink-0" />
                  <span>Includes 300 KAI credits every 3 months</span>
                </div>
              ) : planData.description.includes('Includes') && (
                <div className="flex items-center gap-1 mt-2">
                  <Sparkles className="text-finance-green h-3.5 w-3.5 flex-shrink-0" />
                  <span>Includes {
                    planData.title.includes("3 Months") ? "20" : 
                    planData.title.includes("6 Months") ? "50" : 
                    "100"
                  } KAI credits</span>
                </div>
              )}
              
              <div className="flex items-center gap-1 mt-2">
                <Shield className="text-finance-green h-3.5 w-3.5 flex-shrink-0" />
                <span>One-time payment. No auto-renewal. 3-day refund window.</span>
              </div>
            </div>
          </div>
          
          {/* Payment form */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Your Details</h3>
            
            {/* Name field */}
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
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim()) {
                      setErrors(prev => ({...prev, name: ""}));
                    }
                  }}
                />
              </div>
              {errors.name && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>
            
            {/* Email field */}
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.trim() && /\S+@\S+\.\S+/.test(e.target.value)) {
                      setErrors(prev => ({...prev, email: ""}));
                    }
                  }}
                />
              </div>
              {errors.email && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
            
            {/* WhatsApp field */}
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
                  onChange={(e) => {
                    setWhatsappNumber(e.target.value);
                    if (e.target.value.trim() && /^\+?\d{8,15}$/.test(e.target.value.replace(/\s/g, ''))) {
                      setErrors(prev => ({...prev, whatsappNumber: ""}));
                    }
                  }}
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
            
            {/* State field */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">State</label>
              <Select 
                onValueChange={(value) => {
                  setState(value);
                  setErrors(prev => ({...prev, state: ""}));
                }} 
                value={state}
              >
                <SelectTrigger 
                  id="state"
                  className={`bg-gray-900 border-gray-700 focus:border-finance-green text-white ${errors.state ? 'border-red-500' : ''}`}
                >
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent className="max-h-60 bg-gray-900 border-gray-700 text-white">
                  {indianStates.map((stateName) => (
                    <SelectItem key={stateName} value={stateName} className="focus:bg-gray-800 focus:text-white">
                      {stateName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.state}
                </div>
              )}
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
                    <div className={`${discountPercentage === 100 ? "text-finance-green font-medium" : "text-green-500"} text-xs mt-1 flex items-center`}>
                      <Sparkles className="h-3 w-3 mr-1" />
                      {discountPercentage === 100 
                        ? "100% discount applied! You'll get free access." 
                        : "Coupon applied successfully!"
                      }
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setShowCouponField(true)}
                  className="text-finance-green text-sm flex items-center gap-1 hover:underline focus:outline-none"
                >
                  <Tag className="h-3.5 w-3.5" />
                  Add coupon code
                </button>
              )}
            </div>
            
            {/* Consent Checkbox */}
            <div className="mt-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="consent" 
                  checked={consentChecked} 
                  onCheckedChange={(checked) => {
                    setConsentChecked(checked === true);
                    if (checked === true) {
                      setErrors(prev => ({...prev, consent: ""}));
                    }
                  }}
                  className={`mt-1 ${errors.consent ? 'border-red-500' : ''}`}
                />
                <label 
                  htmlFor="consent" 
                  className="text-sm text-gray-300 cursor-pointer"
                >
                  I agree to the <Link to="/terms" className="text-finance-green hover:underline" target="_blank">Terms of Service</Link> and <Link to="/privacy-policy" className="text-finance-green hover:underline" target="_blank">Privacy Policy</Link>.
                </label>
              </div>
              {errors.consent && (
                <div className="text-red-500 text-xs mt-1 flex items-center pl-6">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.consent}
                </div>
              )}
            </div>
            
            {/* Payment button */}
            <div className="pt-4">
              <Button
                className="bg-finance-green hover:bg-finance-green/90 text-black w-full font-semibold py-6 text-lg rounded-lg"
                onClick={handlePayment}
                disabled={processingPayment}
              >
                {processingPayment ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {discountPercentage === 100 ? "Processing Order..." : "Processing Payment..."}
                  </div>
                ) : (
                  discountPercentage === 100 ? "Get Free Access" : `Pay ₹${discountedPrice > 0 ? discountedPrice : planData.price}`
                )}
              </Button>
              
              {/* Secure payment note */}
              {/* <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                <Shield className="h-3 w-3" />
                Secure payment via Cashfree
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
