const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

router.post("/add", addToWishlist);

router.post("/remove", removeFromWishlist);

// New DELETE route
router.delete("/:wishlistId", removeFromWishlist);

router.get("/:userId", getWishlist);

module.exports = router;