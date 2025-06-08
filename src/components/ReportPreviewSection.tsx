import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, BarChart2, TrendingUp, TrendingDown, ArrowRight, ArrowLeft, AlertTriangle, Layers, Briefcase, Activity, List, MessageSquare, FileText, Clock, Ban, Rocket, Bookmark, Zap, Send } from 'lucide-react';

// Simplified typing animation styles
const typingAnimationStyles = `
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.typing-cursor {
  display: inline-block;
  width: 3px;
  height: 16px;
  background-color: #00D166;
  margin-left: 4px;
  animation: blink 1s infinite;
  vertical-align: middle;
}

.text-area {
  color: white;
  font-size: 16px;
  line-height: 1.5;
}
`;

export function ReportPreviewSection() {
  const scrollToPreview = () => {
    const previewSection = document.getElementById('preview');
    if (previewSection) {
      previewSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SIMPLIFIED Typing animation states
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Chat messages for typing animation
  const messages = [
    "The market showed mixed sentiment with select sectors witnessing gains, while others faced mild declines over the past week.",
    "I've spotted some notable corporate developments:",
    "Tata Motors shares rose 4.5% following strong Jaguar Land Rover quarterly sales data.",
    "However, Adani Enterprises declined by 3.7% after reports of regulatory scrutiny affecting investor sentiment.",
    "Looking at sectors, IT gained over 2% while Pharma saw a 3.2% gain over the week.",
    "Defensive sectors like FMCG and Pharma gained traction amid broader market uncertainty."
  ];

  useEffect(() => {
    // Reset the animation when component mounts
    setText('');
    setCurrentIndex(0);
    setCurrentMessageIndex(0);
    setIsTyping(true);
  }, []);

  useEffect(() => {
    // Simple typing animation
    if (!isTyping) return;

    const message = messages[currentMessageIndex];
    
    // If we've completed typing the current message
    if (currentIndex >= message.length) {
      // Wait for 2 seconds before erasing
      const timeout = setTimeout(() => {
        // Start erasing
        setText('');
        setCurrentIndex(0);
        // Move to next message
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
    
    // Type the next character
    const typingTimeout = setTimeout(() => {
      setText(message.substring(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, 50); // Adjust speed as needed
    
    return () => clearTimeout(typingTimeout);
  }, [currentIndex, currentMessageIndex, isTyping]);

  return (
    <section id="report-preview" className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-finance-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-finance-green/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-lg uppercase font-medium tracking-wider text-finance-green mb-2">FEATURES</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
            What's Inside Our Pre-Market Report?
          </h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to stay ahead before the market opens.
          </p>
        </div>

        {/* Myndbyte Feature - AI Market Briefing with Chat Interface */}
        <div className="mb-16">
          <div 
            className="bg-[#0A0E17] backdrop-blur-sm p-8 rounded-xl border border-gray-800 cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-finance-green rounded-full flex items-center justify-center mr-3">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="text-xl w-1/2 font-bold text-white">Myndbyte</h4>
                  <p className="text-sm text-gray-400">Your bite-sized AI briefing before the bell</p>
                </div>
              </div>
              {/* <div className="text-xs bg-[#043832] text-finance-green px-4 py-1.5 text-center rounded-full whitespace-nowrap min-w-[90px]"> */}
              <div className="text-xs bg-[#043832] text-finance-green px-4 py-1.5 text-center rounded-full whitespace-nowrap ">
                AI Powered
              </div>
            </div>

            {/* Chat conversation area */}
            <div className="bg-[#12141C] rounded-lg p-5 mb-2 min-h-[10px] flex">
              {/* Style for typing animation */}
              <style dangerouslySetInnerHTML={{ __html: typingAnimationStyles }} />
              
              {/* Vertical indicator bar */}
              <div className="w-1.5 h-8 bg-finance-green rounded-full mr-4 mt-1 self-start flex-shrink-0"></div>
              
              {/* Typing area */}
              <div className="flex items-start pt-2">
                <div className="text-area">
                  {text}
                  <span className="typing-cursor"></span>
                </div>
              </div>
            </div>
            
            {/* Market data cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[#12141C] rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Nifty 50</span>
                  <span className="text-green-500 text-sm flex items-center">
                    +0.24% <TrendingUp className="ml-1 w-3 h-3" />
                  </span>
                </div>
                <div className="text-white font-medium">22,124.35</div>
              </div>
              
              <div className="bg-[#12141C] rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Fear & Greed</span>
                  <span className="text-yellow-500 text-sm">Neutral</span>
                </div>
                <div className="text-white font-medium">52/100</div>
              </div>
              
              <div className="bg-[#12141C] rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Top Sector</span>
                  <span className="text-green-500 text-sm flex items-center">
                    +3.2% <TrendingUp className="ml-1 w-3 h-3" />
                  </span>
                </div>
                <div className="text-white font-medium">Pharma</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Fear and Greed Index */}
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <h4 className="text-xl font-semibold text-white mb-4">Fear and Greed Index</h4>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-lg">
              <img 
                src="/images/MMI.png" 
                alt="Fear and Greed Index showing Extreme Greed" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
          
          {/* Global Market Overview */}
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Global Market Overview</h4>
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">+ Indian market</span>
            </div>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-gray-400 text-sm mb-2">Asian Market</h5>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center text-[8px] text-white">HK</span>
                    <span className="text-white text-sm">Hang Seng</span>
                  </div>
                  {/* <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-white rounded-sm flex items-center justify-center text-[8px] text-red-600">JP</span>
                    <span className="text-white text-sm">Nikkei 225</span>
                  </div> */}
                  <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-[8px] text-white">KR</span>
                    <span className="text-white text-sm">KOSPI</span>
                  </div>
                  {/* <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-blue-800 rounded-sm flex items-center justify-center text-[8px] text-white">AU</span>
                    <span className="text-white text-sm">ASX 200</span>
                  </div> */}
                </div>
              </div>
              
              <div>
                <h5 className="text-gray-400 text-sm mb-2">Europe Market</h5>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-yellow-500 rounded-sm flex items-center justify-center text-[8px] text-black">DE</span>
                    <span className="text-white text-sm">DAX</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-white rounded-sm flex items-center justify-center text-[8px] text-red-600">UK</span>
                    <span className="text-white text-sm">FTSE 100</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-[8px] text-white">FR</span>
                    <span className="text-white text-sm">CAC 40</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-gray-400 text-sm mb-2">US Market</h5>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-blue-700 rounded-sm flex items-center justify-center text-[8px] text-white">US</span>
                    <span className="text-white text-sm">Dow Jones</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-blue-700 rounded-sm flex items-center justify-center text-[8px] text-white">US</span>
                    <span className="text-white text-sm">Nasdaq</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-800 py-1 px-3 rounded-full">
                    <span className="w-4 h-4 bg-blue-700 rounded-sm flex items-center justify-center text-[8px] text-white">US</span>
                    <span className="text-white text-sm">S&P</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Market Snapshot */}
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Market Snapshot</h4>
              <span className="text-finance-blue font-medium">Nifty 50</span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg flex items-center">
                <div className="bg-blue-500 p-2 rounded-full mr-4">
                  <BarChart2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">Volume Shockers</span>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg flex items-center">
                <div className="bg-blue-900 p-2 rounded-full mr-4">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">52 Week High</span>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg flex items-center">
                <div className="bg-green-500 p-2 rounded-full mr-4">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">Top Gainers</span>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg flex items-center">
                <div className="bg-red-500 p-2 rounded-full mr-4">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">Top Losers</span>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg flex items-center">
                <div className="bg-teal-600 p-2 rounded-full mr-4">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">Long & Short Buildup</span>
              </div>
            </div>
          </div>
          
          {/* Sectoral Indices Chart */}
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Sectoral Indices Chart</h4>
              <span className="text-xs text-gray-400">7-day and 1-day change</span>
            </div>
            
            <div className="space-y-2 mt-6">
              {/* Positive Sectors */}
              <div className="flex items-center">
                <span className="w-24 text-xs text-gray-400">Nifty Realty</span>
                <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                  <div className="absolute right-0 top-0 h-full bg-green-500" style={{ width: '94%' }}></div>
                </div>
                <span className="ml-2 text-green-500 text-sm">0.94%</span>
              </div>
              
              <div className="flex items-center">
                <span className="w-24 text-xs text-gray-400">Nifty Metal</span>
                <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                  <div className="absolute right-0 top-0 h-full bg-green-500" style={{ width: '78%' }}></div>
                </div>
                <span className="ml-2 text-green-500 text-sm">0.78%</span>
              </div>
              
              <div className="flex items-center">
                <span className="w-24 text-xs text-gray-400">Nifty Media</span>
                <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                  <div className="absolute right-0 top-0 h-full bg-green-500" style={{ width: '85%' }}></div>
                </div>
                <span className="ml-2 text-green-500 text-sm">0.85%</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-xs text-gray-400">Nifty PSE</span>
                <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                  <div className="absolute right-0 top-0 h-full bg-green-500" style={{ width: '38%' }}></div>
                </div>
                <span className="ml-2 text-green-500 text-sm">0.38%</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-xs text-gray-400">Nifty CPSE</span>
                <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                  <div className="absolute right-0 top-0 h-full bg-green-500" style={{ width: '28%' }}></div>
                </div>
                <span className="ml-2 text-green-500 text-sm">0.28%</span>
              </div>  
              
              {/* Negative Sectors */}
              <div className="flex items-center mt-4">
                <span className="w-24 text-xs text-gray-400">Nifty Energy</span>
                <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                  <div className="absolute left-0 top-0 h-full bg-red-500" style={{ width: '90%' }}></div>
                </div>
                <span className="ml-2 text-red-500 text-sm">-0.90%</span>
              </div>
              
                <div className="flex items-center">
                  <span className="w-24 text-xs text-gray-400">Nifty Bank</span>
                  <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full bg-red-500" style={{ width: '70%' }}></div>
                  </div>
                  <span className="ml-2 text-red-500 text-sm">-0.70%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-xs text-gray-400">Nifty Auto</span>
                  <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full bg-red-500" style={{ width: '80%' }}></div>
                  </div>
                  <span className="ml-2 text-red-500 text-sm">-0.80%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-xs text-gray-400">Nifty IT</span>
                  <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full bg-red-500" style={{ width: '30%' }}></div>
                  </div>
                  <span className="ml-2 text-red-500 text-sm">-0.30%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-xs text-gray-400">Nifty MNC</span>
                  <div className="flex-1 h-6 bg-gray-800 rounded-sm overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full bg-red-500" style={{ width: '12%' }}></div>
                  </div>
                  <span className="ml-2 text-red-500 text-sm">-0.12%</span>
                </div>

            </div>
          </div>
        </div>
        
        {/* Additional Report Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <List className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">Long Short Build Up</span>
          </div>
          
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <BarChart2 className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">Technical Analysis</span>
          </div>
          
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">Stocks in News</span>
          </div>
          
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <Briefcase className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">FII and DII Activity</span>
          </div>
          
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <Ban className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">Stock In Ban List</span>
          </div>
          
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <Rocket className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">Current IPOs</span>
          </div>
          
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">PCR & Pivot Levels</span>
          </div>
          
          {/* <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <MessageSquare className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">Option Chain</span>
          </div> */}
          
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <Bookmark className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">Most Active Contracts & Option Chain</span>
          </div>
          
          <div 
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-center cursor-pointer hover:border-finance-green/50 transition-all"
            onClick={scrollToPreview}
          >
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <Zap className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-white font-medium">Myndbyte Daily Briefing</span>
          </div>
        </div>
      </div>
    </section>
  );
} 