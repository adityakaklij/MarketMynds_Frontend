import React from 'react';
import { IndianRupee, FileText } from 'lucide-react';

export function HowItWorks() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in the MarketMynds pre-market reports.");
    // window.open(`https://wa.me/+?text=${message}`, '_blank');
    window.open(`https://wa.me/+918062960996?text=${message}`, '_blank');
  };

  const downloadSampleReport = () => {
    const link = document.createElement('a');
    link.href = '/MarketMynds.pdf';
    link.download = 'MarketMynds-Sample-Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-10 md:py-20 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-finance-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-finance-green/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-6 md:mb-16">
          How it Works?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-gray-800 shadow-lg hover:border-finance-green/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-finance-green/10 hover:shadow-xl cursor-pointer"
            onClick={scrollToPricing}
          >
            <div className="flex justify-center mb-3 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-finance-green rounded-full flex items-center justify-center">
                <IndianRupee className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2 md:mb-4">Step 1</h3>
            <p className="text-gray-300 text-center text-sm md:text-base">
              Choose a plan and make a payment.
            </p>
          </div>
          
          {/* Step 2 */}
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-gray-800 shadow-lg hover:border-finance-green/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-finance-green/10 hover:shadow-xl cursor-pointer"
            onClick={openWhatsApp}
          >
            <div className="flex justify-center mb-3 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-finance-green rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-black" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.04 0C5.494 0 .15 5.336.15 11.878c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.892 11.892 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893C23.934 5.336 18.596 0 12.04 0zm7.192 16.874a9.32 9.32 0 01-3.315 2.427 9.385 9.385 0 01-4.683.649 9.395 9.395 0 01-6.867-4.621A9.334 9.334 0 013.227 7.31a9.346 9.346 0 016.683-4.926 9.363 9.363 0 017.77 1.86 9.293 9.293 0 013.065 4.003 9.262 9.262 0 01-1.514 8.627z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2 md:mb-4">Step 2</h3>
            <p className="text-gray-300 text-center text-sm md:text-base">
              We will send an invite to our WhatsApp community.
            </p>
          </div>
          
          {/* Step 3 */}
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-gray-800 shadow-lg hover:border-finance-green/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-finance-green/10 hover:shadow-xl cursor-pointer"
            onClick={downloadSampleReport}
          >
            <div className="flex justify-center mb-3 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-finance-green rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2 md:mb-4">Step 3</h3>
            <p className="text-gray-300 text-center text-sm md:text-base">
              Done! now you are all set to receive daily PDF.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 