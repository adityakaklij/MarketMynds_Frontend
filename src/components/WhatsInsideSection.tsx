
export function WhatsInsideSection() {
  return (
    <section className="py-20 bg-black/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          What’s Inside the Report
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Global Markets Overview",
              desc: "GIFT Nifty, US indices, major Asian markets—condensed and visual."
            },
            {
              title: "India Market Setup",
              desc: "Nifty, Bank Nifty, Sensex, India VIX, and sector performance at a glance."
            },
            {
              title: "FII / DII Activity",
              desc: "Daily institutional flows in equities and derivatives."
            },
            {
              title: "Options Data Summary",
              desc: "Open interest shifts, put-call ratios, and max pain levels."
            },
            {
              title: "News Recap",
              desc: "Key domestic and global headlines impacting sentiment."
            },
            {
              title: "Economic Calendar",
              desc: "Major data releases, RBI updates, and global policy events to watch."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="glass-card bg-gradient-to-br from-white/5 via-[#23235a]/5 to-black/10 p-6 rounded-xl border border-[#16e7ff30] relative group"
            >
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-300">{item.desc}</p>
              <div className="h-[3px] w-10 bg-gradient-to-r from-[#16e7ff] via-[#b16cea] to-[#ff5e69] mt-4 group-hover:w-20 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
