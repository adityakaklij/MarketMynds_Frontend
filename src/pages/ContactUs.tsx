
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

const ContactUs = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-24 px-4">
      <div className="max-w-xl mx-auto bg-black/80 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-finance-green to-finance-blue bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="mb-8 text-gray-300">
          Reach out with questions or feedback. We'll respond within 24 hours.
        </p>
        {sent ? (
          <div className="p-4 bg-gradient-to-r from-finance-green to-finance-blue rounded text-black font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Your message has been sent!
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input required type="text" placeholder="Your Name" className="bg-gray-900 border-gray-700" />
            </div>
            <div>
              <Input required type="email" placeholder="Your Email" className="bg-gray-900 border-gray-700" />
            </div>
            <div>
              <Textarea required placeholder="Your Message" className="bg-gray-900 border-gray-700 min-h-[120px]" />
            </div>
            <Button 
              className="w-full py-6 bg-transparent border-2 border-transparent relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-finance-green before:to-finance-blue before:z-[-1] before:opacity-100 font-bold text-black"
              type="submit"
            >
              <span className="bg-gradient-to-r from-finance-green to-finance-blue bg-clip-text text-transparent flex items-center justify-center"><MessageSquare className="mr-2 h-5 w-5" />Send Message</span>
            </Button>
          </form>
        )}
        <div className="mt-8 text-xs text-gray-400">
          Or email: <span className="underline">support@marketwhisper.com</span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
