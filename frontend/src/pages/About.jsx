import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-gray-800">
              About PropertyHub
            </h1>

            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              PropertyHub is a modern property
              platform that helps users buy,
              sell and rent properties across
              India with ease.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 mb-10">

            <h2 className="text-2xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8">
              Our mission is to simplify the
              property search experience by
              providing a secure, transparent
              and user-friendly platform for
              property owners and seekers.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 mb-10">

            <h2 className="text-2xl font-bold mb-4">
              Why Choose Us?
            </h2>

            <ul className="space-y-3 text-gray-600">
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

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <h3 className="text-4xl font-bold text-blue-600">
                25+
              </h3>

              <p className="mt-2 text-gray-600">
                Properties
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <h3 className="text-4xl font-bold text-green-600">
                15+
              </h3>

              <p className="mt-2 text-gray-600">
                Users
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <h3 className="text-4xl font-bold text-purple-600">
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