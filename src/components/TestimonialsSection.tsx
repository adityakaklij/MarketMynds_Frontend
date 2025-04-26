
import { Card } from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I've cut my morning prep time in half. Everything I need. global cues, key levels, volumes is right there at 8 AM. No fluff, just facts.",
      author: "Aniket R.",
      role: "Options Trader",
      avatar: "A"
    },
    {
      quote: "I don’t have time to track 10 sites before work. Market Mynds gives me a full market picture in 5 minutes, every day.",
      author: "Ritika M.",
      role: "Equity Investor & Analyst",
      avatar: "R"
    },
    {
      quote: "I subscribed for a month to try it out. Renewed for a year within two weeks. It’s that good. You should also give it a try.",
      author: "Gangesh",
      role: "Chartered Accountant",
      avatar: "G"
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trusted by Traders & Investors
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Hear what our subscribers say about our daily market analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card p-6 hover:border-finance-green/50 transition-all">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-finance-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-gray-300 mb-6">"{testimonial.quote}"</blockquote>
              
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-finance-blue flex items-center justify-center">
                    <span className="text-white font-medium">{testimonial.avatar}</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          {/* <p className="text-finance-green font-bold">Join over 2,000 satisfied subscribers</p> */}
          <p className="text-finance-green font-bold">Join our community now</p>
          <p className="text-gray-400 mt-2">Our community is growing every day. Don't miss out!</p>
        </div>
      </div>
    </section>
  );
}
