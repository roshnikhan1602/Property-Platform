import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold cursor-pointer">
            Property
            <span className="text-blue-600">Hub</span>
          </h1>
        </Link>

        {/* Navigation Links */}
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
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Post Property
          </button>

          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;