
import { Button } from "@/components/ui/button";

export function PlansSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1e293b] via-[#171421]/90 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {[
            {
              duration: "1 Month",
              price: "₹149"
            },
            {
              duration: "3 Months",
              price: "₹395"
            },
            {
              duration: "6 Months",
              price: "₹595"
            },
            {
              duration: "12 Months",
              price: "₹795",
              badge: "Best Value"
            }
          ].map((plan, i) => (
            <div
              key={i}
              className="relative bg-black border-2 border-transparent rounded-xl p-7 text-center glass-card"
              style={{
                borderImage: "linear-gradient(90deg, #16e7ff, #b16cea, #ff5e69) 1"
              }}
            >
              {plan.badge && (
                <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-gradient-to-br from-[#16e7ff] via-[#b16cea] to-[#ff5e69] text-black font-bold">
                  {plan.badge}
                </span>
              )}
              <div className="text-xl font-bold text-white">{plan.duration}</div>
              <div className="text-3xl font-black my-2">{plan.price}</div>
              <div className="h-[2px] w-10 mx-auto mt-4 mb-2 bg-gradient-to-r from-[#16e7ff] via-[#b16cea] to-[#ff5e69]" />
            </div>
          ))}
        </div>
        <div className="mb-5 flex flex-col md:flex-row md:gap-4 items-center justify-center">
          <div className="text-center text-base text-gray-200 px-4 py-2 bg-black/70 rounded-lg">
            <b>Bonus:</b> Get our “Market Toolkit” with every plan—includes macro tracking templates and a weekly planner.
          </div>
        </div>
        <div className="text-center mb-3 mt-4 flex flex-col md:flex-row items-center justify-center gap-5">
          <span className="text-gray-400">3-day refund window.</span>
          <span className="text-gray-400">No auto-renewals.</span>
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            className="text-lg py-6 px-11 bg-transparent border-2 font-bold rounded-xl bg-gradient-to-br from-[#16e7ff] via-[#b16cea] to-[#ff5e69] border-[3px] border-transparent text-white shadow-lg [background-clip:padding-box] relative transition"
            style={{
              borderImage: "linear-gradient(90deg, #16e7ff, #b16cea, #ff5e69) 1",
            }}
            size="lg"
          >
            Start My Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
