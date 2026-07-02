const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    rent: {
      type: Number,
      required: true,
    },

    depositAmount: {
      type: Number,
      default: 0,
    },

    sharingType: {
      type: String,
      enum: ["Single", "Double", "Triple"],
      required: true,
    },

    genderPreference: {
      type: String,
      enum: ["Boys", "Girls", "Unisex"],
      required: true,
    },

    foodAvailable: {
      type: Boolean,
      default: false,
    },

    wifiAvailable: {
      type: Boolean,
      default: false,
    },

    acAvailable: {
      type: Boolean,
      default: false,
    },

    gymAvailable: {
      type: Boolean,
      default: false,
    },

    swimmingPoolAvailable: {
      type: Boolean,
      default: false,
    },

    tvAvailable: {
      type: Boolean,
      default: false,
    },

    cctvAvailable: {
      type: Boolean,
      default: false,
    },

    address: {
      type: String,
      required: true,
    },

    locality: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    ownerPhone: {
      type: String,
      required: true,
    },

    ownerEmail: {
      type: String,
      required: true,
      lowercase: true,
    },

    images: [
      {
        type: String,
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PG", pgSchema);