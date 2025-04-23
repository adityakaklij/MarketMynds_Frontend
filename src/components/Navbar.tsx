import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-white">Market<span className="text-finance-green">Whisper</span></span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#preview" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Preview</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Testimonials</a>
                <a href="#pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button
              variant="default"
              className="font-medium border-2 border-transparent relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-finance-green before:to-finance-blue before:z-[-1] before:opacity-100 before:transition-opacity hover:before:opacity-80 before:border-gradient text-black bg-transparent"
            >
              <span className="bg-gradient-to-r from-finance-green to-finance-blue bg-clip-text text-transparent">Subscribe Now</span>
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={cn("h-6 w-6", isMenuOpen ? "hidden" : "block")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={cn("h-6 w-6", isMenuOpen ? "block" : "hidden")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/80 backdrop-blur-lg">
          <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
          <a href="#preview" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Preview</a>
          <a href="#testimonials" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
          <a href="#pricing" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
          <a href="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          <div className="pt-2 pb-1">
            <Button
              variant="default"
              className="w-full font-medium border-2 border-transparent relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-finance-green before:to-finance-blue before:z-[-1] before:opacity-100 before:transition-opacity hover:before:opacity-80 before:border-gradient text-black bg-transparent"
            >
              <span className="bg-gradient-to-r from-finance-green to-finance-blue bg-clip-text text-transparent">Subscribe Now</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
