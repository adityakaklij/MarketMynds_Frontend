import React from 'react';

interface YouTubeVideoProps {
  videoId?: string;
  title?: string;
}

export function YouTubeVideo({ videoId = "-R0TAI1T8w8", title = "YouTube video player" }: YouTubeVideoProps) {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-finance-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-finance-green/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="px-4 text-center md:text-left md:pl-10 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What is Market Mynds 8AM Report?
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              In just 54 seconds, this video breaks down why most traders lose money and what smart traders do differently every morning.
            </p>
            
            {/* <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-finance-green text-black font-medium text-sm mr-3 mt-0.5">✓</span>
                <span>Global market cues and overnight developments</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-finance-green text-black font-medium text-sm mr-3 mt-0.5">✓</span>
                <span>Key support and resistance levels</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-finance-green text-black font-medium text-sm mr-3 mt-0.5">✓</span>
                <span>FII/DII activity and market sentiment</span>
              </li>
            </ul> */}
          </div>
          
          {/* Right side - Video */}
          <div className="w-full flex justify-center md:order-2">
            <div className="w-full max-w-[350px] md:max-w-[270px]">
              <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                <iframe 
                  src={`https://www.youtube.com/embed/-R0TAI1T8w8`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-xl border border-gray-800"
                  style={{ 
                    boxShadow: "0 0 20px rgba(0, 183, 127, 0.15)"
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 