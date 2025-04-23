
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Gradient and background styles preserved */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-[#0A1122] to-black -z-10" aria-hidden="true" />

      {/* Animated chart lines */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0">
          <path d="M0,70 Q25,50 50,70 T100,50 L100,100 L0,100 Z" fill="none" stroke="#8685ff" strokeWidth="0.7" className="animate-pulse" />
          <path d="M0,50 Q25,70 50,50 T100,70 L100,100 L0,100 Z" fill="none" stroke="#0FC7FF" strokeWidth="0.4" className="animate-pulse" />
        </svg>
      </div>

      {/* Accent circles */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#b16cea]/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            <span className="block">The Market. At a Glance. Before 9 AM.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 mb-8 max-w-xl mx-auto">
            No opinions. No hype. Just a crisp morning snapshot of what’s moving markets—global and local.<br />
            <span className="block mt-4">
              <b>Market Mynds</b> delivers reliable, data-driven pre-market reports to your WhatsApp every morning at <b>8:00 AM IST</b>.
            </span>
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
            <Button
              className="text-lg py-6 px-8 bg-transparent border-2 font-bold rounded-lg bg-gradient-to-br from-[#16e7ff] via-[#b16cea] to-[#ff5e69] border-[3px] border-transparent hover:border-white text-white shadow-lg [background-clip:padding-box] relative transition"
              style={{
                borderImage: "linear-gradient(90deg, #16e7ff, #b16cea, #ff5e69) 1",
                boxShadow: "0 0 24px 0 #16e7ff50",
              }}
              size="lg"
            >
              Start My Trial
            </Button>
          </div>
          <div className="mt-10 text-gray-400 italic text-base">
            Your first report arrives tomorrow at 8:00 AM
          </div>
        </div>
      </div>
    </div>
  );
}
