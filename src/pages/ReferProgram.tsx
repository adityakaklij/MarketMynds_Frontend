import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Copy, ChevronRight, PieChart, Users, CreditCard, TrendingUp, Award, Check, Loader2 } from "lucide-react";
import axios from "axios";

const ReferProgram: React.FC = () => {
  const [referrals, setReferrals] = useState<number>(5);
  const [selectedPlan, setSelectedPlan] = useState<string>("mixed");
  const [email, setEmail] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Form handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid mobile number",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format the mobile number with +91 prefix if not already included
      const formattedMobile = formData.mobile.startsWith('+') 
        ? formData.mobile 
        : `+91${formData.mobile}`;
      
      // Send data to the API endpoint
    //   const response = await axios.post('https://api.marketmynds.com/api/referral/register-interest', {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/referral/register-interest`, {
        name: formData.name,
        email: formData.email,
        mobile: formattedMobile
      });
      
      if (response.data.status === true) {
        toast({
          title: "Sign-up successful!",
          description: "Thank you for joining the referral program. We'll notify you once your account is verified.",
        });
        setFormSubmitted(true);
      } else {
        toast({
          title: "Something went wrong",
          description: response.data.message || "Please try again later",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Unable to process your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        mobile: ""
      });
    }
  };
  
  const plans = [
    { name: "Basic", price: 349, priceExcludingGST: Math.round(349/1.18), commission: 0.2 },
    { name: "Standard", price: 449, priceExcludingGST: Math.round(449/1.18), commission: 0.2 },
    { name: "Premium", price: 649, priceExcludingGST: Math.round(649/1.18), commission: 0.2 },
    { name: "Lifetime", price: 1999, priceExcludingGST: Math.round(1999/1.18), commission: 0.2 }
  ];
  
  const planDistribution: Record<string, number[]> = {
    "basic": [1, 0, 0, 0],
    "standard": [0, 1, 0, 0],
    "premium": [0, 0, 1, 0],
    "enterprise": [0, 0, 0, 1],
    "mixed": [0.4, 0.3, 0.2, 0.1]
  };
  
  const calculateEarnings = () => {
    const distribution = planDistribution[selectedPlan];
    
    return plans.reduce((total, plan, index) => {
      const numberOfReferrals = Math.round(referrals * distribution[index]);
      return total + (plan.priceExcludingGST * plan.commission * numberOfReferrals);
    }, 0);
  };
  
  // This function would be used after verification to generate a referral code
  const generateReferralCode = () => {
    return "MM" + Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Invitation sent!",
      description: `Your referral link has been sent to ${email}`,
    });
    
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-finance-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-finance-blue/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-finance-green/10 text-finance-green mb-4">
              <span className="mr-2">💸</span>
              <span className="font-medium">REFERRAL PROGRAM</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Share & Earn <span className="text-finance-green">Real Money</span>
            </h1>
            
              <p className="text-xl text-gray-300 mb-8">
                Earn 20% commission on every referral (calculated on pre-GST amount). No caps, no limits - the more friends you bring, the more you earn.
              </p>
            
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-800 mb-8">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                    <Input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Enter your full name"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="you@example.com"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Mobile Number</label>
                    <Input 
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleFormChange}
                      placeholder="+91 9XXXXXXXXX"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-finance-green hover:bg-finance-green/90 text-black"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Join Referral Program"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-finance-green/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-finance-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Registration Successful</h3>
                  <p className="text-gray-300 mb-4">
                    Thank you for joining our referral program. Your application has been received and is currently under review.
                  </p>
                  <p className="text-gray-400 text-sm">
                    You'll receive your unique referral link via email once your account is verified.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How the Referral Program Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our referral program is designed to be simple, transparent, and rewarding.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-finance-green rounded-full flex items-center justify-center text-black font-bold">
                1
              </div>
              <div className="mb-4">
                <Users className="h-8 w-8 text-finance-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Link</h3>
              <p className="text-gray-400">
                Share your unique referral link or code with friends, on social media, or anywhere you like.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-finance-green rounded-full flex items-center justify-center text-black font-bold">
                2
              </div>
              <div className="mb-4">
                <CreditCard className="h-8 w-8 text-finance-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Friends Subscribe</h3>
              <p className="text-gray-400">
                When your friends sign up and subscribe to any plan using your referral link, they become your referrals.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-finance-green rounded-full flex items-center justify-center text-black font-bold">
                3
              </div>
              <div className="mb-4">
                <TrendingUp className="h-8 w-8 text-finance-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Commission</h3>
              <p className="text-gray-400">
                You earn 20% commission on their subscription payment and any future purchases they make.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Program Benefits</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our referral program offers some of the most competitive benefits in the industry.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-finance-green flex items-center justify-center">
                    <Check className="h-5 w-5 text-black" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">20% Commission</h3>
                  <p className="text-gray-300 mt-1">Earn a generous 20% on all plans your referrals purchase (calculated on the amount excluding GST).</p>
                </div>
              </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-finance-green flex items-center justify-center">
                  <Check className="h-5 w-5 text-black" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Lifetime Commission</h3>
                <p className="text-gray-300 mt-1">Earn from all future purchases your referrals make.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-finance-green flex items-center justify-center">
                  <Check className="h-5 w-5 text-black" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">No Referral Limits</h3>
                <p className="text-gray-300 mt-1">Refer as many friends as you want. There's no cap on your earnings.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-finance-green flex items-center justify-center">
                  <Check className="h-5 w-5 text-black" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Real Cash Payouts</h3>
                <p className="text-gray-300 mt-1">Withdraw your earnings directly to your bank account.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section className="py-12 md:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Earnings Calculator</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">See how much you could earn through our referral program.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
              <Tabs defaultValue="calculator" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="calculator">Calculator</TabsTrigger>
                  <TabsTrigger value="plans">Commission Structure</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calculator" className="pt-6">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Referrals</label>
                      <div className="mb-4">
                        <Slider 
                          value={[referrals]} 
                          onValueChange={(value) => setReferrals(value[0])} 
                          min={1} 
                          max={1000} 
                          step={10}
                          className="py-4"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">1</span>
                        <span className="text-xl font-bold">{referrals} referrals</span>
                        <span className="text-sm text-gray-400">1000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Subscription Plan</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <Button 
                          variant={selectedPlan === "mixed" ? "default" : "outline"}
                          className={selectedPlan === "mixed" ? "bg-finance-green text-black hover:bg-finance-green/90" : "border-gray-700"}
                          onClick={() => setSelectedPlan("mixed")}
                        >
                          Mixed
                        </Button>
                        <Button 
                          variant={selectedPlan === "basic" ? "default" : "outline"}
                          className={selectedPlan === "basic" ? "bg-finance-green text-black hover:bg-finance-green/90" : "border-gray-700"}
                          onClick={() => setSelectedPlan("basic")}
                        >
                          Basic
                        </Button>
                        <Button 
                          variant={selectedPlan === "standard" ? "default" : "outline"}
                          className={selectedPlan === "standard" ? "bg-finance-green text-black hover:bg-finance-green/90" : "border-gray-700"}
                          onClick={() => setSelectedPlan("standard")}
                        >
                          Standard
                        </Button>
                        <Button 
                          variant={selectedPlan === "premium" ? "default" : "outline"}
                          className={selectedPlan === "premium" ? "bg-finance-green text-black hover:bg-finance-green/90" : "border-gray-700"}
                          onClick={() => setSelectedPlan("premium")}
                        >
                          Premium
                        </Button>
                        <Button 
                          variant={selectedPlan === "enterprise" ? "default" : "outline"}
                          className={selectedPlan === "enterprise" ? "bg-finance-green text-black hover:bg-finance-green/90" : "border-gray-700"}
                          onClick={() => setSelectedPlan("enterprise")}
                        >
                          Lifetime
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800">
                      <div className="text-center">
                        <p className="text-gray-400 mb-1">Your estimated earnings</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-finance-green">
                          ₹{calculateEarnings().toLocaleString()}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          Based on {referrals} referrals with the selected plan distribution (commission calculated on pre-GST amount)
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="plans" className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plan</TableHead>
                        <TableHead>Price (incl. GST)</TableHead>
                        <TableHead>Price (excl. GST)</TableHead>
                        <TableHead>Commission Rate</TableHead>
                        <TableHead className="text-right">You Earn</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plans.map((plan) => (
                        <TableRow key={plan.name}>
                          <TableCell className="font-medium">{plan.name}</TableCell>
                          <TableCell>₹{plan.price}</TableCell>
                          <TableCell>₹{plan.priceExcludingGST}</TableCell>
                          <TableCell>{plan.commission * 100}%</TableCell>
                          <TableCell className="text-right">₹{(plan.priceExcludingGST * plan.commission).toFixed(0)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Note:</span> You earn 20% commission on all future purchases your referred users make. The commission is calculated on the amount excluding 18% GST. If a user upgrades their plan or buys additional products, you'll receive 20% of those transactions as well.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      {/* Share Section */}
      {/* <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Earning?</h2>
              <p className="text-gray-400">Share your referral link through your preferred channels and start earning today.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Share via Email</h3>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="friend@example.com"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-finance-green hover:bg-finance-green/90 text-black"
                  >
                    Send Invitation
                  </Button>
                </form>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Share on Social Media</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="border-gray-700 hover:bg-gray-800"
                    onClick={() => {
                      window.open(`https://wa.me/?text=Join%20MarketMynds%20referral%20program%20and%20earn%20real%20cash%20rewards!%20https://marketmynds.com/refer-program`, '_blank');
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12.04 0C5.494 0 .15 5.336.15 11.878c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.892 11.892 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893C23.934 5.336 18.596 0 12.04 0zm7.192 16.874a9.32 9.32 0 01-3.315 2.427 9.385 9.385 0 01-4.683.649 9.395 9.395 0 01-6.867-4.621A9.334 9.334 0 013.227 7.31a9.346 9.346 0 016.683-4.926 9.363 9.363 0 017.77 1.86 9.293 9.293 0 013.065 4.003 9.262 9.262 0 01-1.514 8.627z"/>
                    </svg>
                    WhatsApp
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-gray-700 hover:bg-gray-800"
                    onClick={() => {
                      window.open(`https://twitter.com/intent/tweet?text=Join%20MarketMynds%20referral%20program%20and%20earn%20real%20cash%20rewards!%20https://marketmynds.com/refer-program`, '_blank');
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-gray-700 hover:bg-gray-800"
                    onClick={() => {
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://marketmynds.com/refer-program")}`, '_blank');
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                    Facebook
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-gray-700 hover:bg-gray-800"
                    onClick={() => {
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://marketmynds.com/refer-program")}`, '_blank');
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      
      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">When do I receive my commission?</h3>
                <p className="text-gray-400">
                  Commission payments are processed within 7 days after your referral completes their subscription payment. The funds will be available in your MarketMynds account dashboard.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I withdraw my earnings?</h3>
                <p className="text-gray-400">
                  You can withdraw your earnings to your bank account from your dashboard. The minimum withdrawal amount is ₹1000, and withdrawals are processed within 3-5 business days.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Is there a limit to how many people I can refer?</h3>
                <p className="text-gray-400">
                  No, there is no limit. You can refer as many people as you want and earn commission on all of them.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Do I earn commission on renewals?</h3>
                <p className="text-gray-400">
                  Yes! You earn 20% commission on all initial purchases and renewals from your referrals, for as long as they remain subscribers.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What happens if my referral asks for a refund?</h3>
                <p className="text-gray-400">
                  If your referral receives a refund, the associated commission will be deducted from your balance or future earnings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Terms & Conditions */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Terms & Conditions</h2>
              <p className="text-gray-400">Please review the full terms of our referral program.</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="space-y-4 text-sm text-gray-300">
                <p>
                  1. To participate in the MarketMynds Referral Program, you must have an active MarketMynds account.
                </p>
                <p>
                  2. You will earn a 20% commission on all subscription payments made by users who sign up using your referral link or code. Commissions are calculated on the amount excluding the 18% GST.
                </p>
                <p>
                  3. Commissions are calculated based on the actual payment received by MarketMynds, excluding taxes and payment processing fees.
                </p>
                <p>
                  4. Commission payments will be processed within 7 days after your referral's payment is received and confirmed.
                </p>
                <p>
                  5. The minimum withdrawal amount is ₹1000. Withdrawals are processed within 3-5 business days.
                </p>
                <p>
                  6. MarketMynds reserves the right to modify, suspend, or terminate the referral program at any time.
                </p>
                <p>
                  7. Any attempt to manipulate the referral program through fake accounts, self-referrals, or other fraudulent means will result in immediate termination from the program and forfeiture of all unpaid commissions.
                </p>
                <p>
                  8. MarketMynds reserves the right to withhold commission payments if fraud or policy violations are suspected.
                </p>
                <p>
                  9. By participating in the referral program, you agree to abide by these terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ReferProgram;
