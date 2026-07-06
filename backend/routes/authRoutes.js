const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
  sendOTPController,
  verifyOTPController,
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
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", authMiddleware, getMe);

// Profile
router.get("/profile/:id", getProfile);

router.put("/profile/:id", updateProfile);

router.put(
  "/profile-image/:id",
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;