import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { RiVipDiamondFill } from "react-icons/ri";
import {
  FaRegHeart,
  FaUserCircle,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import NotificationBell from "../notifications/NotificationBell";

function Navbar() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            credentials: "include",
          }
        );

        if (response.status === 401) {
          setUser(null);
          setSubscription(null);
          return;
        }

        const data = await response.json();

        if (data.success) {
          setUser(data.user);

          try {
            const subscriptionResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/subscriptions/current`,
              {
                credentials: "include",
              }
            );

            const subscriptionData =
              await subscriptionResponse.json();

            if (subscriptionData.success) {
              setSubscription(
                subscriptionData.subscription
              );
            } else {
              setSubscription(null);
            }
          } catch {
            setSubscription(null);
          }
        } else {
          setUser(null);
          setSubscription(null);
        }
      } catch (error) {
        console.error(
          "Failed to load user:",
          error
        );
        setUser(null);
        setSubscription(null);
      }
    };

    loadUser();

    window.addEventListener(
      "focus",
      loadUser
    );

    return () => {
      window.removeEventListener(
        "focus",
        loadUser
      );
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error(error);
    }

    // Clear all locally stored session data
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // OR, if your app stores only app-related data in localStorage,
    // you can simply use:
    // localStorage.clear();

    sessionStorage.clear();

    setUser(null);
    setSubscription(null);
    setShowDropdown(false);

    navigate("/");
  };

  const isTransparent =
    location.pathname === "/" && !scrolled;

  return (
    <nav
      className={`${
        isTransparent
          ? "fixed top-0 left-0 w-full bg-transparent"
          : "sticky top-0 bg-white/95 backdrop-blur-md shadow-md"
      } z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-y-3">

        {/* Logo */}
        <Link to="/">
          <h1
            className={`text-xl sm:text-2xl font-bold cursor-pointer ${
              isTransparent
                ? "text-white drop-shadow-lg"
                : "text-gray-900"
            }`}
          >
            Property
            <span className="text-blue-600">
              Hub
            </span>
          </h1>
        </Link>

        {/* Navigation */}
        <div className="order-3 md:order-none w-full md:w-auto flex items-center justify-center md:justify-start gap-4 sm:gap-6 md:gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">

          <Link
            to="/"
            className={`font-medium text-sm sm:text-base transition ${
              isTransparent
                ? "text-white hover:text-blue-300"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <Link
            to="/properties"
            className={`font-medium text-sm sm:text-base transition ${
              isTransparent
                ? "text-white hover:text-blue-300"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Properties
          </Link>

          <Link
            to="/pgs"
            className={`font-medium text-sm sm:text-base transition ${
              isTransparent
                ? "text-white hover:text-blue-300"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            PG
          </Link>

          <Link
            to="/subscription"
            className={`flex items-center gap-1 sm:gap-2 font-medium text-sm sm:text-base transition ${
              isTransparent
                ? "text-white hover:text-blue-300"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <RiVipDiamondFill className="text-blue-500 text-base sm:text-lg" />

            <span>
              {subscription?.plan === "Elite"
                ? "Elite"
                : subscription?.plan === "Premium"
                ? "Premium"
                : "Subscribe"}
            </span>
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">

          <button
            onClick={() =>
              navigate("/wishlist")
            }
            className={`text-xl sm:text-2xl hover:text-red-500 hover:scale-110 transition-all duration-300 cursor-pointer ${
              isTransparent
                ? "text-white drop-shadow-lg"
                : "text-gray-400"
            }`}
            title="Wishlist"
          >
            <FaRegHeart />
          </button>

          {user && (
            <NotificationBell
              isTransparent={
                isTransparent
              }
            />
          )}

          {user ? (
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() =>
                  setShowDropdown(
                    !showDropdown
                  )
                }
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">

                  {user.profileImage ? (
                    <img
                      src={
                        user.profileImage
                      }
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                      {user.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                </div>

                <span
                  className={`hidden sm:inline font-medium ${
                    isTransparent
                      ? "text-white drop-shadow-lg"
                      : "text-gray-700"
                  }`}
                >
                  {user.name}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">

                  <Link
                    to="/owner-profile"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                    onClick={() =>
                      setShowDropdown(false)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaUserCircle />
                      Profile
                    </div>
                  </Link>

                  {user.role ===
                  "admin" ? (
                    <Link
                      to="/admin-dashboard"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                      onClick={() =>
                        setShowDropdown(false)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <FaTachometerAlt />
                        Admin Dashboard
                      </div>
                    </Link>
                  ) : user.role ===
                    "owner" ? (
                    <Link
                      to="/owner-dashboard"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                      onClick={() =>
                        setShowDropdown(false)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <FaTachometerAlt />
                        Owner Dashboard
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/user-dashboard"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                      onClick={() =>
                        setShowDropdown(false)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <FaTachometerAlt />
                        User Dashboard
                      </div>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FaSignOutAlt />
                      Logout
                    </div>
                  </button>

                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition duration-300 ${
                isTransparent
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : "border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white"
              }`}
            >
              Login
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;