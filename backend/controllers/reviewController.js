const Review = require("../models/Review");
const Property = require("../models/Property");

const updatePropertyRating = async (propertyId) => {
  const reviews = await Review.find({
    property: propertyId,
  });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / totalReviews
      : 0;

  await Property.findByIdAndUpdate(propertyId, {
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
    const {
      propertyId,
      userId,
      userName,
      userProfileImage,
      rating,
      comment,
    } = req.body;

    if (
      !propertyId ||
      !userId ||
      !userName ||
      !rating ||
      !comment
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const property =
      await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const alreadyReviewed =
      await Review.findOne({
        property: propertyId,
        user: userId,
      });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message:
          "You have already reviewed this property",
      });
    }

    const review = await Review.create({
      property: property._id,
      propertyTitle: property.title,
      owner: property.owner,
      user: userId,
      userName,
      userProfileImage:
        userProfileImage || "",
      rating,
      comment,
    });

    await updatePropertyRating(
      property._id
    );

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

const getPropertyReviews = async (
  req,
  res
) => {
  try {
    const reviews = await Review.find({
      property: req.params.propertyId,
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
      totalReviews: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.rating =
      rating || review.rating;
    review.comment =
      comment || review.comment;
    review.isEdited = true;
    review.editedAt = new Date();

    await review.save();

    await updatePropertyRating(
      review.property
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
    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const propertyId =
      review.property;

    await Review.findByIdAndDelete(
      req.params.id
    );

    await updatePropertyRating(
      propertyId
    );

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

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.ownerReply = ownerReply;

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
    const { userId } = req.body;

    const review = await Review.findById(
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
            id.toString() !== userId
        );
    } else {
      review.likes.push(userId);
    }

    await review.save();

    res.status(200).json({
      success: true,
      likes: review.likes.length,
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

const toggleDislike = async (
  req,
  res
) => {
  try {
    const { userId } = req.body;

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.likes = review.likes.filter(
      (id) =>
        id.toString() !== userId
    );

    const disliked =
      review.dislikes.some(
        (id) =>
          id.toString() === userId
      );

    if (disliked) {
      review.dislikes =
        review.dislikes.filter(
          (id) =>
            id.toString() !== userId
        );
    } else {
      review.dislikes.push(userId);
    }

    await review.save();

    res.status(200).json({
      success: true,
      likes: review.likes.length,
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

module.exports = {
  addReview,
  getPropertyReviews,
  updateReview,
  deleteReview,
  replyToReview,
  toggleLike,
  toggleDislike,
};

