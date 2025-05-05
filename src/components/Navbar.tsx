import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Logo from '../../public/matketMyndsLogo.png'
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    // { label: "Features", href: "#features", isAnchor: true },
    // { label: "Preview", href: "#preview", isAnchor: true },
    { label: "Pricing", href: "#pricing", isAnchor: true },
    { label: "Contact", href: "/contact", isAnchor: false },
    { label: "Love ❤️", href: "#testimonials", isAnchor: true },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white">
                {/* Market<span className="text-finance-green">Mynds</span> */}
                {/* <img src={Logo}  style={{ height: "50px", width: "250px" }}alt="" /> */}
                <img src={Logo} alt="Market Mynds" style={{ height: "30px" }} className="mt-2" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) =>
                  link.isAnchor ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      onClick={(e) => {
                        // Only use anchor navigation on home page
                        if (location.pathname !== '/') {
                          e.preventDefault();
                          window.location.href = '/' + link.href;
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={cn(
                        "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium",
                        location.pathname === link.href && "underline text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="#pricing">
              <Button
                variant="default"
                className="bg-finance-green text-black hover:bg-finance-green/90 font-medium"
                onClick={(e) => {
                  // Only use anchor navigation on home page
                  if (location.pathname !== '/') {
                    e.preventDefault();
                    window.location.href = '/#pricing';
                  }
                }}
              >
                Subscribe Now
              </Button>
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
              aria-expanded={isMenuOpen}
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
          {navLinks.map((link) =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  // Only use anchor navigation on home page
                  if (location.pathname !== '/') {
                    e.preventDefault();
                    window.location.href = '/' + link.href;
                  }
                }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.href && "underline text-white"
                )}
                onClick={(e) => {
                  setIsMenuOpen(false);
                  // Only use anchor navigation on home page
                  if (location.pathname !== '/') {
                    e.preventDefault();
                    window.location.href = '/' + link.href;
                  }
                }}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/privacy-policy"
            className="block text-gray-400 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={(e) => {
              setIsMenuOpen(false);
              // Only use anchor navigation on home page
              if (location.pathname !== '/') {
                e.preventDefault();
                window.location.href = '/privacy-policy';
              }
            }}
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="block text-gray-400 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={(e) => {
              setIsMenuOpen(false);
              // Only use anchor navigation on home page
              if (location.pathname !== '/') {
                e.preventDefault();
                window.location.href = '/terms';
              }
            }}
          >
            Terms
          </Link>
          <a href="#subscription">
            <Button
              variant="default"
              className="w-full bg-finance-green text-black hover:bg-finance-green/90 font-medium mt-2"
            >
              Start My Trial
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
