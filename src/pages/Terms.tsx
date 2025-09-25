import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-finance-green">Terms of Service</h1>
          <div className="glass-card p-6 rounded-xl border border-finance-green/20 bg-gradient-to-b from-finance-blue/5 to-black shadow-lg shadow-black/20 space-y-6 text-gray-300">
            <p className="text-lg font-medium text-white">Market Mynds provides pre-market data and reports strictly for informational purposes. We are not an investment advisory or tips-providing company. We only sell structured data, insights, and analysis packaged in PDF (eBook) format. We do not provide buy/sell signals, trading calls, or personalized financial recommendations.</p>
            <p className="text-lg font-medium text-white">By subscribing, you agree to the following terms:</p>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Nature of Service</h2>
              <p>● Reports are provided in PDF format and classified as eBooks/digital content.</p>
              <p>● The content is created using third-party market data processed through AI-driven models and predefined prompts.</p>
              <p>● Market Mynds sells data-driven reports, not investment advice.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Report Delivery</h2>
              <p>● Reports are delivered only on market trading days, between 7:50–8:10 AM IST.</p>
              <p>● No reports will be sent on weekends, market holidays, or during unforeseen disruptions.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Subscription Validity</h2>
              <p>● All subscription durations are calculated based on calendar days, not market days.</p>
              <p>● For example, a 30-day subscription includes weekends and holidays as part of the duration.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Usage</h2>
              <p>● Reports are for personal use only. Sharing, reselling, or redistributing paid content is strictly prohibited.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Lifetime Access Clause</h2>
              <p>● "Lifetime Access" is valid only for the operational lifetime of the Market Mynds service.</p>
              <p>● If the service or company is discontinued in the future, the lifetime subscription will automatically terminate.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Communication</h2>
              <p>● By subscribing, you consent to receive updates and messages from Market Mynds on WhatsApp.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Pricing Disclaimer</h2>
              <p>● The ~₹74/month rate is an effective monthly cost based on the annual subscription price of ₹649.</p>
              <p>● Monthly billing is not available at this rate.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">AI Disclaimer</h2>
              <p>● Our reports are generated using AI models based on structured market data and predefined prompts.</p>
              <p>● While we strive for accuracy, AI may occasionally miss context.</p>
              <p>● These reports are meant as informational tools only, not financial advice.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Liability Disclaimer</h2>
              <p>● Market Mynds, its team, or partners are not liable for any trading losses or investment outcomes resulting from the use of the reports.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Razorpay Disclaimer</h2>
              <p>Disclaimer: The above content is created at Eleven Square Labs' sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to the merchant's non-adherence to it.</p>
            </div>
          </div>
          <div className="mt-8 text-xs text-gray-400 text-center">
            Last updated: 22 September 2025
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
