const express = require("express");

const router = express.Router();

const {
  registerUser,
  sendOTP,
  verifyOTP,
  getProfile,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/profile/:id", getProfile);

module.exports = router;