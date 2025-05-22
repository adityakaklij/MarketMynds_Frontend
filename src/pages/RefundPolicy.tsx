import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Refund Policy</h1>
        <div className="space-y-4 text-gray-300">
          {/* <p>Market Mynds provides pre-market data and reports for informational purposes only. We do not provide investment advice, tips, or buy/sell signals.</p> */}
          <p>At Market Mynds, we strive to ensure that our users are satisfied with the services and content we provide. This Refund Policy outlines the terms and conditions under which refunds may be issued for our digital subscription services.</p>
          
          
          <h2> 1. Nature of Service</h2>
          <p>We provide digital content in the form of downloadable PDF files, which are sent to the user's WhatsApp number after successful subscription to one of our plans. These files are delivered electronically and are accessible shortly after payment is confirmed.</p>

            <h2>2. Refund Eligibility</h2>
            <p>You are eligible to request a refund under the following conditions:

<li>The refund request is made within 3 calendar days of the original purchase date.</li>

<li>The user has not violated our terms of service or misused the subscription in any way.</li>

<li>If your request meets the above criteria, we will initiate the refund process immediately.</li>

</p>
            <h2>3. Refund Process</h2>
            <p>Once the users initiated the Refund Request, Will process the reqest within 1-2 working days.</p>
            <p>Once your refund request is approved, the funds will be credited back to your original payment method within 5–10 business days, depending on your bank or payment provider's processing times.</p>
            
            
            <h2>4. How to Request a Refund</h2>
            <p>To request a refund, please contact our support team via email or WhatsApp, providing the following information:

<li>Full name </li>


<li>WhatsApp number used during subscription</li>


<li>Date of purchase</li>

<li>Reason for refund</li>

We aim to respond to all refund requests promptly and process eligible refunds without unnecessary delay.
</p>

<h2>5. Non-Refundable Situations</h2>
<p>Refunds will not be issued under the following circumstances:

<li>The request is made after 3 days from the date of purchase.</li>


<li>The request lacks sufficient purchase details or is made with fraudulent intent.</li></p>

       

<h2>Please contact us at</h2>

email: support@marketmynds.com
        </div>
        <div className="mt-8 text-xs text-gray-400 text-center">
          Last updated: 21 May 2025
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}