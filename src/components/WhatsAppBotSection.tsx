import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  typing?: boolean;
}

export function WhatsAppBotSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Sample conversation
  const conversation = [
    { id: 1, text: "Hi, I want to check HDFC Bank analysis", isBot: false },
    { 
      id: 2, 
      text: "📊 *HDFC Bank Analysis* 📊\n\n*Technical Indicators:*\n• Current Price: ₹1,642\n• 50 DMA: ₹1,610 (Above)\n• 200 DMA: ₹1,580 (Above)\n• RSI: 58 (Neutral)\n• MACD: Positive crossover\n\n*Key Support & Resistance:*\n• Support: ₹1,620, ₹1,595\n• Resistance: ₹1,665, ₹1,680\n\n*Recent News:*\nQ2 Results: Net profit up 35% YoY\nExpanding digital banking initiatives", 
      isBot: true 
    },
    { id: 3, text: "What about Reliance?", isBot: false },
    { 
      id: 4, 
      text: "📊 *Reliance Industries Analysis* 📊\n\n*Technical Indicators:*\n• Current Price: ₹2,842\n• 50 DMA: ₹2,780 (Above)\n• 200 DMA: ₹2,650 (Above)\n• RSI: 62 (Moderately bullish)\n• MACD: Bullish momentum\n\n*Key Support & Resistance:*\n• Support: ₹2,800, ₹2,750\n• Resistance: ₹2,875, ₹2,900\n\n*Recent News:*\nNew energy investments gaining traction\nRetail business showing strong growth", 
      isBot: true 
    },
    { id: 5, text: "Tell me about Infosys", isBot: false },
    { 
      id: 6, 
      text: "📊 *Infosys Analysis* 📊\n\n*Technical Indicators:*\n• Current Price: ₹1,482\n• 50 DMA: ₹1,510 (Below)\n• 200 DMA: ₹1,450 (Above)\n• RSI: 45 (Neutral)\n• MACD: Slightly bearish\n\n*Key Support & Resistance:*\n• Support: ₹1,450, ₹1,420\n• Resistance: ₹1,500, ₹1,525\n\n*Recent News:*\nSigned multiple large deals in Q2\nDigital services revenue growing at 25% YoY", 
      isBot: true 
    }
  ];

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Animation for typing the conversation
  useEffect(() => {
    if (currentMessageIndex >= conversation.length) {
      // Reset the conversation after a delay
      const resetTimeout = setTimeout(() => {
        setMessages([]);
        setCurrentMessageIndex(0);
      }, 5000);
      
      return () => clearTimeout(resetTimeout);
    }
    
    const nextMessage = conversation[currentMessageIndex];
    
    if (nextMessage.isBot) {
      // Show typing indicator
      setIsTyping(true);
      setMessages(prev => [...prev, { ...nextMessage, text: "", typing: true }]);
      
      // Simulate typing time based on message length
      const typingTime = Math.min(2000, nextMessage.text.length * 10);
      
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => 
          prev.map(msg => 
            msg.id === nextMessage.id 
              ? { ...msg, text: nextMessage.text, typing: false } 
              : msg
          )
        );
        
        // Move to next message after a delay
        const nextMessageTimeout = setTimeout(() => {
          setCurrentMessageIndex(prev => prev + 1);
        }, 2000);
        
        return () => clearTimeout(nextMessageTimeout);
      }, typingTime);
      
      return () => clearTimeout(typingTimeout);
    } else {
      // User messages appear immediately
      setMessages(prev => [...prev, nextMessage]);
      
      // Move to next message (bot response) after a short delay
      const nextMessageTimeout = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 800);
      
      return () => clearTimeout(nextMessageTimeout);
    }
  }, [currentMessageIndex]);

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-finance-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-finance-green/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-finance-green/10 text-finance-green mb-4">
            <span className="mr-2">✨</span>
            <span className="font-medium">NEW FEATURE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet MarketMynds  <span 
              className="relative"
              style={{
                background: 'linear-gradient(90deg, #00D166, #0099FF, #00D166)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite',
                textShadow: '0 0 20px rgba(0, 209, 102, 0.3)',
              }}
            >
               KAI
            </span>
            <span style={{
                fontSize: '15px',
                // marginBottom: '-10px',
                // paddingBottom: '10px',
              }}>
                (beta)

            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
          Your personal AI stock assistant on WhatsApp. Get quick technical and fundamental breakdowns for any stock.
          </p>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Left side: Features */}
          <div className="w-full md:w-5/12 space-y-6 mt-12 md:mt-0">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-finance-green flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Real-time Market Data                </h3>
                <p className="text-gray-300 mt-1">Access technical indicators, support and resistance levels in a simple, easy-to-read format.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-finance-green flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Latest News</h3>
                <p className="text-gray-300 mt-1">Stay updated with company announcements and market events that shape your watchlist.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-finance-green flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">24/7 Access</h3>
                <p className="text-gray-300 mt-1">Get stock information anytime, anywhere, directly on WhatsApp.</p>
              </div>
            </div>
            
            {/* CTA Buttons for Mobile */}
            <div className="block md:hidden mt-8 space-y-3">
              <a 
                href="https://wa.me/+918062960996?text=Hi!%20I%20want%20to%20try%20MarketMynds%20KAI"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20BD5A] text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center w-full"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.04 0C5.494 0 .15 5.336.15 11.878c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.892 11.892 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893C23.934 5.336 18.596 0 12.04 0zm7.192 16.874a9.32 9.32 0 01-3.315 2.427 9.385 9.385 0 01-4.683.649 9.395 9.395 0 01-6.867-4.621A9.334 9.334 0 013.227 7.31a9.346 9.346 0 016.683-4.926 9.363 9.363 0 017.77 1.86 9.293 9.293 0 013.065 4.003 9.262 9.262 0 01-1.514 8.627z"/>
                </svg>
                Try MarketMynds KAI
              </a>
              <p className="text-gray-300 text-sm">Try with 3 Free credits.</p>
              
              {/* <a 
                href="/kai-credits"
                className="bg-finance-green hover:bg-finance-green/90 text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center w-full mt-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Get More Credits
              </a> */}
            </div>
            
            {/* CTA Buttons for Desktop */}
            <div className="hidden md:block mt-8 space-y-4">
              <div className="flex space-x-4">
                <a 
                  href="https://wa.me/+919035508311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-black font-medium py-3 px-6 rounded-lg inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12.04 0C5.494 0 .15 5.336.15 11.878c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.892 11.892 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893C23.934 5.336 18.596 0 12.04 0zm7.192 16.874a9.32 9.32 0 01-3.315 2.427 9.385 9.385 0 01-4.683.649 9.395 9.395 0 01-6.867-4.621A9.334 9.334 0 013.227 7.31a9.346 9.346 0 016.683-4.926 9.363 9.363 0 017.77 1.86 9.293 9.293 0 013.065 4.003 9.262 9.262 0 01-1.514 8.627z"/>
                  </svg>
                  Try MarketMynds KAI
                </a>
                
                {/* <a 
                  href="/kai-credits"
                  className="bg-finance-green hover:bg-finance-green/90 text-black font-medium py-3 px-6 rounded-lg inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Get More Credits
                </a> */}
              </div>
              <p className="text-gray-300 text-sm">Start with 3 free credits.</p>
            </div>
          </div>
          
          {/* Right side: Phone mockup */}
          <div className="w-full md:w-5/12">
            <div className="relative mx-auto" style={{ maxWidth: "300px" }}>
              {/* Phone frame */}
              <div className="relative z-10 rounded-[35px] bg-black border-4 border-gray-800 overflow-hidden shadow-xl" style={{ height: "580px" }}>
                {/* Status bar */}
                <div className="bg-[#075E54] h-7 w-full"></div>
                
                {/* WhatsApp header */}
                <div className="bg-[#128C7E] px-4 py-2 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                      <img src="/logo_white.png" alt="MarketMynds KAI" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="font-semibold text-white">MarketMynds KAI</div>
                    <div className="text-xs text-green-100">Online</div>
                  </div>
                </div>
                
                {/* Chat background */}
                <div 
                  className="h-[460px] bg-[#0B141A] bg-opacity-95 overflow-y-auto px-2 py-4"
                  style={{ 
                    backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzlEODJGQzQ5NjdDMTFFOTg3RUNFNUE0MkVEMzkwMTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzlEODJGQzU5NjdDMTFFOTg3RUNFNUE0MkVEMzkwMTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozOUQ4MkZDMjk2N0MxMUU5ODdFQ0U1QTQyRUQzOTAxOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozOUQ4MkZDMzk2N0MxMUU5ODdFQ0U1QTQyRUQzOTAxOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjDW/KcAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAAxElEQVR42uzZwQ6AIAwEUOr/f7RnD4ZQWypxJ3Mw4WlqMKYRAAAAAAAAAAAAAAAAAAAAgJuV3YIl/zOpP9isGLDZUUBdHQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAb3gFGABTYAD3xbx5QQAAAABJRU5ErkJggg==')",
                    backgroundSize: "100px"
                  }}
                  ref={chatRef}
                >
                  {/* Date header */}
                  <div className="text-center mb-4">
                    <span className="inline-block bg-[#182229] text-[#8696A0] text-xs px-3 py-1 rounded-lg">
                      TODAY
                    </span>
                  </div>
                  
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} mb-4`}
                    >
                      {msg.isBot && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0 mr-1">
                          <img src="/logo_white.png" alt="MarketMynds KAI" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div 
                        className={`rounded-lg py-2 px-4 max-w-[75%] ${
                          msg.isBot 
                            ? 'bg-[#202C33] text-white' 
                            : 'bg-[#005C4B] text-white'
                        }`}
                      >
                        {msg.typing ? (
                          <div className="flex space-x-1 items-center h-6">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        ) : (
                          <div className="whitespace-pre-line">{msg.text}</div>
                        )}
                        
                        {/* Message timestamp */}
                        <div className="text-right mt-1">
                          <span className="text-[10px] text-gray-400">
                            {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')}
                            {msg.isBot ? '' : ' ✓✓'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message input */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#202C33] px-2 py-2 flex items-center">
                  <div className="flex-1 bg-[#2A3942] rounded-full px-3 py-2 text-xs text-gray-400">
                    Type a message
                  </div>
                  <button className="ml-2 w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl"></div>
              </div>
              
              {/* Phone reflection */}
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-white/5 to-transparent rounded-[40px] pointer-events-none"></div>
              
              {/* Phone shadow */}
              <div className="absolute -bottom-4 left-0 right-0 h-4 bg-black/30 blur-xl rounded-full mx-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
