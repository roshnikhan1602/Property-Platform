import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

function Navbar({ setShowLoginModal = () => {} }) {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] =
    useState(false);
  const [scrolled, setScrolled] =
    useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser =
      localStorage.getItem("user");

    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const isTransparent =
    location.pathname === "/" &&
    !scrolled;

  return (
    <nav
      className={`${
        isTransparent
          ? "fixed top-0 left-0 w-full bg-transparent"
          : "sticky top-0 bg-white shadow-md"
      } z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/">
          <h1
            className={`text-2xl font-bold cursor-pointer ${
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

        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className={`font-medium transition ${
              isTransparent
                ? "text-white hover:text-blue-300"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <Link
            to="/properties"
            className={`font-medium transition ${
              isTransparent
                ? "text-white hover:text-blue-300"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Properties
          </Link>

          {user && (
            <Link
              to="/my-properties"
              className={`font-medium transition ${
                isTransparent
                  ? "text-white hover:text-blue-300"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              My Properties
            </Link>
          )}

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
                <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {user.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <span
                  className={`font-medium ${
                    isTransparent
                      ? "text-white drop-shadow-lg"
                      : "text-gray-700"
                  }`}
                >
                  {user.name}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() =>
                setShowLoginModal(true)
              }
              className={`px-4 py-2 rounded-lg font-medium transition duration-300 cursor-pointer ${
                isTransparent
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : "border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white"
              }`}
            >
              Login
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;