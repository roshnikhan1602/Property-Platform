import { useNavigate } from "react-router-dom";

function SessionExpiredModal({
  isOpen,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">

        <div className="text-6xl mb-4">
          🔒
        </div>

        <h2 className="text-3xl font-bold">
          Session Expired
        </h2>

        <p className="text-gray-600 mt-4">
          For security reasons, please login
          again to continue browsing.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default SessionExpiredModal;