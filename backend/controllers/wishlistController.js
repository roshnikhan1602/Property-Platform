const Wishlist = require("../models/wishlistModel");

const addToWishlist = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    const existingWishlist = await Wishlist.findOne({
      userId,
      propertyId,
    });

    if (existingWishlist) {
      return res.status(400).json({
        success: false,
        message: "Property already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      userId,
      propertyId,
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
    }).populate("propertyId");

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
    const { id } = req.params;

    await Wishlist.findByIdAndDelete(id);

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