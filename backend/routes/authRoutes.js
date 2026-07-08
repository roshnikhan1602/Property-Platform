const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
  sendOTPController,
  verifyOTPController,
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  resetPassword,
  signup,
  login,
  logout,
  getMe,
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/authController");

// Authentication
router.post("/send-otp", sendOTPController);
router.post("/verify-otp", verifyOTPController);

// Forgot Password
router.post(
  "/forgot-password/send-otp",
  sendForgotPasswordOTP
);

router.post(
  "/forgot-password/verify-otp",
  verifyForgotPasswordOTP
);

router.post(
  "/forgot-password/reset",
  resetPassword
);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get(
  "/me",
  authMiddleware,
  getMe
);

// Profile
router.get(
  "/profile/:id",
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/profile-image",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;