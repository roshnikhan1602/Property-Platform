import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";

import {
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  resetPassword,
} from "../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
const [timer, setTimer] = useState(0);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
useEffect(() => {
  if (timer <= 0) return;

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);

  const sendOTP = async () => {
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      return showToast(
        "Enter a valid 10 digit mobile number.",
        "error"
      );
    }

    try {
      setLoading(true);

      const response =
        await sendForgotPasswordOTP(
          formData.mobileNumber
        );

     if (response.success) {
  showToast(response.message);
  setStep(2);
  setTimer(30);
} else {
        showToast(
          response.message,
          "error"
        );
      }
    } catch (error) {
      showToast(
        error.message,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!formData.otp.trim()) {
      return showToast(
        "Enter OTP.",
        "error"
      );
    }

    try {
      setLoading(true);

      const response =
        await verifyForgotPasswordOTP(
          formData.mobileNumber,
          formData.otp
        );

      if (response.success) {
        showToast(response.message);
        setStep(3);
      } else {
        showToast(
          response.message,
          "error"
        );
      }
    } catch (error) {
      showToast(
        error.message,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const updatePassword =
    async () => {
      if (
        !formData.password ||
        !formData.confirmPassword
      ) {
        return showToast(
          "Please fill all fields.",
          "error"
        );
      }

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        return showToast(
          "Passwords do not match.",
          "error"
        );
      }

      if (
        formData.password.length < 6
      ) {
        return showToast(
          "Password must be at least 6 characters.",
          "error"
        );
      }

      try {
        setLoading(true);

        const response =
          await resetPassword(
            formData.mobileNumber,
            formData.password
          );

        if (response.success) {
          showToast(
            "Password reset successfully."
          );

          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          showToast(
            response.message,
            "error"
          );
        }
      } catch (error) {
        showToast(
          error.message,
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
  {step === 1
    ? "Forgot Password"
    : step === 2
    ? "Verify OTP"
    : "Create New Password"}
</h2>

<p className="text-center text-gray-500 mb-8">
  {step === 1
    ? "Enter your registered mobile number"
    : step === 2
    ? "Enter the OTP sent to your mobile number"
    : "Choose a strong password for your account"}
</p>
                    {step === 1 && (
            <>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mobile Number
                </label>

                <div className="flex gap-2">
                  <div className="flex items-center px-4 border rounded-lg bg-gray-100 text-gray-700">
                    +91
                  </div>

                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={sendOTP}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Enter OTP
                </label>

<div className="mb-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
  <p className="text-sm text-green-700">
    OTP has been sent to{" "}
    <span className="font-semibold">
  +91 ******{formData.mobileNumber.slice(-4)}
</span>
  </p>
</div>

                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={verifyOTP}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
  onClick={sendOTP}
  disabled={loading || timer > 0}
  className="w-full mt-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
>
  {timer > 0
    ? `Resend OTP in ${timer}s`
    : loading
    ? "Sending..."
    : "Resend OTP"}
</button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  New Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={updatePassword}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition disabled:opacity-60"
              >
                {loading
                  ? "Updating..."
                  : "Reset Password"}
              </button>
            </>
          )}
                    <div className="text-center mt-6">
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline font-medium"
            >
              Back to Login
            </button>
          </div>

        </div>
      </div>

      <Footer />

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast((prev) => ({
              ...prev,
              show: false,
            }))
          }
        />
      )}
    </>
  );
}

export default ForgotPassword;