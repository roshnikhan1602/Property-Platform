import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import GuestAccessModal from "./GuestAccessModal";

function GuestSessionManager() {
  const [showModal, setShowModal] =
    useState(false);

  const location = useLocation();

  useEffect(() => {
    // Don't show modal on auth pages
    if (
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/forgot-password"
    ) {
      setShowModal(false);
      return;
    }

    // Check whether user is logged in
    const user =
      localStorage.getItem("user");

    // Logged in users don't need the timer
    if (user) {
      setShowModal(false);
      return;
    }

    // Prevent restarting timer on every refresh
    let guestStart =
      localStorage.getItem(
        "guestStartTime"
      );

    if (!guestStart) {
      guestStart = Date.now();

      localStorage.setItem(
        "guestStartTime",
        guestStart
      );
    }

    // ---------- TEST ----------
    const LIMIT = 10 * 1000;

    // ---------- PRODUCTION ----------
    // const LIMIT = 15 * 60 * 1000;

    const elapsed =
      Date.now() -
      Number(guestStart);

    if (elapsed >= LIMIT) {
      setShowModal(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowModal(true);
    }, LIMIT - elapsed);

    return () =>
      clearTimeout(timer);
  }, [location.pathname]);

  return (
    <GuestAccessModal
      isOpen={showModal}
    />
  );
}

export default GuestSessionManager;