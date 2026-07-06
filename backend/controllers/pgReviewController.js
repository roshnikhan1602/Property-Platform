const PGReview = require("../models/PGReview");
const PG = require("../models/PG");
const User = require("../models/User");

const updatePGRating = async (pgId) => {
  const reviews = await PGReview.find({
    pg: pgId,
  });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / totalReviews
      : 0;

  await PG.findByIdAndUpdate(pgId, {
    reviews: reviews.map(
      (review) => review._id
    ),
    averageRating: Number(
      averageRating.toFixed(1)
    ),
    totalReviews,
  });
};

const addReview = async (req, res) => {
  try {
    const { pgId, rating, comment } =
      req.body;

    const userId = req.user.id;

    if (
      !pgId ||
      !rating ||
      !comment
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    const pg = await PG.findById(pgId);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    const user = await User.findById(
      userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyReviewed =
      await PGReview.findOne({
        pg: pgId,
        user: userId,
      });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message:
          "You have already reviewed this PG",
      });
    }

    const review =
      await PGReview.create({
        pg: pg._id,
        pgTitle: pg.title,
        owner: pg.owner,
        user: user._id,
        userName: user.name,
        userProfileImage:
          user.profileImage || "",
        rating,
        comment,
      });

    await updatePGRating(pg._id);

    res.status(201).json({
      success: true,
      message:
        "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPGReviews = async (
  req,
  res
) => {
  try {
    const reviews =
      await PGReview.find({
        pg: req.params.pgId,
      })
        .populate(
          "user",
          "name profileImage"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      totalReviews:
        reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateReview = async (
  req,
  res
) => {
  try {
    const { rating, comment } =
      req.body;

    const review =
      await PGReview.findById(
        req.params.id
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (
      review.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only edit your own review",
      });
    }

    review.rating =
      rating || review.rating;

    review.comment =
      comment || review.comment;

    review.isEdited = true;

    review.editedAt =
      new Date();

    await review.save();

    await updatePGRating(
      review.pg
    );

    res.status(200).json({
      success: true,
      message:
        "Review updated successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReview = async (
  req,
  res
) => {
  try {
    const review =
      await PGReview.findById(
        req.params.id
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (
      review.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own review",
      });
    }

    const pgId = review.pg;

    await PGReview.findByIdAndDelete(
      req.params.id
    );

    await updatePGRating(pgId);

    res.status(200).json({
      success: true,
      message:
        "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const replyToReview = async (
  req,
  res
) => {
  try {
    const { ownerReply } = req.body;

    const review =
      await PGReview.findById(
        req.params.id
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const pg = await PG.findById(
      review.pg
    );

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    if (
      pg.owner.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only the PG owner can reply",
      });
    }

    if (!ownerReply?.trim()) {
  return res.status(400).json({
    success: false,
    message: "Reply is required",
  });
}

    await review.save();

    res.status(200).json({
      success: true,
      message:
        "Reply added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleLike = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const review =
      await PGReview.findById(
        req.params.id
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.dislikes =
      review.dislikes.filter(
        (id) =>
          id.toString() !== userId
      );

    const liked =
      review.likes.some(
        (id) =>
          id.toString() === userId
      );

    if (liked) {
      review.likes =
        review.likes.filter(
          (id) =>
            id.toString() !==
            userId
        );
    } else {
      review.likes.push(userId);
    }

    await review.save();

    res.status(200).json({
      success: true,
      likes:
        review.likes.length,
      dislikes:
        review.dislikes.length,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleDislike =
  async (req, res) => {
    try {
      const userId =
        req.user.id;

      const review =
        await PGReview.findById(
          req.params.id
        );

      if (!review) {
        return res.status(404).json({
          success: false,
          message:
            "Review not found",
        });
      }

      review.likes =
        review.likes.filter(
          (id) =>
            id.toString() !==
            userId
        );

      const disliked =
        review.dislikes.some(
          (id) =>
            id.toString() ===
            userId
        );

      if (disliked) {
        review.dislikes =
          review.dislikes.filter(
            (id) =>
              id.toString() !==
              userId
          );
      } else {
        review.dislikes.push(
          userId
        );
      }

      await review.save();

      res.status(200).json({
        success: true,
        likes:
          review.likes.length,
        dislikes:
          review.dislikes.length,
        review,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  addReview,
  getPGReviews,
  updateReview,
  deleteReview,
  replyToReview,
  toggleLike,
  toggleDislike,
};