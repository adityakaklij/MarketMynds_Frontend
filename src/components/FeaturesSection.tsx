
import { Card } from "@/components/ui/card";
import { ChartLine, TrendingUp, CalendarDays, MessageSquare, Search, TrendingUpDown } from "lucide-react";

export function FeaturesSection() {

  const features = [
    {
      icon: <ChartLine className="h-10 w-10 text-finance-blue" />,
      title: "Technical Pulse",
      description: "Volume spikes, momentum shifts delivered as raw information, not opinions. You decide what to act on."
    },
    {
      icon: <Search className="h-10 w-10 text-finance-gold" />,
      title: "Trend Watch",
      description: "Daily scans of what’s moving, why it matters, and where momentum is building across sectors and global markets."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-finance-green" />,
      title: "Event Trends",
      description: "Daily overview of market trends, sector rotations, and powerful moves across global financial markets."
    },
    {
      icon: <TrendingUpDown className="h-10 w-10 text-finance-chart" />,
      // title: "Clean, Curated Data",
      
      title: "Curated Data",
      description: "No fluff. No noise. Just structured market intelligence from analysts who know what matters and skip what doesn’t."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What's Inside The Report
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
          Market Mynds delivers reliable, data-driven pre-market reports to your WhatsApp every morning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card p-6 flex flex-col items-center text-center hover:border-finance-green transition-colors duration-300">
              <div className="mb-4 rounded-full bg-gray-800/50 p-3">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="glass-card p-8 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">What You Get Every Day</h3>
                
                <ul className="space-y-4">
                  {[
                    "Sector trends and key index levels",
                    "FII/DII flows and derivatives snapshot",
                    "Unusual stock moves and volume spikes",
                    "Market mood and global cues, simplified",
                    "Economic calendar with market-relevant events",
                    "IPO updates, result calendar, and banned stocks list",
                    
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-finance-green text-black font-medium text-sm mr-3 mt-0.5">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-finance-blue to-finance-green rounded-lg blur opacity-30"></div>
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                    <div className="p-3 bg-black/50 border-b border-gray-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="ml-2 text-xs text-gray-400">Market Report - April 10, 2025</div>
                      </div>
                    </div>
                    <div className="p-6 text-sm text-gray-300">
                      <p className="font-bold text-finance-green mb-4">Market Overview:</p>
                      <p className="mb-2">Key indices like Nifty, Bank Nifty, and sectoral trends.</p>
                      {/* <p className="mb-4"> </p> */}
                      
                      <p className="font-bold text-finance-blue mb-4">Pivot Levels:</p>
                      <p className="mb-1">Daily support and resistance levels for informed decisions.</p>
                      {/* <p className="mb-1">TSLA: Watch for breakout above $242.60</p>
                      <p>NVDA: Consider entries after FOMC announcement</p> */}
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
