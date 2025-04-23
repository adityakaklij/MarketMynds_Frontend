
import React from "react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-24 px-4">
    <div className="max-w-3xl mx-auto bg-black/80 rounded-2xl p-8 shadow-lg">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-finance-green to-finance-blue bg-clip-text text-transparent">
        Privacy Policy
      </h1>
      <p className="mb-6 text-gray-300">
        We care about your privacy. This policy outlines how your data is collected, used, and protected:
      </p>
      <ul className="list-disc ml-6 text-gray-400 space-y-2 mb-8">
        <li>Your contact info is used only for delivering market reports and service-related communications.</li>
        <li>We do not sell, trade, or share your personal information with third parties.</li>
        <li>All payments are processed through secure, certified payment gateways.</li>
        <li>You can unsubscribe at any time to stop receiving messages.</li>
      </ul>
      <p className="text-sm text-gray-500">
        For privacy concerns, please <a href="/contact" className="underline text-finance-green">Contact Us</a>.
      </p>
    </div>
  </div>
);

export default PrivacyPolicy;
