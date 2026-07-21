const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    plan: {
      type: String,
      enum: ["Free", "Premium", "Elite"],
      default: "Free",
    },

    propertyLimit: {
      type: Number,
      default: 2,
    },

    pgLimit: {
      type: Number,
      default: 1,
    },

    amount: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active",
    },

    // Tracks whether the 7-day reminder email has been sent
    expiryReminderSent: {
      type: Boolean,
      default: false,
    },

    // Tracks whether the expired subscription email has been sent
    expiredEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Subscription",
  subscriptionSchema
);