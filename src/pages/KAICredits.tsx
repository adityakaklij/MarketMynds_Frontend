import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface CreditPlan {
  credits: number;
  price: number;
  discount?: number;
  popular?: boolean;
}

export default function KAICredits() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<CreditPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const creditPlans: CreditPlan[] = [
    { credits: 10, price: 99 },
    { credits: 25, price: 199, discount: 20, popular: true },
    { credits: 50, price: 349, discount: 30 },
    { credits: 100, price: 599, discount: 40 },
  ];

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    
    if (value && !validatePhoneNumber(value)) {
      setPhoneError('Please enter a valid 10-digit mobile number');
    } else {
      setPhoneError('');
    }
  };

  const handlePlanSelect = (credits: string) => {
    const plan = creditPlans.find(p => p.credits === parseInt(credits));
    setSelectedPlan(plan || null);
  };

  const calculateOriginalPrice = (plan: CreditPlan) => {
    if (!plan.discount) return plan.price;
    return Math.round(plan.price / (1 - plan.discount / 100));
  };

  const handlePayment = async () => {
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a credit plan",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/make-payment', {
        phone: phoneNumber,
        amount: selectedPlan.price,
        credits: selectedPlan.credits,
        product: 'kai_credits'
      });

      if (response.data.status === 'success') {
        window.location.href = response.data.payment_url;
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-finance-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-finance-green/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-finance-green/10 text-finance-green mb-4">
              <span className="mr-2">🔋</span>
              <span className="font-medium">POWER UP</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Get <span 
                className="relative"
                style={{
                  background: 'linear-gradient(90deg, #00D166, #0099FF, #00D166)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite',
                  textShadow: '0 0 20px rgba(0, 209, 102, 0.3)',
                }}
              >
                KAI
              </span> Credits
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Purchase credits to unlock the power of MarketMynds KAI. Each credit lets you analyze one stock with our AI assistant.
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="phone" className="text-white">WhatsApp Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className={`bg-gray-800 border-gray-700 text-white mt-1 ${phoneError ? 'border-red-500' : ''}`}
                  maxLength={10}
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                <p className="text-xs text-gray-400 mt-1">We'll send your credits to this WhatsApp number</p>
              </div>
              
              <div>
                <Label htmlFor="credits" className="text-white">Select Credits Package</Label>
                <Select onValueChange={handlePlanSelect}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                    <SelectValue placeholder="Select credits" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {creditPlans.map((plan) => (
                      <SelectItem key={plan.credits} value={plan.credits.toString()} className="focus:bg-gray-700">
                        <div className="flex items-center justify-between w-full">
                          <span>{plan.credits} Credits</span>
                          <span className="flex items-center">
                            ₹{plan.price}
                            {plan.popular && (
                              <span className="ml-2 px-2 py-0.5 bg-finance-green/20 text-finance-green text-xs rounded-full">
                                Popular
                              </span>
                            )}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPlan && (
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-lg mb-2">Your Selected Package</h3>
                  <div className="flex justify-between mb-1">
                    <span>Credits:</span>
                    <span className="font-medium">{selectedPlan.credits} credits</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Price:</span>
                    <div>
                      {selectedPlan.discount ? (
                        <div className="text-right">
                          <span className="line-through text-gray-400 mr-2">₹{calculateOriginalPrice(selectedPlan)}</span>
                          <span className="font-medium">₹{selectedPlan.price}</span>
                          <span className="ml-2 px-2 py-0.5 bg-finance-green/10 text-finance-green text-xs rounded-full">
                            Save {selectedPlan.discount}%
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium">₹{selectedPlan.price}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Price per credit:</span>
                    <span>₹{(selectedPlan.price / selectedPlan.credits).toFixed(2)}</span>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full bg-finance-green hover:bg-finance-green/90 text-black font-medium"
                onClick={handlePayment}
                disabled={isLoading || !selectedPlan || !phoneNumber || !!phoneError}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${selectedPlan?.price || '0'}`
                )}
              </Button>
              
              <div className="text-center text-sm text-gray-400">
                <p className="mt-2">Need help? <a href="https://wa.me/+918062960996" target="_blank" rel="noopener noreferrer" className="text-finance-green hover:underline">Contact support</a></p>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mt-16">
            <h3 className="text-xl font-semibold text-center mb-8">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h4 className="font-medium mb-2">What are KAI credits?</h4>
                <p className="text-gray-300">KAI credits allow you to analyze stocks with our AI assistant. Each credit lets you request one stock analysis through WhatsApp.</p>
              </div>
              
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h4 className="font-medium mb-2">How do I use my credits?</h4>
                <p className="text-gray-300">After purchase, your credits will be linked to your WhatsApp number. Simply message any stock name to our WhatsApp bot to use a credit.</p>
              </div>
              
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h4 className="font-medium mb-2">Do credits expire?</h4>
                <p className="text-gray-300">No, your KAI credits never expire. Use them at your own pace whenever you need stock analysis.</p>
              </div>
              
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h4 className="font-medium mb-2">Can I get a refund?</h4>
                <p className="text-gray-300">Due to the digital nature of our service, we cannot offer refunds once credits are purchased. Please contact support if you have any issues.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
