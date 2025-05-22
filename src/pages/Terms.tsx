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
            <p className="text-lg font-medium text-white">Market Mynds provides pre-market data and reports strictly for informational purposes. We do not provide investment advice, tips, or buy/sell signals.</p>
            <p className="text-lg font-medium text-white">By subscribing, you agree to the following terms:</p>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Report Delivery</h2>
              <p>Reports are delivered only on market trading days, between 7:50–8:10 AM IST.</p>
              <p>No reports will be sent on weekends, market holidays, or during unforeseen disruptions.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Subscription Validity</h2>
              <p>All subscription durations are calculated based on calendar days, not market days.</p>
              <p>For example, a 30-day subscription includes weekends and holidays as part of the duration.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Usage</h2>
              <p>Reports are for personal use only. Sharing or redistributing paid content is strictly prohibited.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Lifetime Access Clause</h2>
              <p>“Lifetime Access” is valid only for the operational lifetime of the Market Mynds service.</p>
              <p>If the service or company is discontinued in the future, the lifetime subscription will automatically terminate.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Communication</h2>
              <p>By subscribing, you consent to receive updates and messages from Market Mynds on WhatsApp.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-finance-green">Liability Disclaimer</h2>
              <p>Market Mynds, its team, or partners are not liable for any trading losses or investment outcomes resulting from use of the reports.</p>
            </div>
          </div>
          <div className="mt-8 text-xs text-gray-400 text-center">
            Last updated: 22 May 2025
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
