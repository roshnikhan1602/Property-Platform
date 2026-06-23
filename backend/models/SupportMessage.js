const mongoose = require("mongoose");

const supportMessageSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      reply: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "Replied",
          "Resolved",
        ],
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "SupportMessage",
  supportMessageSchema
);