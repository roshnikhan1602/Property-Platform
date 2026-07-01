const Wishlist = require("../models/wishlistModel");

const addToWishlist = async (req, res) => {
  try {
    const { userId, itemId, itemType } = req.body;

    const existingWishlist = await Wishlist.findOne({
      userId,
      itemId,
      itemType,
    });

    if (existingWishlist) {
      return res.status(400).json({
        success: false,
        message: "Item already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      userId,
      itemId,
      itemType,
    });

    res.status(201).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.find({
      userId,
    }).populate("itemId");

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    // Support DELETE /:wishlistId
    if (req.params.wishlistId) {
      const wishlist = await Wishlist.findByIdAndDelete(
        req.params.wishlistId
      );

      if (!wishlist) {
        return res.status(404).json({
          success: false,
          message: "Wishlist item not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Removed from wishlist",
      });
    }

    // Support POST /remove
    const { userId, itemId, itemType } = req.body;

    const wishlist = await Wishlist.findOneAndDelete({
      userId,
      itemId,
      itemType,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};