import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaBed,
  FaPlusCircle,
  FaHeart,
  FaCrown,
  FaFileInvoiceDollar,
  FaCalendarCheck,
  FaClipboardList,
} from "react-icons/fa";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function OwnerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [totalProperties, setTotalProperties] = useState(0);
  const [totalPGs, setTotalPGs] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [subscription, setSubscription] = useState(null);

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
      const [
        propertyResponse,
        pgResponse,
        subscriptionResponse,
      ] = await Promise.all([
        fetch(
          `${import.meta.env.VITE_API_URL}/api/properties/my-properties`,
          {
            credentials: "include",
          }
        ),
        fetch(
          `${import.meta.env.VITE_API_URL}/api/pgs/my-pgs`,
          {
            credentials: "include",
          }
        ),
        fetch(
          `${import.meta.env.VITE_API_URL}/api/subscriptions/current`,
          {
            credentials: "include",
          }
        ),
      ]);

      const propertyData = await propertyResponse.json();
      const pgData = await pgResponse.json();
      const subscriptionData =
        await subscriptionResponse.json();

      if (subscriptionData.success) {
        setSubscription(
          subscriptionData.subscription
        );
      }

      let properties = [];
      let pgs = [];

      if (propertyData.success)
        properties = propertyData.properties || [];

      if (pgData.success)
        pgs = pgData.pgs || [];

      setTotalProperties(properties.length);
      setTotalPGs(pgs.length);

      const propertyViews = properties.reduce(
        (total, property) =>
          total + (property.views || 0),
        0
      );

      const pgViews = pgs.reduce(
        (total, pg) =>
          total + (pg.views || 0),
        0
      );

      setTotalViews(propertyViews + pgViews);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProperty = () => {
    if (subscription?.status === "Expired") {
      navigate("/subscription", {
        state: {
          message:
            subscription.plan === "Free"
              ? "Your free trial has ended. Purchase Premium or Elite plan to continue posting."
              : "Your subscription has expired. Renew your plan to continue posting.",
        },
      });

      return;
    }

    navigate("/add-property");
  };

  const handleAddPG = () => {
    if (subscription?.status === "Expired") {
      navigate("/subscription", {
        state: {
          message:
            subscription.plan === "Free"
              ? "Your free trial has ended. Purchase Premium or Elite plan to continue posting."
              : "Your subscription has expired. Renew your plan to continue posting.",
        },
      });

      return;
    }

    navigate("/add-pg");
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} />

      {/* Sidebar */}
      <div
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`fixed top-0 left-0 h-screen bg-white shadow-xl z-50 overflow-hidden transition-all duration-300 ${
          sidebarOpen
            ? "w-64"
            : "w-14 sm:w-16"
        }`}
      >
        {/* Hamburger */}
        <div className="h-16 flex items-center justify-center border-b border-white/20">
          <FaBars className="text-xl text-blue-600" />
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2 sm:gap-3 pt-6 sm:pt-8 px-1.5 sm:px-2">

          <Link
            to="/my-properties"
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all"
          >
            <FaHome className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              My Properties
            </span>
          </Link>

          <Link
            to="/my-pgs"
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl hover:bg-purple-100 hover:text-purple-600 transition-all"
          >
            <FaBed className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              My PGs
            </span>
          </Link>

          <button
            onClick={handleAddProperty}
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl hover:bg-green-100 hover:text-green-600 transition-all w-full"
          >
            <FaPlusCircle className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              Add Property
            </span>
          </button>

          <button
            onClick={handleAddPG}
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all w-full"
          >
            <FaPlusCircle className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              Add PG
            </span>
          </button>

          <Link
            to="/wishlist"
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all"
          >
            <FaHeart className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              Wishlist
            </span>
          </Link>

          <Link
            to="/my-visit-requests"
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition-all"
          >
            <FaCalendarCheck className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              Visit Requests
            </span>
          </Link>

          <Link
            to="/my-visits"
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all"
          >
            <FaClipboardList className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              My Visits
            </span>
          </Link>

          <Link
            to="/subscription-history"
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all"
          >
            <FaFileInvoiceDollar className="min-w-[22px]" />

            <span
              className={`transition-all duration-300 whitespace-nowrap ${
                sidebarOpen
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              Subscription History
            </span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`px-4 sm:px-6 lg:px-8 py-8 sm:py-10 transition-all duration-300 ${
          sidebarOpen
            ? "ml-14 sm:ml-16 lg:ml-64"
            : "ml-14 sm:ml-16"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome, {user?.name || "Owner"}
        </h1>

        <p className="text-gray-500 mb-8 sm:mb-10 text-sm sm:text-base">
          Manage your properties and PG listings in one place.
        </p>

        {subscription && (
          <>
            {subscription.status === "Active" &&
              subscription.endDate &&
              Math.ceil(
                (new Date(subscription.endDate) -
                  new Date()) /
                  (1000 * 60 * 60 * 24)
              ) <= 7 && (
                <div className="mb-8 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <span className="text-sm sm:text-base">
                    ⚠️ Your subscription expires on{" "}
                    <strong>
                      {new Date(
                        subscription.endDate
                      ).toLocaleDateString()}
                    </strong>
                    . Please renew to avoid restrictions.
                  </span>

                  <Link
                    to="/subscription"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium whitespace-nowrap"
                  >
                    Renew Now
                  </Link>
                </div>
              )}

            {subscription.status === "Expired" && (
              <div className="mb-8 bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-sm sm:text-base">
                  {subscription.plan === "Free" ? (
                    <>
                      🚫 Your free trial has ended. Upgrade to{" "}
                      <strong>Premium</strong> or{" "}
                      <strong>Elite</strong> to continue adding
                      Properties & PGs and unlock owner contact details.
                    </>
                  ) : (
                    <>
                      🚫 Your{" "}
                      <strong>{subscription.plan}</strong>{" "}
                      subscription has expired. Renew your plan to
                      continue adding Properties & PGs and restore
                      owner contact visibility.
                    </>
                  )}
                </span>

                <Link
                  to="/subscription"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium whitespace-nowrap"
                >
                  {subscription.plan === "Free"
                    ? "Upgrade Now"
                    : "Renew Plan"}
                </Link>
              </div>
            )}
          </>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
            <h2 className="text-gray-500 text-base sm:text-lg">
              Total Properties
            </h2>

            <p className="text-4xl sm:text-5xl font-bold text-blue-600 mt-4">
              {totalProperties}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
            <h2 className="text-gray-500 text-base sm:text-lg">
              Total PGs
            </h2>

            <p className="text-4xl sm:text-5xl font-bold text-purple-600 mt-4">
              {totalPGs}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
            <h2 className="text-gray-500 text-base sm:text-lg">
              Total Views
            </h2>

            <p className="text-4xl sm:text-5xl font-bold text-green-600 mt-4">
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