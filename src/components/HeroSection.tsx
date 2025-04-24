import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

// Enhanced animations
const animations = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes pulse {
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
  100% { opacity: 0.4; transform: scale(1); }
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes graph {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<HTMLDivElement>(null);
  
  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({
  //       x: e.clientX / window.innerWidth,
  //       y: e.clientY / window.innerHeight
  //     });
  //   };
    
  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  // Generate particles with different properties for variation
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 5 + 1;
      const speed = Math.random() * 50 + 20;
      const opacity = Math.random() * 0.3 + 0.1;
      const color = Math.random() > 0.7 ? '#00D166' : Math.random() > 0.5 ? '#0099FF' : '#ffffff';
      
      return (
        <div 
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity,
            animation: `float ${speed}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            zIndex: -5,
          }}
        />
      );
    });
  };

  return (
    <div 
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      ref={animationRef}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute top-0 left-0 w-full h-full -z-20"
        style={{
          background: 'linear-gradient(-45deg, #0A1122, #111827, #0F172A, #081321)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
        aria-hidden="true"
      />
      
      {/* Gradient overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-40 -z-15"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 209, 102, 0.1), transparent 70%)',
        }}
      />
      
      {/* Dynamic particles */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {generateParticles(30)}
      </div>
      
      {/* Enhanced graph visualization */}
      <div className="absolute inset-0 -z-10">
        <svg
          width="120%"
          height="100%"
          viewBox="0 0 150 100"
          preserveAspectRatio="none"
          className="absolute inset-0 opacity-30"
          style={{
            left: '-10%',
          }}
        >
          {/* Market line charts */}
          <path
            d="M0,70 C10,65 20,75 30,70 S40,60 50,65 S60,75 70,70 S80,60 90,65 S100,75 110,70 S120,60 130,65 S140,75 150,70 V100 H0 Z"
            fill="url(#greenGradient)"
            stroke="#00D166"
            strokeWidth="0.5"
            className="transform-gpu"
            style={{
              animation: 'graph 25s linear infinite',
            }}
          />
          <path
            d="M0,60 C15,55 30,65 45,60 S60,50 75,55 S90,65 105,60 S120,50 135,55 S150,65 150,60 V100 H0 Z"
            fill="url(#blueGradient)"
            stroke="#0099FF"
            strokeWidth="0.5"
            className="transform-gpu"
            style={{
              animation: 'graph 20s linear infinite',
              opacity: 0.4,
            }}
          />
          
          {/* Gradients for the charts */}
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D166" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00D166" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0099FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0099FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Animated accent glows that follow mouse with parallax effect */}
      <div 
        className="absolute h-96 w-96 rounded-full blur-[100px] -z-5"
        style={{
          background: 'radial-gradient(circle, rgba(0, 209, 102, 0.15), transparent 70%)',
          top: `calc(${mousePosition.y * 100}% - 192px)`,
          left: `calc(${mousePosition.x * 100}% - 192px)`,
          transform: 'translate(0, 0)',
          transition: 'top 1s ease-out, left 1s ease-out',
        }}
      />
      <div 
        className="absolute h-80 w-80 rounded-full blur-[120px] -z-5"
        style={{
          background: 'radial-gradient(circle, rgba(0, 153, 255, 0.15), transparent 70%)',
          bottom: `calc(${(1-mousePosition.y) * 100}% - 160px)`,
          right: `calc(${(1-mousePosition.x) * 100}% - 160px)`,
          transform: 'translate(0, 0)',
          transition: 'bottom 1.2s ease-out, right 1.2s ease-out',
        }}
      />
      
      {/* Pulsing rings */}
      <div className="absolute top-1/4 left-1/4 -z-5">
        <div className="absolute w-16 h-16 rounded-full border border-finance-green/20"
          style={{ animation: 'pulse 4s ease-in-out infinite' }}></div>
        <div className="absolute w-32 h-32 rounded-full border border-finance-green/10"
          style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '1s' }}></div>
        <div className="absolute w-48 h-48 rounded-full border border-finance-green/5"
          style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '2s' }}></div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 -z-5">
        <div className="absolute w-16 h-16 rounded-full border border-finance-blue/20"
          style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '0.5s' }}></div>
        <div className="absolute w-32 h-32 rounded-full border border-finance-blue/10"
          style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '1.5s' }}></div>
        <div className="absolute w-48 h-48 rounded-full border border-finance-blue/5"
          style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '2.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="block relative">
              The Market. At a Glance.
              <span className="absolute -bottom-2 left-1/2 w-20 h-1 bg-finance-green/80 transform -translate-x-1/2 rounded-full"></span>
            </span>
            <span className="block mt-4">
              <span 
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
                Before 9 AM.
              </span>
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            No opinions. No hype. Just a crisp morning snapshot of what's moving markets global and local.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="text-lg py-6 px-8 bg-finance-green hover:bg-finance-green/90 text-black font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-finance-green/30 hover:-translate-y-1"
              size="lg"
            >
              Subscribe Now
            </Button>
            <Button 
              className="text-lg py-6 px-8 bg-transparent border border-white/20 hover:bg-white/10 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:border-white/40 hover:-translate-y-1"
              variant="outline" 
              size="lg"
            >
              View Sample Report
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-6 sm:space-x-12">
            <div className="text-center">
              <p className="text-3xl font-bold" style={{
                background: 'linear-gradient(90deg, #00D166, #00D166)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>99%</p>
              <p className="text-sm text-gray-400">Delivered On Time</p>
            </div>
            <div className="h-10 w-px bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl font-bold" style={{
                background: 'linear-gradient(90deg, #00D166, #0099FF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>2,000+</p>
              <p className="text-sm text-gray-400">Daily Subscribers*</p>
            </div>
            <div className="h-10 w-px bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl font-bold" style={{
                background: 'linear-gradient(90deg, #0099FF, #0099FF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>50+</p>
              <p className="text-sm text-gray-400">Data Points</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add the keyframes as a global style */}
      <style dangerouslySetInnerHTML={{ __html: animations }} />
    </div>
  );
}
