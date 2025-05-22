import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Disclaimer() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Disclaimer</h1>
          <div className="space-y-4 text-gray-300">
            <p>The information provided by Market Mynds is intended solely for informational and educational purposes. It should not be interpreted as investment advice, stock recommendations, or financial guidance of any kind.

Market Mynds does not provide buy/sell signals, and no content shared should be construed as a solicitation to trade or invest in any security or financial instrument.

While we strive for accuracy and timely delivery, Market Mynds makes no guarantees regarding the completeness, reliability, or availability of the information. Market conditions, data sources, and technical issues may affect the timeliness or content of our reports.

By accessing our reports, you acknowledge and agree that:

You use the information at your own risk.

Market Mynds, its team members, and partners shall not be held liable for any financial losses, damages, or outcomes arising from decisions made based on our reports.

Past performance or trends discussed do not guarantee future results.

Always conduct your own research or consult a licensed financial advisor before making any trading or investment decisions.</p>
            
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
