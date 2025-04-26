import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
          <div className="space-y-4 text-gray-300">
            <p>Market Mynds provides pre-market data and reports for informational purposes only. We do not provide investment advice, tips, or buy/sell signals.</p>
            <ul className="list-disc list-inside ml-4">
              <li>All purchases are one-time and non-renewing.</li>
              <li>You may request a refund within 3 days of your first report delivery.</li>
              <li>Reports are sent between 7:50–8:10 AM IST on working days, barring unforeseen circumstances.</li>
              <li>Do not share or redistribute paid reports outside your own use.</li>
            </ul>
            <p>By subscribing, you agree to our privacy policy and consent to receive messages from Market Mynds on WhatsApp.</p>
            <p>Market Mynds, its staff, or partners are not liable for trading losses or investment outcomes resulting from use of the reports.</p>
          </div>
          <div className="mt-8 text-xs text-gray-400 text-center">
            Last updated: April 2025
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
