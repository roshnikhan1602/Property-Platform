const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  signup,
  login,
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/authController");

// Authentication
router.post("/signup", signup);
router.post("/login", login);

// Profile
router.get("/profile/:id", getProfile);

router.put("/profile/:id", updateProfile);

router.put(
  "/profile-image/:id",
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;