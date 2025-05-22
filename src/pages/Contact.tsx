import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Contact() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="mb-8 text-gray-300 text-lg">
          We're here to help. Reach out with questions about Market Mynds reports, plans, feedback, or media inquiries.
        </p>
        <div className="flex flex-col items-center gap-5 mb-10">
          <div className="flex items-center gap-3 text-lg">
            <Mail className="text-finance-green" />
            <a href="mailto:support@marketmynds.com" className="text-white hover:text-finance-green transition-colors">
              support@marketmynds.com
            </a>
          </div>
            Resmic
            <br />
            Address: Om Sai, 102, Hanuman Tekdi Manmad Road, Nandgaon, Nashik, Maharashtra 423106
            <br />
            Contact: +91 7620513676
          {/* <div className="flex items-center gap-3 text-lg text-finance-green">
            <Phone /><span className="text-white">+91 90000-00000</span>
          </div> */}
        </div>
        <a href="mailto:support@marketmynds.com">
          <Button className="bg-finance-green text-black hover:bg-finance-green/90 px-8 text-lg" size="lg">Email Us</Button>
        </a>
      </div>
    </div>
    <Footer/>
    </>
  );
}
