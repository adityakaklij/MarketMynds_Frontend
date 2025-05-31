import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PreviewSection } from "@/components/PreviewSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SubscriptionCTA } from "@/components/SubscriptionCTA";
import { Footer } from "@/components/Footer";
import { ReportPreviewSection } from "@/components/ReportPreviewSection";
import { HowItWorks } from "@/components/HowItWorks";
import { useState, useEffect } from "react";
import Pricing from "./Pricing";

// CSS for light theme with blue accents
const lightThemeStyles = `
  .light-theme {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f7fa;
    --text-primary: #1a202c;
    --text-secondary: #4a5568;
    --accent-color: #3182ce;
    --border-color: #e2e8f0;
    --card-bg: #ffffff;
    --finance-green: #3182ce;
    --finance-blue: #4299e1;
    --highlight-color: #ebf8ff;
  }

  /* Global styles */
  .light-theme {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  /* Base element styles */
  .light-theme h1, 
  .light-theme h2, 
  .light-theme h3, 
  .light-theme h4,
  .light-theme .section-title {
    color: var(--text-primary);
  }

  .light-theme p,
  .light-theme .section-description {
    color: var(--text-secondary);
  }

  .light-theme button {
    background-color: var(--accent-color);
  }

  .light-theme button.outline {
    background-color: transparent;
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  /* Navbar */
  .light-theme .navbar,
  .light-theme nav {
    background-color: var(--bg-primary);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .light-theme .navbar a,
  .light-theme .navbar button,
  .light-theme nav a,
  .light-theme nav button {
    color: var(--text-primary);
  }

  /* Hero Section */
  .light-theme .hero-section {
    background-color: var(--bg-primary);
  }

  .light-theme .hero-section h1,
  .light-theme .hero-section h2 {
    color: var(--text-primary);
  }

  .light-theme .hero-section p {
    color: var(--text-secondary);
  }

  /* How It Works - UPDATED */
  .light-theme section:has(.container h2:contains("How it Works")) {
    background-color: var(--bg-primary) !important;
  }

  .light-theme .py-20.bg-black {
    background-color: var(--bg-primary) !important;
    background-image: none !important;
  }

  .light-theme .bg-gray-900\\/50 {
    background-color: var(--bg-secondary) !important;
    backdrop-filter: none !important;
  }

  .light-theme .bg-gray-900\\/50.backdrop-blur-sm {
    border: 1px solid var(--border-color) !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
  }

  .light-theme .w-16.h-16.bg-finance-green {
    background-color: var(--accent-color) !important;
  }

  .light-theme .text-gray-300 {
    color: var(--text-secondary) !important;
  }

  /* Report Preview Section - UPDATED */
  .light-theme #report-preview {
    background-color: var(--bg-primary) !important;
  }

  .light-theme #report-preview h2.text-lg {
    color: var(--accent-color) !important;
  }

  .light-theme #report-preview h3.text-3xl,
  .light-theme #report-preview h4.text-xl {
    color: var(--text-primary) !important;
  }

  .light-theme #report-preview p.text-xl,
  .light-theme #report-preview .text-gray-400 {
    color: var(--text-secondary) !important;
  }

  .light-theme #report-preview .bg-gray-900\\/50,
  .light-theme #report-preview .bg-gray-800\\/50 {
    background-color: var(--bg-secondary) !important;
    border: 1px solid var(--border-color) !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
  }

  .light-theme #report-preview .bg-gray-800 {
    background-color: var(--bg-secondary) !important;
  }

  .light-theme #report-preview .rounded-lg,
  .light-theme #report-preview .rounded-xl,
  .light-theme #report-preview .rounded-full {
    border: 1px solid var(--border-color);
  }

  .light-theme #report-preview .border-gray-800 {
    border-color: var(--border-color) !important;
  }

  .light-theme #report-preview .text-white,
  .light-theme #report-preview .text-finance-blue {
    color: var(--text-primary) !important;
  }

  /* Preview Section - UPDATED */
  .light-theme #preview {
    background-color: var(--bg-secondary) !important;
  }

  .light-theme #preview h2.text-3xl,
  .light-theme #preview h3.text-2xl {
    color: var(--text-primary) !important;
  }

  /* Fix for the colored headings in Preview Section */
  .light-theme #preview .glass-card h4.text-finance-green,
  .light-theme .text-finance-green {
    color: var(--accent-color) !important;
  }

  .light-theme #preview .glass-card h4.text-finance-blue,
  .light-theme .text-finance-blue {
    color: var(--finance-blue) !important;
  }

  .light-theme #preview .glass-card h4.text-finance-gold,
  .light-theme .text-finance-gold {
    color: #FFD700 !important;
  }

  .light-theme #preview p.text-xl,
  .light-theme #preview .text-gray-300,
  .light-theme #preview .text-gray-400 {
    color: var(--text-secondary) !important;
  }

  .light-theme #preview .glass-card {
    background-color: var(--bg-primary) !important;
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  .light-theme #preview .bg-black {
    background-color: var(--bg-primary) !important;
  }

  .light-theme #preview .border-gray-800,
  .light-theme #preview .border-gray-700 {
    border-color: var(--border-color) !important;
  }

  .light-theme #preview .bg-gray-800 {
    background-color: #f0f0f0 !important;
  }

  .light-theme #preview .text-gray-400 {
    color: var(--text-secondary) !important;
  }

  /* Testimonials Section - UPDATED */
  .light-theme #testimonials {
    background: var(--bg-secondary) !important;
    background-image: none !important;
  }

  .light-theme #testimonials h2.text-3xl,
  .light-theme #testimonials h2.text-4xl {
    color: var(--text-primary) !important;
  }

  .light-theme #testimonials p.text-xl,
  .light-theme #testimonials .text-gray-400 {
    color: var(--text-secondary) !important;
  }

  .light-theme #testimonials .glass-card {
    background-color: var(--bg-primary) !important;
    border: 1px solid var(--border-color) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05) !important;
  }

  .light-theme #testimonials blockquote {
    color: var(--text-secondary) !important;
  }

  .light-theme #testimonials .text-gray-300 {
    color: var(--text-secondary) !important;
  }

  .light-theme #testimonials .text-white {
    color: var(--text-primary) !important;
  }

  .light-theme #testimonials .bg-finance-blue {
    background-color: var(--finance-blue) !important;
  }

  .light-theme #testimonials .text-finance-gold {
    color: #FFD700 !important;
  }

  .light-theme #testimonials .text-finance-green {
    color: var(--accent-color) !important;
  }
   
  /* Pricing Section */
  .light-theme #pricing {
    background-color: var(--bg-secondary) !important;
    color: var(--text-primary) !important;
  }

  .light-theme #pricing h1,
  .light-theme #pricing h2,
  .light-theme #pricing h3,
  .light-theme #pricing .text-white {
    color: var(--text-primary) !important;
  }

  .light-theme #pricing p,
  .light-theme #pricing .text-gray-300,
  .light-theme #pricing .text-gray-400 {
    color: var(--text-secondary) !important;
  }

  .light-theme #pricing .rounded-xl {
    background-color: var(--card-bg) !important;
    border: 1px solid var(--border-color) !important;
  }

  .light-theme #pricing .bg-black,
  .light-theme #pricing .from-black {
    background-color: var(--bg-primary) !important;
    background-image: none !important;
  }

  .light-theme #pricing .border-finance-green {
    border-color: var(--accent-color) !important;
  }

  .light-theme #pricing .bg-finance-green {
    background-color: var(--accent-color) !important;
  }

  .light-theme #pricing .text-finance-green {
    color: var(--accent-color) !important;
  }

  /* Dialog in Pricing */
  .light-theme .bg-black.border.border-finance-green\\/20 {
    background-color: var(--bg-primary) !important;
    border-color: var(--border-color) !important;
    color: var(--text-primary) !important;
  }
  
  /* Footer */
  .light-theme .footer {
    background-color: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    color: var(--text-primary);
  }

  .light-theme .footer a {
    color: var(--text-primary);
  }

  .light-theme .footer-copyright {
    color: var(--text-secondary);
  }

  /* Special Text Styles */
  .light-theme .gradient-text {
    background: linear-gradient(90deg, var(--accent-color), var(--finance-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  /* Override for common backgrounds */
  .light-theme .from-black,
  .light-theme .to-gray-900,
  .light-theme .bg-gradient-to-b {
    background: var(--bg-secondary) !important;
    background-image: none !important;
  }

  /* Override for stars in testimonials */
  .light-theme .text-finance-gold {
    color: #FFD700 !important;
  }

  /* Report Preview Section cards */
  .light-theme .bg-teal-600,
  .light-theme .bg-red-500, 
  .light-theme .bg-green-500,
  .light-theme .bg-blue-500,
  .light-theme .bg-blue-900 {
    opacity: 0.9;
  }

  /* Override for text in light theme */
  .light-theme .text-white,
  .light-theme .text-gray-100,
  .light-theme .text-gray-200 {
    color: var(--text-primary) !important;
  }

  .light-theme .text-gray-300,
  .light-theme .text-gray-400,
  .light-theme .text-gray-500 {
    color: var(--text-secondary) !important;
  }

  /* Override Tailwind Classes */
  .light-theme .bg-black {
    background-color: var(--bg-primary) !important;
  }

  .light-theme .bg-gray-900,
  .light-theme .bg-gray-800 {
    background-color: var(--bg-secondary) !important;
  }
  
  /* Fix for Pricing Plan Cards */
  .light-theme .from-finance-blue\\/5.to-black {
    background: var(--card-bg) !important;
  }

  /* Hover effects with blue accent */
  .light-theme .hover\\:border-finance-green\\/50:hover {
    border-color: var(--accent-color) !important;
    box-shadow: 0 0 15px rgba(49, 130, 206, 0.2) !important;
  }
`;

const LightTheme = () => {
  // Add light theme class to body
  useEffect(() => {
    document.body.classList.add('light-theme');
    
    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('light-theme');
    };
  }, []);

  return (
    <div className="min-h-screen light-theme">
      {/* Add light theme styles */}
      <style dangerouslySetInnerHTML={{ __html: lightThemeStyles }} />
      
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <ReportPreviewSection />
      <PreviewSection />
      <TestimonialsSection />
      <Pricing />
      <Footer />
    </div>
  );
};

export default LightTheme; 