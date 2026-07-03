import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "../firebase";

let confirmationResult = null;

export const setupRecaptcha = async () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    await window.recaptchaVerifier.render();
  }

  return window.recaptchaVerifier;
};

export const sendOTP = async (mobileNumber) => {
  const appVerifier = await setupRecaptcha();

  confirmationResult = await signInWithPhoneNumber(
    auth,
    `+91${mobileNumber}`,
    appVerifier
  );

  return true;
};

export const verifyOTP = async (otp) => {
  if (!confirmationResult) {
    throw new Error("OTP not sent");
  }

  const result = await confirmationResult.confirm(otp);

  return result.user;
};