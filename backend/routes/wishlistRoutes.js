const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  getInterestedUsers,
} = require("../controllers/wishlistController");

// Add to Wishlist
router.post(
  "/add",
  authMiddleware,
  addToWishlist
);

// Remove from Wishlist (POST)
router.post(
  "/remove",
  authMiddleware,
  removeFromWishlist
);

// Remove from Wishlist (DELETE)
router.delete(
  "/:wishlistId",
  authMiddleware,
  removeFromWishlist
);

// Get Logged-in User Wishlist
router.get(
  "/",
  authMiddleware,
  getWishlist
);

// Get Interested Users for a Property
router.get(
  "/property/:propertyId/interested-users",
  authMiddleware,
  getInterestedUsers
);

module.exports = router;