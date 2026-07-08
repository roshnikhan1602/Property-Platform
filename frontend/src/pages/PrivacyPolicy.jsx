import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  FaUserShield,
  FaDatabase,
  FaLock,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">

            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Privacy Policy
            </h1>

            <p className="text-gray-600 text-center mt-4 max-w-3xl mx-auto">
              At <span className="font-semibold">PropertyHub</span>,
              we value your privacy and are committed to protecting
              your personal information. This Privacy Policy explains
              how we collect, use and safeguard your data while you
              use our platform.
            </p>

            {/* Information We Collect */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <FaDatabase className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-semibold">
                  Information We Collect
                </h2>
              </div>

              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Name and profile information</li>
                <li>Mobile number and email address</li>
                <li>Property and PG listings</li>
                <li>Profile images uploaded by users</li>
                <li>Subscription and payment details</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <FaUserShield className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-semibold">
                  How We Use Your Information
                </h2>
              </div>

              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Create and manage your account.</li>
                <li>Verify your identity using OTP.</li>
                <li>Allow you to post and manage listings.</li>
                <li>Process subscription payments securely.</li>
                <li>Improve our platform and user experience.</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <FaLock className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-semibold">
                  Data Security
                </h2>
              </div>

              <p className="text-gray-600 leading-7">
                We take appropriate security measures to protect your
                information. Authentication is secured using HTTP-only
                cookies, property images are stored securely through
                Cloudinary, and subscription payments are processed
                using Razorpay's secure payment gateway.
              </p>
            </div>

            {/* Third Party Services */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <FaGlobe className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-semibold">
                  Third-Party Services
                </h2>
              </div>

              <p className="text-gray-600 leading-7">
                PropertyHub integrates trusted third-party services,
                including Cloudinary for image storage and Razorpay
                for secure payment processing.
              </p>
            </div>

            {/* Contact */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <FaEnvelope className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-semibold">
                  Contact Us
                </h2>
              </div>

              <p className="text-gray-600">
                If you have any questions regarding this Privacy
                Policy, please contact us at:
              </p>

              <p className="mt-3 font-semibold text-blue-600">
                support@propertyhub.com
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;