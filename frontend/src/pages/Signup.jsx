import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";

import {
  signup,
  sendOTP,
  verifyOTP,
} from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });


  const showToast = (message, type = "success") => {
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

  const handleSendOTP = async () => {
    const { mobileNumber } = formData;

    if (!mobileNumber.trim()) {
      return showToast("Enter mobile number.", "error");
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      return showToast("Enter a valid 10 digit mobile number.", "error");
    }

    try {
      setSendingOTP(true);

     const response = await sendOTP(mobileNumber);

if (response.success) {
  setOtpSent(true);
  showToast(response.message);
} else {
  showToast(response.message, "error");
}
    } catch (error) {
      console.error(error);
      showToast(error.message || "Failed to send OTP.", "error");
    } finally {
      setSendingOTP(false);
    }
  };

 const handleVerifyOTP = async () => {
  if (!otp.trim()) {
    return showToast("Enter OTP.", "error");
  }

  try {
    setVerifyingOTP(true);

    const response = await verifyOTP(
      formData.mobileNumber,
      otp
    );

    if (response.success) {
      setOtpVerified(true);
      showToast("Mobile number verified successfully.");
    } else {
      showToast(response.message, "error");
    }
  } catch (error) {
    console.error(error);
    showToast("Invalid OTP.", "error");
  } finally {
    setVerifyingOTP(false);
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, mobileNumber, password } = formData;

    if (!name || !mobileNumber || !password) {
      return showToast("Please fill all fields.", "error");
    }

    if (!otpVerified) {
      return showToast("Please verify your mobile number first.", "error");
    }

    try {
      setLoading(true);

      const response = await signup({
        name,
        mobileNumber,
        password,
      });

      if (response.success) {
        showToast("Signup successful.");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        showToast(response.message || "Signup failed.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Something went wrong.", "error");
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
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Sign up to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
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
                  disabled={otpVerified}
                  className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            {!otpSent && (
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={sendingOTP}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-60"
              >
                {sendingOTP ? "Sending OTP..." : "Send OTP"}
              </button>
            )}

            {otpSent && !otpVerified && (
              <>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    OTP
                  </label>

                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    maxLength={6}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={verifyingOTP}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition disabled:opacity-60"
                >
                  {verifyingOTP ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}

            {otpVerified && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm text-center">
                ✓ Mobile number verified successfully
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={!otpVerified || loading}
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>

        </div>
      </div>

      <Footer />

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              ...toast,
              show: false,
            })
          }
        />
      )}
    </>
  );
}

export default Signup;