import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";

import {
  signup,
  sendOTP,
  verifyOTP,
} from "../services/authService";

const countries = [
  {
    code: "IN",
    dialCode: "+91",
    name: "India",
    flag: "🇮🇳",
  },
  {
    code: "US",
    dialCode: "+1",
    name: "USA",
    flag: "🇺🇸",
  },
  {
    code: "GB",
    dialCode: "+44",
    name: "UK",
    flag: "🇬🇧",
  },
  {
    code: "AU",
    dialCode: "+61",
    name: "Australia",
    flag: "🇦🇺",
  },
  {
    code: "JP",
    dialCode: "+81",
    name: "Japan",
    flag: "🇯🇵",
  },
  {
    code: "KR",
    dialCode: "+82",
    name: "South Korea",
    flag: "🇰🇷",
  },
  {
    code: "CN",
    dialCode: "+86",
    name: "China",
    flag: "🇨🇳",
  },
  {
    code: "AE",
    dialCode: "+971",
    name: "UAE",
    flag: "🇦🇪",
  },
  {
    code: "SA",
    dialCode: "+966",
    name: "Saudi Arabia",
    flag: "🇸🇦",
  },
  {
    code: "SG",
    dialCode: "+65",
    name: "Singapore",
    flag: "🇸🇬",
  },
  {
    code: "MY",
    dialCode: "+60",
    name: "Malaysia",
    flag: "🇲🇾",
  },
  {
    code: "DE",
    dialCode: "+49",
    name: "Germany",
    flag: "🇩🇪",
  },
  {
    code: "FR",
    dialCode: "+33",
    name: "France",
    flag: "🇫🇷",
  },
  {
    code: "IT",
    dialCode: "+39",
    name: "Italy",
    flag: "🇮🇹",
  },
  {
    code: "RU",
    dialCode: "+7",
    name: "Russia",
    flag: "🇷🇺",
  },
  {
    code: "ZA",
    dialCode: "+27",
    name: "South Africa",
    flag: "🇿🇦",
  },
  {
    code: "CA",
    dialCode: "+1",
    name: "Canada",
    flag: "🇨🇦",
  },
  {
    code: "BR",
    dialCode: "+55",
    name: "Brazil",
    flag: "🇧🇷",
  },
];

