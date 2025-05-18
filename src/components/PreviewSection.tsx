import { Button } from "@/components/ui/button";

export function PreviewSection() {
  // Add downloadSampleReport function
  const downloadSampleReport = () => {
    const link = document.createElement('a');
    link.href = '/MarketMynds.pdf';
    link.download = 'MarketMynds-Sample-Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="preview" className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-finance-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-finance-green/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
          No Noise. Just Numbers.
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
          We're not here to tell you what to buy or sell.
          Market Mynds is for traders and investors who prefer facts over forecasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-white mb-6">Savings 30 mins of your Day</h3>
            
            <div className="space-y-6">
              <div className="glass-card p-4 rounded-lg">
                <h4 className="text-lg font-medium text-finance-green mb-2">We don't offer tips.
                </h4>
                <p className="text-gray-300">
                Comprehensive market data and overnight developments presented factually.
                </p>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <h4 className="text-lg font-medium text-finance-blue mb-2">We don't issue signals.
                </h4>
                <p className="text-gray-300">
                Technical data showing support/resistance levels and patterns for major indices.
                </p>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <h4 className="text-lg font-medium text-finance-gold mb-2">We simply help you start your day with clear, unbiased data.</h4>
                <p className="text-gray-300">
                Market condition metrics and price action data to inform your independent trading decisions.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                className="bg-finance-green hover:bg-finance-green/90 text-black"
                onClick={downloadSampleReport}
              >
                Download Sample Report
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative max-w-sm mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-finance-blue via-finance-green to-finance-blue rounded-2xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                {/* PDF Preview Mock */}
                <div className="bg-gray-800 p-3 border-b border-gray-700 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-400">MarketMynds - Daily Report.pdf</span>
                  <div></div>
                </div>
                <div className="p-4">
                  <img 
                    src="/images/market-overview-01.png" 
                    alt="MarketMynds Daily Report Preview" 
                    className="w-full rounded shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
