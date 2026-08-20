import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function About({
  setShowLoginModal,
}) {
  return (
    <>
      <Navbar
        setShowLoginModal={
          setShowLoginModal
        }
      />

      <div className="min-h-screen bg-gray-50 pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-10 sm:mb-14">

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              About PropertyHub
            </h1>

            <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-sm sm:text-base leading-7">
              PropertyHub is a modern property
              platform that helps users buy,
              sell and rent properties across
              India with ease.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-8 mb-8 sm:mb-10">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
              Our mission is to simplify the
              property search experience by
              providing a secure, transparent
              and user-friendly platform for
              property owners and seekers.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-8 mb-8 sm:mb-10">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Why Choose Us?
            </h2>

            <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
              <li>
                ✓ Verified Property Listings
              </li>

              <li>
                ✓ Easy Property Management
              </li>

              <li>
                ✓ Wishlist Feature
              </li>

              <li>
                ✓ Owner Dashboard
              </li>

              <li>
                ✓ Secure User Experience
              </li>
            </ul>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">

            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">
                25+
              </h3>

              <p className="mt-2 text-gray-600">
                Properties
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-green-600">
                15+
              </h3>

              <p className="mt-2 text-gray-600">
                Users
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center sm:col-span-2 md:col-span-1">
              <h3 className="text-3xl sm:text-4xl font-bold text-purple-600">
                10+
              </h3>

              <p className="mt-2 text-gray-600">
                Cities
              </p>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default About;