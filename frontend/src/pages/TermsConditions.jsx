import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  FaFileContract,
  FaUserCheck,
  FaHome,
  FaCreditCard,
  FaBan,
  FaBalanceScale,
} from "react-icons/fa";

function TermsConditions() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Terms & Conditions
            </h1>

            <p className="text-gray-600 text-center mt-4 max-w-3xl mx-auto leading-7">
              Welcome to{" "}
              <span className="font-semibold">
                PropertyHub
              </span>
              . By accessing or using our platform, you agree to comply
              with the following Terms & Conditions. Please read them
              carefully before using our services.
            </p>

            {/* User Responsibilities */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <FaUserCheck className="text-2xl text-blue-600" />

                <h2 className="text-2xl font-semibold text-gray-800">
                  User Responsibilities
                </h2>
              </div>

              <ul className="list-disc list-inside text-gray-600 leading-8 space-y-1">
                <li>Provide accurate and up-to-date information.</li>
                <li>Maintain the confidentiality of your account.</li>
                <li>Use the platform responsibly and lawfully.</li>
                <li>Do not post misleading or fraudulent listings.</li>
              </ul>
            </div>

            {/* Property Listings */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <FaHome className="text-2xl text-blue-600" />

                <h2 className="text-2xl font-semibold text-gray-800">
                  Property & PG Listings
                </h2>
              </div>

              <p className="text-gray-600 leading-8">
                Users are solely responsible for the accuracy of the
                property or PG information they publish. PropertyHub
                reserves the right to remove listings that violate our
                guidelines or contain false information.
              </p>
            </div>

            {/* Subscription & Payments */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <FaCreditCard className="text-2xl text-blue-600" />

                <h2 className="text-2xl font-semibold text-gray-800">
                  Subscription & Payments
                </h2>
              </div>

              <p className="text-gray-600 leading-8">
                Premium subscriptions are processed securely through
                Razorpay. Users are responsible for selecting the
                subscription plan that best suits their requirements.
              </p>
            </div>

            {/* Account Suspension */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <FaBan className="text-2xl text-blue-600" />

                <h2 className="text-2xl font-semibold text-gray-800">
                  Account Suspension
                </h2>
              </div>

              <p className="text-gray-600 leading-8">
                PropertyHub reserves the right to suspend or terminate
                accounts that violate these Terms & Conditions, engage
                in fraudulent activities, or misuse the platform.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <FaBalanceScale className="text-2xl text-blue-600" />

                <h2 className="text-2xl font-semibold text-gray-800">
                  Limitation of Liability
                </h2>
              </div>

              <p className="text-gray-600 leading-8">
                PropertyHub acts as a platform connecting property
                owners, buyers, tenants, and PG seekers. We do not
                guarantee the accuracy of listings or the outcome of any
                transaction between users.
              </p>
            </div>

            {/* Acceptance */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <FaFileContract className="text-2xl text-blue-600" />

                <h2 className="text-2xl font-semibold text-gray-800">
                  Acceptance of Terms
                </h2>
              </div>

              <p className="text-gray-600 leading-8">
                By using PropertyHub, you acknowledge that you have
                read, understood, and agreed to these Terms &
                Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TermsConditions;