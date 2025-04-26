import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          <p className="mb-4 text-gray-300">
            At Market Mynds, we are committed to protecting your privacy. Your information is never shared or sold. We only use your phone number and/or email to deliver reports and provide support.
          </p>
          <h2 className="text-xl mt-8 mb-2 font-semibold">Data Collection & Use</h2>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <li>We collect only what's necessary: name, WhatsApp number, email (if provided).</li>
            <li>Your data is used exclusively for service delivery and customer support.</li>
          </ul>
          <h2 className="text-xl mt-8 mb-2 font-semibold">Security</h2>
          <p className="mb-4 text-gray-300">
            All communication is encrypted and secured. We never request passwords or payment details over WhatsApp or email.
          </p>
          <h2 className="text-xl mt-8 mb-2 font-semibold">Contact</h2>
          <p className="mb-8 text-gray-300">
            For privacy questions, email us at <a className="text-finance-green hover:underline" href="mailto:support@marketmynds.com">support@marketmynds.com</a>.
          </p>
          <div className="text-xs text-gray-400 text-center">
            Last updated: April 2025
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
