import { useState } from "react";
import { verifyOTP } from "../../services/authService";
import Toast from "../common/Toast";

function OTPModal({
  mobileNumber,
  userName,
  setShowOTPModal,
}) {
  const [otp, setOtp] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleVerify = async () => {
    if (!/^[0-9]{6}$/.test(otp)) {
      setToast({
        show: true,
        message: "Enter a valid 6-digit OTP",
        type: "error",
      });
      return;
    }

    try {
      const response = await verifyOTP(
        mobileNumber,
        otp
      );

      console.log(
        "Verify OTP Response:",
        response
      );

      if (response.success) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );

        setToast({
          show: true,
          message: "Login Successful",
          type: "success",
        });

        setTimeout(() => {
          setShowOTPModal(false);
          window.location.reload();
        }, 1000);
      } else {
        setToast({
          show: true,
          message:
            response.message ||
            "Invalid OTP",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              show: false,
              message: "",
              type: "success",
            })
          }
        />
      )}

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

        <h2 className="text-3xl font-bold text-center">
          Property
          <span className="text-blue-600">
            Hub
          </span>
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Enter the OTP sent to {mobileNumber}
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value.replace(/\D/g, "")
            )
          }
          maxLength={6}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
        >
          Verify OTP
        </button>

      </div>

    </div>
  );
}

export default OTPModal;