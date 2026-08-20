import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";

import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    countryCode: "+91",
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
    // Example: (206) 342-8631
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
        formatted += " " + limited.slice(i, i + 2);
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
    const digits = getCleanMobileNumber(mobileNumber);

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
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      countryCode,
      mobileNumber,
      password,
    } = formData;

    if (
      !countryCode ||
      !mobileNumber.trim() ||
      !password.trim()
    ) {
      return showToast(
        "Please fill all fields.",
        "error"
      );
    }

    const cleanedNumber =
      getCleanMobileNumber(mobileNumber);

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

      const response = await login({
        countryCode,
        mobileNumber: cleanedNumber,
        password,
      });

      if (response.success) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );

        localStorage.removeItem(
          "guestStartTime"
        );

        const redirect =
          localStorage.getItem(
            "redirectAfterLogin"
          );

        showToast("Login successful.");

        setTimeout(() => {
          if (redirect) {
            localStorage.removeItem(
              "redirectAfterLogin"
            );

            navigate(redirect);
          } else {
            navigate("/");
          }
        }, 1200);
      } else {
        showToast(
          response.message ||
            "Invalid credentials.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);

      showToast(
        error.message ||
          "Login failed.",
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

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* MOBILE NUMBER */}
            <div>
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
                placeholder="Enter your password"
               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition disabled:opacity-60"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

            {/* SIGNUP */}
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

      {/* TOAST */}
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