function Signup() {
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] =
    useState(countries[0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
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

  const handleCountryChange = (e) => {
    const country = countries.find(
      (item) => item.code === e.target.value
    );

    if (!country) return;

    setSelectedCountry(country);

    setFormData({
      ...formData,
      countryCode: country.dialCode,
      mobileNumber: "",
    });

    setOtpSent(false);
    setOtpVerified(false);
    setOtp("");
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;

    const formatter = new AsYouType(
      selectedCountry.code
    );

    const formattedNumber = formatter.input(value);

    setFormData({
      ...formData,
      mobileNumber: formattedNumber,
    });

    if (otpSent || otpVerified) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
    }
  };

  const getCleanMobileNumber = () => {
    return formData.mobileNumber.replace(/\D/g, "");
  };

  const handleSendOTP = async () => {
    const {
      email,
      countryCode,
      mobileNumber,
    } = formData;

    const cleanNumber =
      mobileNumber.replace(/\D/g, "");

    if (!email.trim()) {
      return showToast(
        "Enter your email address.",
        "error"
      );
    }

    if (!cleanNumber) {
      return showToast(
        "Enter mobile number.",
        "error"
      );
    }

    const fullNumber =
      `${countryCode}${cleanNumber}`;

    if (
      !isValidPhoneNumber(
        fullNumber,
        selectedCountry.code
      )
    ) {
      return showToast(
        `Enter a valid ${selectedCountry.name} mobile number.`,
        "error"
      );
    }

    try {
      setSendingOTP(true);

      const response = await sendOTP(
        countryCode,
        cleanNumber,
        email.trim()
      );

      if (response.success) {
        setOtpSent(true);

        showToast(response.message);
      } else {
        showToast(
          response.message,
          "error"
        );
      }
    } catch (error) {
      console.error(error);

      showToast(
        error.message ||
          "Failed to send OTP.",
        "error"
      );
    } finally {
      setSendingOTP(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      return showToast(
        "Enter OTP.",
        "error"
      );
    }

    try {
      setVerifyingOTP(true);

      const cleanNumber =
        formData.mobileNumber.replace(
          /\D/g,
          ""
        );

      const response = await verifyOTP(
        formData.countryCode,
        cleanNumber,
        otp
      );

      if (response.success) {
        setOtpVerified(true);

        showToast(
          "Mobile number verified successfully."
        );
      } else {
        showToast(
          response.message,
          "error"
        );
      }
    } catch (error) {
      console.error(error);

      showToast(
        "Invalid OTP.",
        "error"
      );
    } finally {
      setVerifyingOTP(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      countryCode,
      mobileNumber,
      password,
    } = formData;

    const cleanNumber =
      mobileNumber.replace(/\D/g, "");

    if (
      !name.trim() ||
      !email.trim() ||
      !countryCode ||
      !cleanNumber ||
      !password.trim()
    ) {
      return showToast(
        "Please fill all fields.",
        "error"
      );
    }

    if (
      !isValidPhoneNumber(
        `${countryCode}${cleanNumber}`,
        selectedCountry.code
      )
    ) {
      return showToast(
        `Enter a valid ${selectedCountry.name} mobile number.`,
        "error"
      );
    }

    if (!otpVerified) {
      return showToast(
        "Please verify your mobile number first.",
        "error"
      );
    }

    try {
      setLoading(true);

      const response = await signup({
        name,
        email,
        countryCode,
        mobileNumber: cleanNumber,
        password,
      });

      if (response.success) {
        showToast(
          "Signup successful."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        showToast(
          response.message ||
            "Signup failed.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);

      showToast(
        "Something went wrong.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* RESPONSIVE SIGNUP CONTAINER */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12">

        {/* SIGNUP CARD */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-center text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
            Sign up to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}
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
                className="w-full min-w-0 border border-gray-300 rounded-lg px-3 sm:px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full min-w-0 border border-gray-300 rounded-lg px-3 sm:px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* MOBILE NUMBER */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              {/* Mobile layout remains side-by-side but
                  scales properly on small screens */}
              <div className="flex gap-2 w-full min-w-0">

                {/* COUNTRY */}
                <select
                  value={selectedCountry.code}
                  onChange={handleCountryChange}
                  disabled={otpVerified}
                  className="w-[92px] sm:w-32 flex-shrink-0 border border-gray-300 rounded-lg px-2 sm:px-3 py-3 bg-white text-gray-700 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  {countries.map(
                    (country) => (
                      <option
                        key={country.code}
                        value={country.code}
                      >
                        {country.flag}{" "}
                        {country.dialCode}
                      </option>
                    )
                  )}
                </select>

                {/* MOBILE INPUT */}
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleMobileChange}
                  placeholder={
                    selectedCountry.code ===
                    "US"
                      ? "(206) 342-8631"
                      : selectedCountry.code ===
                        "IN"
                      ? "9876543210"
                      : "Enter mobile number"
                  }
                  disabled={otpVerified}
                  inputMode="tel"
                  className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 sm:px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />

              </div>
            </div>

            {/* SEND OTP */}
            {!otpSent && (
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={sendingOTP}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-60 text-sm sm:text-base"
              >
                {sendingOTP
                  ? "Sending OTP..."
                  : "Send OTP"}
              </button>
            )}

            {/* OTP */}
            {otpSent &&
              !otpVerified && (
                <>
                  <div>

                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      OTP
                    </label>

                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        const value =
                          e.target.value.replace(
                            /\D/g,
                            ""
                          );

                        setOtp(value);
                      }}
                      placeholder="Enter OTP"
                      maxLength={6}
                      inputMode="numeric"
                      className="w-full min-w-0 border border-gray-300 rounded-lg px-3 sm:px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={verifyingOTP}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition disabled:opacity-60 text-sm sm:text-base"
                  >
                    {verifyingOTP
                      ? "Verifying..."
                      : "Verify OTP"}
                  </button>
                </>
              )}

            {/* VERIFIED */}
            {otpVerified && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm text-center">
                ✓ Mobile number verified successfully
              </div>
            )}

            {/* PASSWORD */}
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
                className="w-full min-w-0 border border-gray-300 rounded-lg px-3 sm:px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* SIGN UP */}
            <button
              type="submit"
              disabled={!otpVerified || loading}
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition disabled:opacity-60 text-sm sm:text-base"
            >
              {loading
                ? "Creating Account..."
                : "Sign Up"}
            </button>

            {/* LOGIN */}
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

      {/* TOAST */}
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