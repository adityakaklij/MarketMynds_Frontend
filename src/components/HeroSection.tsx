import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-[#0A1122] to-black -z-10"
        aria-hidden="true"
      />
      
      {/* Animated graph lines in background */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0"
        >
          <path
            d="M0,70 Q25,50 50,70 T100,50 L100,100 L0,100 Z"
            fill="none"
            stroke="#00D166"
            strokeWidth="0.5"
            className="animate-pulse"
          />
          <path
            d="M0,50 Q25,70 50,50 T100,70 L100,100 L0,100 Z"
            fill="none"
            stroke="#0099FF"
            strokeWidth="0.5"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Accent circles */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-finance-green via-finance-blue to-finance-green/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-finance-green via-finance-blue to-finance-green/10 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="block">Daily Market Insights</span>
            <span className="block mt-2">
              Delivered to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-finance-green via-finance-blue to-finance-green">WhatsApp</span>
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Professional stock market analysis delivered each morning before markets open. 
            Actionable insights, trends, and predictions to power your investment decisions.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="text-lg py-6 px-8 bg-transparent font-medium shadow-lg shadow-finance-green/20 border-2 border-transparent relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-finance-green before:to-finance-blue before:z-[-1] before:opacity-100 before:transition-opacity hover:before:opacity-80 before:border-gradient"
              size="lg"
            >
              <span className="bg-gradient-to-r from-finance-green to-finance-blue bg-clip-text text-transparent">Start Your Free Trial</span>
            </Button>
            <Button 
              className="text-lg py-6 px-8 bg-transparent border-2 border-gradient-to-r border-finance-green border-finance-blue hover:border-finance-blue text-white shadow-lg"
              variant="outline" 
              size="lg"
            >
              View Sample Report
            </Button>
          </div>
          
          <div className="mt-10 flex items-center justify-center space-x-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-finance-green">98%</p>
              <p className="text-sm text-gray-400">Accuracy Rate</p>
            </div>
            <div className="h-10 w-px bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-finance-green">5,000+</p>
              <p className="text-sm text-gray-400">Daily Subscribers</p>
            </div>
            <div className="h-10 w-px bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-finance-green">365</p>
              <p className="text-sm text-gray-400">Days/Year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
