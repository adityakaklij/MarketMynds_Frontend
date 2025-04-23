
import { BadgeIndianRupee, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    title: "1 Month",
    price: "₹99",
    description: "Full pre-market access, billed monthly.",
    bonus: false
  },
  {
    title: "3 Months",
    price: "₹249",
    description: "Save 16% - Full access for 3 months.",
    bonus: false
  },
  {
    title: "6 Months",
    price: "₹449",
    description: "Save 24% - Full access for 6 months.",
    bonus: false
  },
  {
    title: "12 Months",
    price: "₹649",
    description: "Best value - Full access for 12 months.",
    bonus: true
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-1">Plans & Pricing</h1>
        <p className="mb-8 text-gray-300 text-lg">Simple, transparent pricing. No auto-renewals. 3-day refund window.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
        {plans.map((plan) => (
          <div key={plan.title} className="rounded-xl border border-finance-green/20 bg-gradient-to-b from-finance-blue/5 to-black p-8 flex flex-col items-center shadow-lg shadow-black/20">
            <div className="flex items-center gap-2 mb-2">
              <BadgeIndianRupee className="text-finance-green" />
              <span className="text-2xl font-semibold">{plan.title}</span>
              {plan.bonus && (
                <span className="ml-2 px-2 py-1 rounded bg-finance-green/10 text-finance-green text-xs font-medium">Best Value</span>
              )}
            </div>
            <div className="text-3xl font-extrabold mb-2">{plan.price}</div>
            <div className="text-gray-400 mb-6">{plan.description}</div>
            <Button className="bg-finance-green hover:bg-finance-green/90 text-black/90 w-full font-semibold">
              Choose {plan.title}
            </Button>
          </div>
        ))}
      </div>
      <div className="max-w-lg mx-auto text-center">
        <div className="text-lg font-medium flex items-center justify-center gap-2 mb-2">
          <Receipt className="text-finance-green" size={20} />No auto-renewals. 3-day refund window after purchase.
        </div>
        
        {/* <div className="text-gray-400 text-sm mb-4">
          Includes macro tracking templates & a weekly trading planner.
        </div>
        <div className="text-gray-400 text-xs">
          No auto-renewals. 3-day refund window after purchase.
        </div> */}
      </div>
    </div>
  );
}
