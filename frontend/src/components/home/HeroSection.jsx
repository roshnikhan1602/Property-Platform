import { useNavigate } from "react-router-dom";
import HeroSlider from "./HeroSlider";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="text-center md:text-left">

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Find Your Dream Property
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              Buy, Rent and Explore Properties Across India with ease.
              Discover apartments, villas, houses and plots that match your lifestyle.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center md:items-start gap-4">

              <button
                onClick={() => navigate("/properties")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Browse Properties
              </button>

              <button
                onClick={() => navigate("/add-property")}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 cursor-pointer"
              >
                Post Property
              </button>

            </div>

          </div>

          {/* Right Slider */}
          <HeroSlider />

        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div>
            <h2 className="text-4xl font-bold text-white">
              10,000+
            </h2>

            <p className="mt-2 text-gray-200">
              Properties Listed
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">
              100+
            </h2>

            <p className="mt-2 text-gray-200">
              Cities Covered
            </p>
          </div>

          <div>
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