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

    maintenanceCharges: {
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
      enum: ["Boys", "Girls", "Co-live"],
      required: true,
    },

    totalBeds: {
      type: Number,
      default: 1,
    },

    availableBeds: {
      type: Number,
      default: 1,
    },

    availableNow: {
      type: Boolean,
      default: true,
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

    attachedBathroom: {
      type: Boolean,
      default: false,
    },

    laundryAvailable: {
      type: Boolean,
      default: false,
    },

    housekeepingAvailable: {
      type: Boolean,
      default: false,
    },

    liftAvailable: {
      type: Boolean,
      default: false,
    },

    geyserAvailable: {
      type: Boolean,
      default: false,
    },

    parkingAvailable: {
      type: Boolean,
      default: false,
    },

    powerBackupAvailable: {
      type: Boolean,
      default: false,
    },

    studyTableAvailable: {
      type: Boolean,
      default: false,
    },

    cupboardAvailable: {
      type: Boolean,
      default: false,
    },

    smokingAllowed: {
      type: Boolean,
      default: false,
    },

    petsAllowed: {
      type: Boolean,
      default: false,
    },

    visitorsAllowed: {
      type: Boolean,
      default: true,
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

    // Reviews
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PGReview",
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deactivationReason: {
      type: String,
      default: "",
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