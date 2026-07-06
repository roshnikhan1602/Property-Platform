const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// Protected Routes
router.post(
  "/add",
  authMiddleware,
  addToWishlist
);

router.post(
  "/remove",
  authMiddleware,
  removeFromWishlist
);

router.delete(
  "/:wishlistId",
  authMiddleware,
  removeFromWishlist
);

router.get(
  "/",
  authMiddleware,
  getWishlist
);

module.exports = router;