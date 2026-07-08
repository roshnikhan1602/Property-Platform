const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
  type: String,
  enum: [
    "property-approved",
    "property-rejected",
    "pg-approved",
    "pg-rejected",
    "subscription",
    "review",
    "support",
    "support-reply",
    "support-resolved",
    "welcome",
    "general",
  ],
  default: "general",
},

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    referenceType: {
      type: String,
      enum: [
        "Property",
        "PG",
        "Subscription",
        "Review",
        "Support",
      ],
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);