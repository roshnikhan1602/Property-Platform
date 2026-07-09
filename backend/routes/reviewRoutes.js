const express = require("express");

const router = express.Router();

const {
  addReview,
  getPropertyReviews,
  updateReview,
  deleteReview,
  replyToReview,
  deleteReply,
  toggleLike,
  toggleDislike,
} = require("../controllers/reviewController");

router.post("/add", addReview);

router.get(
  "/property/:propertyId",
  getPropertyReviews
);

router.put(
  "/update/:id",
  updateReview
);

router.delete(
  "/delete/:id",
  deleteReview
);

router.put(
  "/reply/:id",
  replyToReview
);

router.put(
  "/like/:id",
  toggleLike
);

router.put(
  "/dislike/:id",
  toggleDislike
);

router.put(
  "/delete-reply/:id",
  deleteReply
);

module.exports = router;