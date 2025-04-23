
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";

export function SubscriptionCTA() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black -z-10"></div>
      
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-finance-green/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-2">
            <div className="glass-card rounded-xl overflow-hidden border border-finance-green/20">
              <div className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center">
                  <div className="lg:flex-1 text-center lg:text-left mb-8 lg:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Start Receiving Daily Market Analysis
                    </h2>
                    
                    <p className="text-gray-300 md:text-lg mb-8">
                      Subscribe and get our professional market insights delivered to your WhatsApp every trading day.
                    </p>
                    
                    <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                      <div className="flex items-center">
                        <span className="h-5 w-5 rounded-full bg-finance-green flex items-center justify-center text-black text-xs">✓</span>
                        <span className="ml-2 text-sm text-gray-300">No spam</span>
                      </div>
                      <div className="flex items-center">
                        <span className="h-5 w-5 rounded-full bg-finance-green flex items-center justify-center text-black text-xs">✓</span>
                        <span className="ml-2 text-sm text-gray-300">Cancel anytime</span>
                      </div>
                      <div className="flex items-center">
                        <span className="h-5 w-5 rounded-full bg-finance-green flex items-center justify-center text-black text-xs">✓</span>
                        <span className="ml-2 text-sm text-gray-300">7-day free trial</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:flex-1 lg:pl-8 w-full">
                    <div className="bg-black/50 rounded-lg p-6 border border-gray-800">
                      <div className="text-center mb-4">
                        <span className="bg-finance-green/10 text-finance-green text-sm font-medium px-3 py-1 rounded-full">
                          7-day free trial
                        </span>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-white">$19.99</span>
                          <span className="text-gray-400 ml-2">/ month</span>
                        </div>
                      </div>
                      
                      <form className="space-y-4">
                        <div>
                          <Input 
                            type="text" 
                            placeholder="Your Name" 
                            className="bg-gray-900 border-gray-700 focus:border-finance-green"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-24">
                            <Input 
                              type="text" 
                              defaultValue="+1" 
                              className="bg-gray-900 border-gray-700 text-center"
                              readOnly
                            />
                          </div>
                          <div className="flex-1">
                            <Input 
                              type="tel" 
                              placeholder="WhatsApp Number" 
                              className="bg-gray-900 border-gray-700 focus:border-finance-green"
                            />
                          </div>
                        </div>
                        <div>
                          <Input 
                            type="email" 
                            placeholder="Your Email" 
                            className="bg-gray-900 border-gray-700 focus:border-finance-green"
                          />
                        </div>
                        <Button 
                          className="w-full py-6 bg-finance-green hover:bg-finance-green/90 text-black font-medium"
                        >
                          <MessageSquare className="mr-2 h-5 w-5" />
                          Start Free Trial
                        </Button>
                      </form>
                      
                      <p className="text-xs text-gray-400 mt-4 text-center">
                        By subscribing you agree to our Terms of Service and Privacy Policy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
