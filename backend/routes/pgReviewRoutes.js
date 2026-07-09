const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addReview,
  getPGReviews,
  updateReview,
  deleteReview,
  replyToReview,
  deleteReply,
  toggleLike,
  toggleDislike,
} = require("../controllers/pgReviewController");

router.get("/:pgId", getPGReviews);

router.post(
  "/",
  authMiddleware,
  addReview
);

router.put(
  "/:id",
  authMiddleware,
  updateReview
);

router.delete(
  "/:id",
  authMiddleware,
  deleteReview
);

router.put(
  "/reply/:id",
  authMiddleware,
  replyToReview
);

router.delete(
  "/reply/:id",
  authMiddleware,
  deleteReply
);

router.put(
  "/like/:id",
  authMiddleware,
  toggleLike
);

router.put(
  "/dislike/:id",
  authMiddleware,
  toggleDislike
);

module.exports = router;