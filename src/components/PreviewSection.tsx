import { Button } from "@/components/ui/button";

export function PreviewSection() {
  return (
    <section id="preview" className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-finance-green to-finance-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-finance-green to-finance-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Preview Our Market Analysis
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Each report is delivered as a clean, easy-to-read PDF directly to your WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-white mb-6">Professional Analysis, Simple Delivery</h3>
            
            <div className="space-y-6">
              <div className="glass-card p-4 rounded-lg">
                <h4 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-finance-green to-finance-blue mb-2">Morning Market Brief</h4>
                <p className="text-gray-300">
                  Start your day with a comprehensive overview of what happened overnight and what to expect during the trading day.
                </p>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <h4 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-finance-green to-finance-blue mb-2">Technical Analysis</h4>
                <p className="text-gray-300">
                  Key support and resistance levels, chart patterns, and technical indicators for major indices and trending stocks.
                </p>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <h4 className="text-lg font-medium text-finance-gold mb-2">Trade Ideas</h4>
                <p className="text-gray-300">
                  Actionable trade ideas with entry points, stop losses, and profit targets based on market conditions.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="bg-transparent border-2 border-transparent relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-finance-green before:to-finance-blue before:z-[-1] before:opacity-100 before:transition-opacity hover:before:opacity-80 text-black">
                <span className="bg-gradient-to-r from-finance-green to-finance-blue bg-clip-text text-transparent">Download Sample Report</span>
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-finance-blue via-finance-green to-finance-blue rounded-2xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                {/* PDF Preview Mock */}
                <div className="bg-gray-800 p-3 border-b border-gray-700 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-400">MarketWhisper - Daily Report.pdf</span>
                  <div></div>
                </div>
                <div className="p-6">
                  <div className="bg-gray-900 rounded p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-finance-green font-bold">Market Whisper</h4>
                      <span className="text-xs text-gray-400">June 12, 2024</span>
                    </div>
                    <h5 className="text-white text-lg font-bold mb-3">Daily Market Analysis</h5>
                    <div className="w-full h-1 bg-gray-800 mb-3"></div>
                    <p className="text-sm text-gray-400">Morning Brief • Technical Analysis • Key Levels</p>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Mock content lines */}
                    <div className="h-4 bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-800 rounded w-4/5"></div>
                    
                    {/* Mock chart */}
                    <div className="mt-4 mb-4 h-32 rounded bg-gray-900 relative overflow-hidden">
                      <svg viewBox="0 0 100 30" className="w-full h-full">
                        <path 
                          d="M0,15 Q10,10 20,20 T40,15 T60,25 T80,10 T100,20" 
                          fill="none" 
                          stroke="#0099FF" 
                          strokeWidth="0.5"
                        />
                        <path 
                          d="M0,20 Q20,15 30,25 T50,20 T70,30 T100,15" 
                          fill="none" 
                          stroke="#00D166" 
                          strokeWidth="0.5"
                        />
                      </svg>
                    </div>
                    
                    <div className="h-4 bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                  </div>

                  <div className="mt-4 p-3 border border-finance-blue/30 rounded bg-finance-blue/10">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-finance-blue mr-2"></div>
                      <span className="text-xs text-finance-blue font-bold">KEY INSIGHT</span>
                    </div>
                    <div className="mt-2">
                      <div className="h-3 bg-gray-800 rounded w-full"></div>
                      <div className="h-3 bg-gray-800 rounded w-5/6 mt-1"></div>
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
