const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },

    itemType: {
      type: String,
      required: true,
      enum: ["Property", "PG"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Wishlist",
  wishlistSchema
);