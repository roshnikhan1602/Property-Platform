const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    listingType: {
      type: String,
      enum: ["Rent", "Sale", "Lease"],
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["Apartment", "House", "Villa", "Plot"],
      required: true,
    },

    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    area: {
      type: Number,
      required: true,
    },

    furnishing: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
      default: "Unfurnished",
    },

    address: {
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

    locality: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    ownerPhone: {
      type: String,
      required: true,
      trim: true,
    },

    ownerEmail: {
      type: String,
      required: true,
      trim: true,
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

module.exports = mongoose.model("Property", propertySchema);