const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },

    otp: {
      type: String,
      required: true,
    },
    verifiedAt: {
  type: Date,
},

    verified: {
      type: Boolean,
      default: false,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// Automatically delete expired OTP documents
otpSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
  }
);

module.exports = mongoose.model("OTP", otpSchema);