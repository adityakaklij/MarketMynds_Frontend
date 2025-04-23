
import { Card } from "@/components/ui/card";
import { ChartLine, TrendingUp, CalendarDays, MessageSquare } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <ChartLine className="h-10 w-10 text-finance-blue" />,
      title: "Technical Analysis",
      description: "Powerful technical indicators and chart patterns analyzed by expert traders to identify key market movements."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-finance-green" />,
      title: "Market Trends",
      description: "Daily overview of market trends, sector rotations, and powerful moves across global financial markets."
    },
    {
      icon: <CalendarDays className="h-10 w-10 text-finance-gold" />,
      title: "Economic Calendar",
      description: "Stay informed about upcoming economic events that could impact your portfolio and trading decisions."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-finance-chart" />,
      title: "Analyst Insights",
      description: "Expert commentary and predictions from seasoned market analysts with decades of trading experience."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Comprehensive Market Analysis
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Our daily reports provide everything you need to make informed investment decisions
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
                    "Pre-market analysis and key levels to watch",
                    "Top stocks to watch with entry and exit points",
                    "Major index forecasts and trend analysis",
                    "Sector rotation insights and opportunities",
                    "Risk management advice and position sizing",
                    "Economic events impact analysis"
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
                        <div className="ml-2 text-xs text-gray-400">Market Report - June 12, 2024</div>
                      </div>
                    </div>
                    <div className="p-6 text-sm text-gray-300">
                      <p className="font-bold text-finance-green mb-4">MARKET OUTLOOK:</p>
                      <p className="mb-2">S&P 500 is approaching key resistance at 4,850. Watch for breakout confirmation.</p>
                      <p className="mb-4">RSI showing slight divergence on hourly charts - caution advised.</p>
                      
                      <p className="font-bold text-finance-blue mb-4">TOP OPPORTUNITIES:</p>
                      <p className="mb-1">AAPL: Support at $182.30, resistance at $188.75</p>
                      <p className="mb-1">TSLA: Watch for breakout above $242.60</p>
                      <p>NVDA: Consider entries after FOMC announcement</p>
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
