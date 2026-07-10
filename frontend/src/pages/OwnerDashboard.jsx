import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaBed,
  FaPlusCircle,
  FaHeart,
  FaCrown,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function OwnerDashboard() {
  const [user, setUser] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [totalProperties, setTotalProperties] = useState(0);
  const [totalPGs, setTotalPGs] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
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
        fetchDashboardData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchUser();
}, []);

 const fetchDashboardData = async () => {
    try {
      const [propertyResponse, pgResponse] = await Promise.all([
  fetch(
    "http://localhost:5000/api/properties/my-properties",
    {
      credentials: "include",
    }
  ),
  fetch(
    "http://localhost:5000/api/pgs/my-pgs",
    {
      credentials: "include",
    }
  ),
]);
      const propertyData = await propertyResponse.json();
      const pgData = await pgResponse.json();

      let properties = [];
      let pgs = [];

      if (propertyData.success) properties = propertyData.properties || [];
      if (pgData.success) pgs = pgData.pgs || [];

      setTotalProperties(properties.length);
      setTotalPGs(pgs.length);

      const propertyViews = properties.reduce(
        (total, property) => total + (property.views || 0),
        0
      );

      const pgViews = pgs.reduce(
        (total, pg) => total + (pg.views || 0),
        0
      );

      setTotalViews(propertyViews + pgViews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} />

      {/* Sidebar */}
      <div
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`fixed top-0 left-0 h-screen bg-white shadow-xl z-50 overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Hamburger */}
        <div className="h-16 flex items-center justify-center border-b">
          <FaBars className="text-xl text-blue-600" />
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-3 pt-8 px-2">

          <Link
            to="/my-properties"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all"
          >
            <FaHome className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              My Properties
            </span>
          </Link>

          <Link
            to="/my-pgs"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-purple-100 hover:text-purple-600 transition-all"
          >
            <FaBed className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              My PGs
            </span>
          </Link>

          <Link
            to="/add-property"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-100 hover:text-green-600 transition-all"
          >
            <FaPlusCircle className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Add Property
            </span>
          </Link>

          <Link
            to="/add-pg"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all"
          >
            <FaPlusCircle className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Add PG
            </span>
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all"
          >
            <FaHeart className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Wishlist
            </span>
          </Link>

<Link
  to="/subscription-history"
  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all"
>
  <FaFileInvoiceDollar className="min-w-[22px]" />

  <span
    className={`transition-all duration-300 whitespace-nowrap ${
      sidebarOpen ? "opacity-100" : "opacity-0"
    }`}
  >
    Subscription History
  </span>
</Link>

        </div>
      </div>

      {/* Main Content */}
      <div
        className={`px-8 py-10 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.name || "Owner"}
        </h1>

        <p className="text-gray-500 mb-10">
          Manage your properties and PG listings in one place.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <h2 className="text-gray-500 text-lg">
              Total Properties
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-4">
              {totalProperties}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <h2 className="text-gray-500 text-lg">
              Total PGs
            </h2>

            <p className="text-5xl font-bold text-purple-600 mt-4">
              {totalPGs}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <h2 className="text-gray-500 text-lg">
              Total Views
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-4">
              {totalViews}
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default OwnerDashboard;