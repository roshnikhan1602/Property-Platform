import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
          Find Your Dream Property
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Buy, Rent and Explore Properties Across India with ease.
          Discover apartments, villas, houses and plots that match your lifestyle.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          <button
            onClick={() => navigate("/properties")}
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-700 hover:text-white transition duration-300 cursor-pointer"
          >
            Browse Properties
          </button>

          <button
            onClick={() => navigate("/add-property")}
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-700 hover:text-white transition duration-300 cursor-pointer"
          >
            Post Property
          </button>

        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              10,000+
            </h2>

            <p className="mt-2 text-gray-600">
              Properties Listed
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              100+
            </h2>

            <p className="mt-2 text-gray-600">
              Cities Covered
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              5,000+
            </h2>

            <p className="mt-2 text-gray-600">
              Happy Users
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;