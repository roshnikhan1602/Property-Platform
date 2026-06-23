import { useNavigate } from "react-router-dom";
import HeroSlider from "./HeroSlider";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="text-center lg:text-left">

            <span className="inline-block bg-blue-600/20 border border-blue-400 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
              Trusted Property Marketplace
            </span>

            <h1 className="mt-6 text-5xl md:text-7xl font-bold text-white leading-tight">
              Find Your
              <span className="text-blue-400">
                {" "}Dream Property
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-200 max-w-xl">
              Buy, rent, and discover verified properties across India.
              Explore apartments, villas, houses, and plots tailored to your needs.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4">

              <button
                onClick={() => navigate("/properties")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
              >
                Browse Properties
              </button>

              <button
                onClick={() => navigate("/add-property")}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition cursor-pointer"
              >
                Post Property
              </button>

            </div>

          </div>

          <HeroSlider />

        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10">
            <h2 className="text-4xl font-bold text-white">
              10,000+
            </h2>

            <p className="mt-2 text-gray-200">
              Properties Listed
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10">
            <h2 className="text-4xl font-bold text-white">
              100+
            </h2>

            <p className="mt-2 text-gray-200">
              Cities Covered
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10">
            <h2 className="text-4xl font-bold text-white">
              5,000+
            </h2>

            <p className="mt-2 text-gray-200">
              Happy Users
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;