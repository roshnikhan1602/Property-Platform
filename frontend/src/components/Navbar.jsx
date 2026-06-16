import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] =
    useState(false);

  const dropdownRef = useRef(null);

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
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        Property Platform
      </h1>

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
            className="flex items-center gap-2"
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
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;