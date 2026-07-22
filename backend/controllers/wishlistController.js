const Wishlist = require("../models/wishlistModel");

const User = require("../models/User");

const Subscription = require("../models/Subscription");

const Property = require("../models/Property");
const Notification = require("../models/Notification");
const PG = require("../models/PG");



const addToWishlist = async (req, res) => {
  try {
    const { itemId, itemType } = req.body;

    const userId = req.user.id;

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

    // Notify owner when a Property is wishlisted
    // Notify owner when a Property is wishlisted
    if (itemType === "Property") {
      const property = await Property.findById(itemId);

      if (property) {
        const user = await User.findById(userId);

        if (user && property.owner.toString() !== userId) {
          await Notification.create({
            user: property.owner,
            title: "❤️ New Interested Buyer",
            message: `${user.name} added your property "${property.title}" to their wishlist.`,
            type: "general",
            referenceId: property._id,
            referenceType: "Property",
          });
        }
      }
    }

    // Notify owner when a PG is wishlisted
    if (itemType === "PG") {
      const pg = await PG.findById(itemId);

      if (pg) {
        const user = await User.findById(userId);

        if (user && pg.owner.toString() !== userId) {
          await Notification.create({
            user: pg.owner,
            title: "❤️ New Interested Tenant",
            message: `${user.name} added your PG "${pg.title}" to their wishlist.`,
            type: "general",
            referenceId: pg._id,
            referenceType: "PG",
          });
        }
      }
    }


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
    const wishlist = await Wishlist.find({
      userId: req.user.id,
    }).populate("itemId");

    const updatedWishlist = await Promise.all(
      wishlist.map(async (item) => {
        if (!item.itemId) {
          return item.toObject();
        }

        const subscription =
          await Subscription.findOne({
            user: item.itemId.owner,
          }).sort({ createdAt: -1 });

        const listing = item.itemId.toObject();

        listing.listingAvailable =
          !subscription ||
          subscription.status !== "Expired";

        return {
          ...item.toObject(),
          itemId: listing,
        };
      })
    );

    res.status(200).json({
      success: true,
      wishlist: updatedWishlist,
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
    // DELETE /:wishlistId
    if (req.params.wishlistId) {
      const wishlist = await Wishlist.findOneAndDelete({
        _id: req.params.wishlistId,
        userId: req.user.id,
      });

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

    // POST /remove
    const { itemId, itemType } = req.body;

    const wishlist = await Wishlist.findOneAndDelete({
      userId: req.user.id,
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

const getInterestedUsers = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const wishlist = await Wishlist.find({
      itemId: propertyId,
      itemType: "Property",
    }).sort({ createdAt: -1 });

    const users = await Promise.all(
      wishlist.map(async (item) => {
        const user = await User.findById(item.userId).select(
          "name email mobileNumber profileImage"
        );

        if (!user) return null;

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobileNumber: user.mobileNumber,
          profileImage: user.profileImage,
          wishlistedAt: item.createdAt,
        };
      })
    );

    const filteredUsers = users.filter(Boolean);

    res.status(200).json({
      success: true,
      count: filteredUsers.length,
      users: filteredUsers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getInterestedUsersForPG = async (req, res) => {
  try {
    const { pgId } = req.params;

    const wishlist = await Wishlist.find({
      itemId: pgId,
      itemType: "PG",
    }).sort({ createdAt: -1 });

    const users = await Promise.all(
      wishlist.map(async (item) => {
        const user = await User.findById(item.userId).select(
          "name email mobileNumber profileImage"
        );

        if (!user) return null;

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobileNumber: user.mobileNumber,
          profileImage: user.profileImage,
          wishlistedAt: item.createdAt,
        };
      })
    );

    const filteredUsers = users.filter(Boolean);

    res.status(200).json({
      success: true,
      count: filteredUsers.length,
      users: filteredUsers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const checkWishlistStatus = async (req, res) => {
  try {
    const { itemId, itemType } = req.query;

    const wishlist = await Wishlist.findOne({
      userId: req.user.id,
      itemId,
      itemType,
    });

    res.status(200).json({
      success: true,
      isWishlisted: !!wishlist,
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
  getInterestedUsers,
  getInterestedUsersForPG,
  checkWishlistStatus,
};