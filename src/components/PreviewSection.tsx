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
            
            <div className="mt-8 space-y-6">
              <div>
                <Button 
                  className="bg-finance-green hover:bg-finance-green/90 text-black"
                  onClick={downloadSampleReport}
                >
                  Download Sample Report
                </Button>
              </div>
              
              <div className="text-gray-400 flex items-center">
                <span className="inline-block animate-pulse text-red-500 mr-2">🚨</span>
                <span>
                  Check our latest PDF report on {' '}
                  <a 
                    // href="https://api.whatsapp.com/send?phone=+919307202438&text=Can%20I%20see%20the%20sample%20PDF%20report%3F" 
                    href="https://api.whatsapp.com/send?phone=+918062960996&text=Can%20I%20see%20the%20sample%20PDF%20report%3F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-finance-green hover:underline inline-flex items-center"
                  >
                    WhatsApp
                    <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </span>
              </div>
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
