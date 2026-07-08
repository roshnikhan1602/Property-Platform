import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              PropertyHub
            </h2>

            <p className="text-gray-400 mt-3">
              Find, buy, rent and manage
              properties across India with
              ease.
            </p>

            <div className="flex gap-4 mt-5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-all duration-300 text-xl"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 hover:scale-110 transition-all duration-300 text-xl"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 text-xl"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/properties"
                className="text-gray-400 hover:text-white transition"
              >
                Properties
              </Link>

              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition"
              >
                About Us
              </Link>

              <Link
                to="/faqs"
                className="text-gray-400 hover:text-white transition"
              >
                FAQs
              </Link>

              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-conditions"
                className="text-gray-400 hover:text-white transition"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/contact-support"
                className="text-gray-400 hover:text-white transition"
              >
                Contact / Support
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact
            </h3>

            <p className="text-gray-400">
              Bengaluru, Karnataka
            </p>

            <a
              href="mailto:support@propertyhub.com"
              className="block text-gray-400 hover:text-white transition mt-2"
            >
              support@propertyhub.com
            </a>

            <a
              href="tel:+911234567890"
              className="block text-gray-400 hover:text-white transition mt-2"
            >
              +91 1234567890
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          © 2026 PropertyHub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;