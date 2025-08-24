// src/components/Banner.jsx
export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-center gap-10">
        
        {/* Left text content */}
        <div className="space-y-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Fresh & Fast <span className="text-green-600">Food Delivery</span>
          </h1>
          <p className="text-lg text-gray-600">
            Order your favorite meals anytime, anywhere. Delivered hot and fresh
            to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row  gap-4">
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition">
              Order Now
            </button>
            <button className="px-6 py-3 border border-green-600 text-green-600 font-semibold rounded-xl hover:bg-green-50 transition">
              Explore Menu
            </button>
          </div>
        </div>

        {/* Right image content */}
        <div className="flex justify-center">
          <img
            src="/banner-no-bg.png"
            alt="Delicious pizza with toppings"
            className="w-full max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
