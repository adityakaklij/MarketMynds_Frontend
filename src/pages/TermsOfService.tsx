
import React from "react";

const TermsOfService = () => (
  <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-24 px-4">
    <div className="max-w-3xl mx-auto bg-black/80 rounded-2xl p-8 shadow-lg">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-finance-green to-finance-blue bg-clip-text text-transparent">
        Terms of Service
      </h1>
      <p className="mb-6 text-gray-300">
        Welcome to MarketWhisper. By subscribing to our daily stock market analysis reports, you agree to the following terms...
      </p>
      <ul className="list-disc ml-6 text-gray-400 space-y-2 mb-8">
        <li>Our analysis is provided purely for informational purposes and is not investment advice.</li>
        <li>Do not share subscription content with others without written permission.</li>
        <li>MarketWhisper reserves the right to discontinue service at any time with or without notice.</li>
        <li>Subscription payments are non-refundable, except during the free trial period.</li>
      </ul>
      <p className="text-sm text-gray-500">
        If you have questions, please contact us at <a href="/contact" className="underline text-finance-green">Contact Us</a>.
      </p>
    </div>
  </div>
);

export default TermsOfService;
