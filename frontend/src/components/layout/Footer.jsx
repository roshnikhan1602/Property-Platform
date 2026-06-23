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
                href="#"
                className="text-gray-400 hover:text-white text-xl transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-white text-xl transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-white text-xl transition"
              >
                <FaLinkedinIn />
              </a>

            </div>
          </div>

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
                to="/contact-support"
                className="text-gray-400 hover:text-white transition"
              >
                Contact / Support
              </Link>

            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact
            </h3>

            <p className="text-gray-400">
              Bengaluru, Karnataka
            </p>

            <p className="text-gray-400 mt-2">
              support@propertyhub.com
            </p>

            <p className="text-gray-400 mt-2">
              +91 1234567890
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          © 2026 Property Platform. All
          Rights Reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;