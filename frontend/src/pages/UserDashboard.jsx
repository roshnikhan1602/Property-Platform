import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaHeart,
  FaHistory,
  FaBuilding,
  FaUserCircle,
  FaCrown,
  FaCalendarCheck,
} from "react-icons/fa";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function UserDashboard() {
  const [user, setUser] = useState(null);

  /* ================================
     FETCH USER
  ================================= */

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(
          "Error fetching user:",
          error
        );
      }
    };

    fetchUser();
  }, []);

  /* ================================
     DASHBOARD CARD
  ================================= */

  const dashboardCards = [
    {
      title: "Wishlist",
      description: "Manage your saved properties",
      icon: <FaHeart className="text-red-500 text-2xl" />,
      link: "/wishlist",
    },
    {
      title: "My Visits",
      description: "Track all your booked visits",
      icon: (
        <FaCalendarCheck className="text-orange-500 text-2xl" />
      ),
      link: "/my-visits",
    },
    {
      title: "Recently Viewed",
      description: "Access recently viewed listings",
      icon: (
        <FaHistory className="text-blue-500 text-2xl" />
      ),
      link: "/recently-viewed",
    },
    {
      title: "Browse Properties",
      description: "Explore available properties",
      icon: (
        <FaBuilding className="text-green-500 text-2xl" />
      ),
      link: "/properties",
    },
    {
      title: "Subscription",
      description: "Upgrade your plan",
      icon: (
        <FaCrown className="text-yellow-500 text-2xl" />
      ),
      link: "/subscription",
      premium: true,
    },
    {
      title: "Profile",
      description: "Manage your account settings",
      icon: (
        <FaUserCircle className="text-purple-500 text-2xl" />
      ),
      link: "/owner-profile",
    },
  ];

  /* ================================
     RENDER
  ================================= */

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-10">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome back
            {user?.name
              ? `, ${user.name}`
              : ""}
          </p>

        </div>

        {/* DASHBOARD CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {dashboardCards.map((card) => (

            <Link
              key={card.title}
              to={card.link}
              className={`bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                card.premium
                  ? "border border-yellow-300 hover:border-yellow-500"
                  : "border border-gray-200 hover:border-blue-500"
              }`}
            >

              {/* ICON + VIEW */}

              <div className="flex items-center justify-between mb-6">

                {card.icon}

                <span className="text-sm text-gray-400">
                  View →
                </span>

              </div>

              {/* TITLE */}

              <h2 className="text-xl font-semibold text-gray-900">
                {card.title}
              </h2>

              {/* DESCRIPTION */}

              <p className="text-gray-500 mt-2">
                {card.description}
              </p>

            </Link>

          ))}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default UserDashboard;