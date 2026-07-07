import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaRegHeart,
  FaUserCircle,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import NotificationBell from "../notifications/NotificationBell";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

 useEffect(() => {
  const loadUser = async () => {
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
    } else {
      setUser(null);
    }
  } catch (error) {
  console.error(error);
  setUser(null);
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
        !dropdownRef.current.contains(event.target)
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
      "http://localhost:5000/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );
  } catch (error) {
    console.error(error);
  }

  setUser(null);
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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/">
          <h1
            className={`text-2xl font-bold cursor-pointer ${isTransparent
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

        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className={`font-medium transition ${isTransparent
                ? "text-white hover:text-blue-300"
                : "text-gray-700 hover:text-blue-600"
              }`}
          >
            Home
          </Link>

          <Link
            to="/properties"
            className={`font-medium transition ${isTransparent
                ? "text-white hover:text-blue-300"
                : "text-gray-700 hover:text-blue-600"
              }`}
          >
            Properties
          </Link>

          <Link
            to="/pgs"
            className={`font-medium transition ${isTransparent
                ? "text-white hover:text-blue-300"
                : "text-gray-700 hover:text-blue-600"
              }`}
          >
            PG
          </Link>

        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              navigate("/wishlist")
            }
            className={`text-2xl hover:text-red-500 hover:scale-110 transition-all duration-300 cursor-pointer ${
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
              isTransparent={isTransparent}
            />
          )}
          {user ? (
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() =>
                  setShowDropdown(!showDropdown)
                }
                className="flex items-center gap-2 cursor-pointer"
              >
               <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
  {user.profileImage ? (
    <img
      src={user.profileImage}
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
                  className={`font-medium ${isTransparent
                      ? "text-white drop-shadow-lg"
                      : "text-gray-700"
                    }`}
                >
                  {user.name}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">

                  <Link
                    to="/owner-profile"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
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
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="flex items-center gap-2">
                        <FaTachometerAlt />
                        Admin Dashboard
                      </div>
                    </Link>
                  ) : user.role === "owner" ? (
                    <Link
                      to="/owner-dashboard"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
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
                      onClick={() => setShowDropdown(false)}
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
  className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
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