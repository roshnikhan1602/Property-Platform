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
    countryCode: "+91",
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

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  // ==========================================
  // HANDLE NORMAL INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // FORMAT MOBILE NUMBER
  // ==========================================

  const formatMobileNumber = (value, countryCode) => {
    const digits = value.replace(/\D/g, "");

    // INDIA
    if (countryCode === "+91") {
      return digits.slice(0, 10);
    }

    // USA / CANADA
    if (countryCode === "+1") {
      const limited = digits.slice(0, 10);

      if (limited.length <= 3) {
        return limited;
      }

      if (limited.length <= 6) {
        return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
      }

      return `(${limited.slice(0, 3)}) ${limited.slice(
        3,
        6
      )}-${limited.slice(6)}`;
    }

    // UK
    if (countryCode === "+44") {
      const limited = digits.slice(0, 10);

      if (limited.length <= 4) {
        return limited;
      }

      return `${limited.slice(0, 4)} ${limited.slice(4)}`;
    }

    // AUSTRALIA
    if (countryCode === "+61") {
      const limited = digits.slice(0, 9);

      if (limited.length <= 3) {
        return limited;
      }

      if (limited.length <= 6) {
        return `${limited.slice(0, 3)} ${limited.slice(3)}`;
      }

      return `${limited.slice(0, 3)} ${limited.slice(
        3,
        6
      )} ${limited.slice(6)}`;
    }

    // JAPAN
    if (countryCode === "+81") {
      const limited = digits.slice(0, 10);

      if (limited.length <= 2) {
        return limited;
      }

      if (limited.length <= 6) {
        return `${limited.slice(0, 2)}-${limited.slice(2)}`;
      }

      return `${limited.slice(0, 2)}-${limited.slice(
        2,
        6
      )}-${limited.slice(6)}`;
    }

    // SOUTH KOREA
    if (countryCode === "+82") {
      const limited = digits.slice(0, 10);

      if (limited.length <= 3) {
        return limited;
      }

      if (limited.length <= 6) {
        return `${limited.slice(0, 3)}-${limited.slice(3)}`;
      }

      return `${limited.slice(0, 3)}-${limited.slice(
        3,
        6
      )}-${limited.slice(6)}`;
    }

    // CHINA
    if (countryCode === "+86") {
      const limited = digits.slice(0, 11);

      if (limited.length <= 3) {
        return limited;
      }

      if (limited.length <= 7) {
        return `${limited.slice(0, 3)} ${limited.slice(3)}`;
      }

      return `${limited.slice(0, 3)} ${limited.slice(
        3,
        7
      )} ${limited.slice(7)}`;
    }

    // UAE
    if (countryCode === "+971") {
      const limited = digits.slice(0, 9);

      if (limited.length <= 2) {
        return limited;
      }

      if (limited.length <= 5) {
        return `${limited.slice(0, 2)} ${limited.slice(2)}`;
      }

      return `${limited.slice(0, 2)} ${limited.slice(
        2,
        5
      )} ${limited.slice(5)}`;
    }

    // SINGAPORE
    if (countryCode === "+65") {
      const limited = digits.slice(0, 8);

      if (limited.length <= 4) {
        return limited;
      }

      return `${limited.slice(0, 4)} ${limited.slice(4)}`;
    }

    // MALAYSIA
    if (countryCode === "+60") {
      const limited = digits.slice(0, 10);

      if (limited.length <= 3) {
        return limited;
      }

      if (limited.length <= 6) {
        return `${limited.slice(0, 3)} ${limited.slice(3)}`;
      }

      return `${limited.slice(0, 3)} ${limited.slice(
        3,
        6
      )} ${limited.slice(6)}`;
    }

    // GERMANY
    if (countryCode === "+49") {
      const limited = digits.slice(0, 11);

      if (limited.length <= 3) {
        return limited;
      }

      if (limited.length <= 7) {
        return `${limited.slice(0, 3)} ${limited.slice(3)}`;
      }

      return `${limited.slice(0, 3)} ${limited.slice(
        3,
        7
      )} ${limited.slice(7)}`;
    }

    // FRANCE
    if (countryCode === "+33") {
      const limited = digits.slice(0, 9);

      if (limited.length <= 1) {
        return limited;
      }

      let formatted = limited.slice(0, 1);

      for (let i = 1; i < limited.length; i += 2) {
        formatted +=
          " " + limited.slice(i, i + 2);
      }

      return formatted;
    }

    // ITALY
    if (countryCode === "+39") {
      const limited = digits.slice(0, 10);

      if (limited.length <= 3) {
        return limited;
      }

      if (limited.length <= 6) {
        return `${limited.slice(0, 3)} ${limited.slice(3)}`;
      }

      return `${limited.slice(0, 3)} ${limited.slice(
        3,
        6
      )} ${limited.slice(6)}`;
    }

    // RUSSIA
    if (countryCode === "+7") {
      const limited = digits.slice(0, 10);

      if (limited.length <= 3) {
        return limited;
      }

      if (limited.length <= 6) {
        return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
      }

      return `(${limited.slice(0, 3)}) ${limited.slice(
        3,
        6
      )}-${limited.slice(6)}`;
    }

    // BRAZIL
    if (countryCode === "+55") {
      const limited = digits.slice(0, 11);

      if (limited.length <= 2) {
        return limited;
      }

      if (limited.length <= 7) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
      }

      return `(${limited.slice(0, 2)}) ${limited.slice(
        2,
        7
      )}-${limited.slice(7)}`;
    }

    // SOUTH AFRICA
    if (countryCode === "+27") {
      const limited = digits.slice(0, 9);

      if (limited.length <= 2) {
        return limited;
      }

      if (limited.length <= 5) {
        return `${limited.slice(0, 2)} ${limited.slice(2)}`;
      }

      return `${limited.slice(0, 2)} ${limited.slice(
        2,
        5
      )} ${limited.slice(5)}`;
    }

    // OTHER COUNTRIES
    return digits.slice(0, 15);
  };

  // ==========================================
  // GET ONLY DIGITS
  // ==========================================

  const getCleanMobileNumber = (value) => {
    return value.replace(/\D/g, "");
  };

  // ==========================================
  // COUNTRY CHANGE
  // ==========================================

  const handleCountryChange = (e) => {
    setFormData({
      ...formData,
      countryCode: e.target.value,
      mobileNumber: "",
    });
  };

  // ==========================================
  // MOBILE NUMBER CHANGE
  // ==========================================

  const handleMobileChange = (e) => {
    const formattedNumber = formatMobileNumber(
      e.target.value,
      formData.countryCode
    );

    setFormData({
      ...formData,
      mobileNumber: formattedNumber,
    });
  };

  // ==========================================
  // VALIDATE MOBILE NUMBER
  // ==========================================

  const validateMobileNumber = (
    countryCode,
    mobileNumber
  ) => {
    const digits = getCleanMobileNumber(
      mobileNumber
    );

    // INDIA
    if (countryCode === "+91") {
      return /^[6-9]\d{9}$/.test(digits);
    }

    // USA / CANADA
    if (countryCode === "+1") {
      return /^\d{10}$/.test(digits);
    }

    // UK
    if (countryCode === "+44") {
      return /^\d{10}$/.test(digits);
    }

    // AUSTRALIA
    if (countryCode === "+61") {
      return /^\d{9}$/.test(digits);
    }

    // JAPAN
    if (countryCode === "+81") {
      return /^\d{10}$/.test(digits);
    }

    // SOUTH KOREA
    if (countryCode === "+82") {
      return /^\d{9,10}$/.test(digits);
    }

    // CHINA
    if (countryCode === "+86") {
      return /^\d{11}$/.test(digits);
    }

    // UAE
    if (countryCode === "+971") {
      return /^\d{9}$/.test(digits);
    }

    // SINGAPORE
    if (countryCode === "+65") {
      return /^\d{8}$/.test(digits);
    }

    // MALAYSIA
    if (countryCode === "+60") {
      return /^\d{9,10}$/.test(digits);
    }

    // GERMANY
    if (countryCode === "+49") {
      return /^\d{10,11}$/.test(digits);
    }

    // FRANCE
    if (countryCode === "+33") {
      return /^\d{9}$/.test(digits);
    }

    // ITALY
    if (countryCode === "+39") {
      return /^\d{9,10}$/.test(digits);
    }

    // RUSSIA
    if (countryCode === "+7") {
      return /^\d{10}$/.test(digits);
    }

    // BRAZIL
    if (countryCode === "+55") {
      return /^\d{10,11}$/.test(digits);
    }

    // SOUTH AFRICA
    if (countryCode === "+27") {
      return /^\d{9}$/.test(digits);
    }

    // OTHER COUNTRIES
    return /^\d{6,15}$/.test(digits);
  };

  // ==========================================
  // TIMER
  // ==========================================

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ==========================================
  // SEND OTP
  // ==========================================

  const sendOTP = async () => {
    const {
      countryCode,
      mobileNumber,
    } = formData;

    if (!mobileNumber.trim()) {
      return showToast(
        "Enter mobile number.",
        "error"
      );
    }

    if (
      !validateMobileNumber(
        countryCode,
        mobileNumber
      )
    ) {
      return showToast(
        "Enter a valid mobile number.",
        "error"
      );
    }

    try {
      setLoading(true);

      const cleanedNumber =
        getCleanMobileNumber(
          mobileNumber
        );

      const response =
        await sendForgotPasswordOTP(
          countryCode,
          cleanedNumber
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
      console.error(error);

      showToast(
        error.message ||
          "Failed to send OTP.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VERIFY OTP
  // ==========================================

  const verifyOTP = async () => {
    if (!formData.otp.trim()) {
      return showToast(
        "Enter OTP.",
        "error"
      );
    }

    if (!/^\d{6}$/.test(formData.otp)) {
      return showToast(
        "Enter a valid 6-digit OTP.",
        "error"
      );
    }

    try {
      setLoading(true);

      const cleanedNumber =
        getCleanMobileNumber(
          formData.mobileNumber
        );

      const response =
        await verifyForgotPasswordOTP(
          formData.countryCode,
          cleanedNumber,
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
      console.error(error);

      showToast(
        error.message ||
          "Invalid OTP.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESET PASSWORD
  // ==========================================

  const updatePassword = async () => {
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

    if (formData.password.length < 6) {
      return showToast(
        "Password must be at least 6 characters.",
        "error"
      );
    }

    try {
      setLoading(true);

      const cleanedNumber =
        getCleanMobileNumber(
          formData.mobileNumber
        );

      const response =
        await resetPassword(
          formData.countryCode,
          cleanedNumber,
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
      console.error(error);

      showToast(
        error.message ||
          "Failed to reset password.",
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

          {/* ==========================================
              TITLE
          ========================================== */}

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

          {/* ==========================================
              STEP 1 - MOBILE NUMBER
          ========================================== */}

          {step === 1 && (
            <>
              <div className="mb-5">

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mobile Number
                </label>

                <div className="flex gap-2">

                  {/* COUNTRY CODE */}

                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleCountryChange}
                    className="w-28 border border-gray-300 rounded-lg px-3 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="+91">
                      🇮🇳 +91
                    </option>

                    <option value="+1">
                      🇺🇸 +1
                    </option>

                    <option value="+44">
                      🇬🇧 +44
                    </option>

                    <option value="+61">
                      🇦🇺 +61
                    </option>

                    <option value="+81">
                      🇯🇵 +81
                    </option>

                    <option value="+82">
                      🇰🇷 +82
                    </option>

                    <option value="+86">
                      🇨🇳 +86
                    </option>

                    <option value="+971">
                      🇦🇪 +971
                    </option>

                    <option value="+65">
                      🇸🇬 +65
                    </option>

                    <option value="+60">
                      🇲🇾 +60
                    </option>

                    <option value="+49">
                      🇩🇪 +49
                    </option>

                    <option value="+33">
                      🇫🇷 +33
                    </option>

                    <option value="+39">
                      🇮🇹 +39
                    </option>

                    <option value="+7">
                      🇷🇺 +7
                    </option>

                    <option value="+55">
                      🇧🇷 +55
                    </option>

                    <option value="+27">
                      🇿🇦 +27
                    </option>
                  </select>

                  {/* MOBILE NUMBER */}

                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleMobileChange}
                    placeholder={
                      formData.countryCode === "+1"
                        ? "(206) 342-8631"
                        : formData.countryCode === "+91"
                        ? "9876543210"
                        : "Enter mobile number"
                    }
                    inputMode="numeric"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>
              </div>

              <button
                onClick={sendOTP}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-60"
              >
                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}
              </button>
            </>
          )}

          {/* ==========================================
              STEP 2 - OTP
          ========================================== */}

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
                      {formData.countryCode} ******{formData.mobileNumber.slice(-4)}
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
                  inputMode="numeric"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <button
                onClick={verifyOTP}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition disabled:opacity-60"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

              <button
                onClick={sendOTP}
                disabled={
                  loading || timer > 0
                }
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

          {/* ==========================================
              STEP 3 - NEW PASSWORD
          ========================================== */}

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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* ==========================================
              BACK TO LOGIN
          ========================================== */}

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

      {/* ==========================================
          TOAST
      ========================================== */}

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