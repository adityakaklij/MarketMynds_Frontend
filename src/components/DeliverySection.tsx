
export function DeliverySection() {
  return (
    <section className="py-16 bg-black/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Delivered Daily on WhatsApp
        </h2>
        <ul className="mb-8 text-lg text-gray-300 space-y-2">
          <li>Monday to Friday</li>
          <li>By 8:00 AM IST</li>
          <li>No app. No login. Just clean data, delivered straight to your inbox.</li>
        </ul>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-[#16e7ff] via-[#b16cea] to-[#ff5e69] text-black text-base font-bold shadow shadow-[#16e7ff20]">
            Your morning market advantage—no noise, just numbers.
          </div>
        </div>
      </div>
    </section>
  );
}
