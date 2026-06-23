import { useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function Toast({
  message,
  type = "success",
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-[9999] animate-fade-in">

      <div
        className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white min-w-[320px]
        ${
          type === "success"
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      >

        {type === "success" ? (
          <FaCheckCircle size={20} />
        ) : (
          <FaTimesCircle size={20} />
        )}

        <p className="font-medium">
          {message}
        </p>

      </div>

    </div>
  );
}

export default Toast;