import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaHistory,
  FaBuilding,
  FaUserCircle,
} from "react-icons/fa";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link
            to="/wishlist"
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-500 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <FaHeart className="text-red-500 text-2xl" />

              <span className="text-sm text-gray-400">
                View →
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Wishlist
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your saved properties
            </p>
          </Link>

          <Link
            to="/"
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-500 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <FaHistory className="text-blue-500 text-2xl" />

              <span className="text-sm text-gray-400">
                View →
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Recently Viewed
            </h2>

            <p className="text-gray-500 mt-2">
              Access recently viewed listings
            </p>
          </Link>

          <Link
            to="/properties"
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-500 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <FaBuilding className="text-green-500 text-2xl" />

              <span className="text-sm text-gray-400">
                View →
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Browse Properties
            </h2>

            <p className="text-gray-500 mt-2">
              Explore available properties
            </p>
          </Link>

          <Link
            to="/subscription"
            className="bg-white border border-yellow-300 rounded-2xl p-6 hover:shadow-xl hover:border-yellow-500 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <FaCrown className="text-yellow-500 text-2xl" />

              <span className="text-sm text-gray-400">
                View →
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Subscription
            </h2>

            <p className="text-gray-500 mt-2">
              Upgrade your plan
            </p>
          </Link>

          <Link
            to="/owner-profile"
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-500 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <FaUserCircle className="text-purple-500 text-2xl" />

              <span className="text-sm text-gray-400">
                View →
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Profile
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your account settings
            </p>
          </Link>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default UserDashboard;