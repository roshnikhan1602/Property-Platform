import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

function Navbar({ setShowLoginModal = () => {} }) {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] =
    useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/">
          <h1 className="text-2xl font-bold cursor-pointer">
            Property
            <span className="text-blue-600">
              Hub
            </span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="font-medium hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/properties"
            className="font-medium hover:text-blue-600 transition"
          >
            Properties
          </Link>

          {user && (
            <Link
              to="/my-properties"
              className="font-medium hover:text-blue-600 transition"
            >
              My Properties
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">

          <Link
            to="/add-property"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-700 hover:text-white transition duration-300"
          >
            Post Property
          </Link>

          <button
            onClick={() => navigate("/wishlist")}
            className="text-2xl text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-300 cursor-pointer"
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

                <span className="font-medium text-gray-700">
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
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-700 hover:text-white transition duration-300 cursor-pointer"
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