const mongoose = require("mongoose");

const subscriptionHistorySchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      previousPlan: {
        type: String,
        enum: ["Free", "Premium", "Elite"],
        required: true,
      },

      newPlan: {
        type: String,
        enum: ["Free", "Premium", "Elite"],
        required: true,
      },

      action: {
        type: String,
        enum: ["Upgrade", "Downgrade"],
        required: true,
      },

      amount: {
        type: Number,
        default: 0,
      },

      payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "SubscriptionHistory",
  subscriptionHistorySchema
);