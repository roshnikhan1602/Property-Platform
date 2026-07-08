import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";

import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { mobileNumber, password } = formData;

    if (!mobileNumber.trim() || !password.trim()) {
      return showToast("Please fill all fields.", "error");
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      return showToast(
        "Enter a valid 10 digit mobile number.",
        "error"
      );
    }

    try {
      setLoading(true);

      const response = await login({
        mobileNumber,
        password,
      });

      if (response.success) {
  // Save logged-in user
  localStorage.setItem(
    "user",
    JSON.stringify(response.user)
  );

  showToast("Login successful.");

  setTimeout(() => {
    navigate("/");
  }, 1200);

      } else {
        showToast(
          response.message || "Invalid credentials.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);

      showToast(
        error.message || "Login failed.",
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
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Login to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
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

export default Login;