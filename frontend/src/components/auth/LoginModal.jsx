import { useState } from "react";
import { registerUser, sendOTP } from "../../services/authService";

function LoginModal({
  setShowLoginModal,
  setShowOTPModal,
  setMobileNumber,
  setUserName,
}) {
  const [name, setName] = useState("");
  const [mobileNumberInput, setMobileNumberInput] =
    useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(name.trim())) {
      newErrors.name =
        "Name should contain only letters";
    }

    if (
      !/^[0-9]{10}$/.test(mobileNumberInput)
    ) {
      newErrors.mobileNumber =
        "Enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const userData = {
        name,
        mobileNumber: mobileNumberInput,
      };

      if (email.trim()) {
        userData.email = email;
      }

      const registerResponse =
        await registerUser(userData);

      console.log(
        "Register Response:",
        registerResponse
      );

      const otpResponse = await sendOTP(
        mobileNumberInput
      );

      console.log(
        "OTP Response:",
        otpResponse
      );

      if (otpResponse.success) {
        setUserName(name);

        setMobileNumber(
          mobileNumberInput
        );

        setShowLoginModal(false);

        setShowOTPModal(true);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

        <h2 className="text-3xl font-bold text-center">
          Property
          <span className="text-blue-600">
            Hub
          </span>
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Login or create your account to continue
        </p>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobileNumberInput}
            onChange={(e) =>
              setMobileNumberInput(
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            maxLength={10}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mobileNumber}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="email"
            placeholder="Enter Email (Optional)"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
        >
          Continue
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          By continuing, you agree to our
          Terms & Conditions.
        </p>

      </div>
    </div>
  );
}

export default LoginModal;