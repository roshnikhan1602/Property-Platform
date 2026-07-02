const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  registerUser,
  sendOTP,
  verifyOTP,
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);

router.get("/profile/:id", getProfile);

router.put(
  "/profile/:id",
  updateProfile
);

router.put(
  "/profile-image/:id",
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;