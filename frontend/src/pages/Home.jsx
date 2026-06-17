import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import SearchBar from "../components/home/SearchBar";
import FeaturedProperties from "../components/home/FeaturedProperties";
import RecentlyViewed from "../components/property/RecentlyViewed";
import Footer from "../components/layout/Footer";

import LoginModal from "../components/auth/LoginModal";
import OTPModal from "../components/auth/OTPModal";

function Home() {
  const [showLoginModal, setShowLoginModal] =
    useState(false);

  const [showOTPModal, setShowOTPModal] =
    useState(false);

  const [mobileNumber, setMobileNumber] =
    useState("");

  const [userName, setUserName] =
    useState("");

  return (
    <div>
      <Navbar
        setShowLoginModal={
          setShowLoginModal
        }
      />

      <HeroSection />
      <SearchBar />
      <RecentlyViewed />
      <FeaturedProperties />
      <Footer />

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
          setUserName={setUserName}
        />
      )}

      {showOTPModal && (
        <OTPModal
          mobileNumber={mobileNumber}
          userName={userName}
          setShowOTPModal={
            setShowOTPModal
          }
        />
      )}
    </div>
  );
}

export default Home;