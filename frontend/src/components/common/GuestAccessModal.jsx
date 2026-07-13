import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

function GuestAccessModal({ isOpen }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center">

      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">

        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <FaLock className="text-blue-600 text-2xl" />
        </div>

        <h2 className="text-2xl font-bold mb-3">
          Continue Browsing
        </h2>

        <p className="text-gray-600 mb-6">
          You've been exploring PropertyHub as a guest.
          Please login or create an account to continue browsing.
        </p>

        <div className="flex gap-4">

          <button
            onClick={() => {
            localStorage.setItem(
                "redirectAfterLogin",
                window.location.pathname
            );
            navigate("/login");
            }}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => {
            localStorage.setItem(
                "redirectAfterLogin",
                window.location.pathname
            );
            navigate("/signup");
            }}
            className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Signup
          </button>

        </div>

      </div>

    </div>
  );
}

export default GuestAccessModal;