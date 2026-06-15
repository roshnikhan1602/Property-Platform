import { useState } from "react";

import Navbar from "./components/Navbar";
import LoginModal from "./components/auth/LoginModal";
import OTPModal from "./components/auth/OTPModal";

function App() {
  const [showLoginModal, setShowLoginModal] =
    useState(true);

  const [showOTPModal, setShowOTPModal] =
    useState(false);

  const [mobileNumber, setMobileNumber] =
    useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-5xl font-bold text-blue-600">
          Property Platform 🚀
        </h1>
      </div>

      {showLoginModal && (
        <LoginModal
          setShowLoginModal={
            setShowLoginModal
          }
          setShowOTPModal={
            setShowOTPModal
          }
          setMobileNumber={
            setMobileNumber
          }
        />
      )}

      {showOTPModal && (
        <OTPModal
          mobileNumber={mobileNumber}
          setShowOTPModal={
            setShowOTPModal
          }
        />
      )}
    </div>
  );
}

export default App;