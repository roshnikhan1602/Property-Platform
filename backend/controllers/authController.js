const User = require("../models/User");
const otpStore = require("../utils/otpStore");

const registerUser = async (req, res) => {
  try {
    const { name, mobileNumber, email } = req.body;

    const existingUser = await User.findOne({
      mobileNumber,
    });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        user: existingUser,
      });
    }

    const user = await User.create({
      name,
      mobileNumber,
      email,
    });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    const user = await User.findOne({
      mobileNumber,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    otpStore[mobileNumber] = otp;

    res.status(200).json({
      success: true,
      message: "OTP generated",
      otp,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (otpStore[mobileNumber] != otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const user =
      await User.findOneAndUpdate(
        { mobileNumber },
        { isVerified: true },
        { returnDocument: "after" }
      );

    delete otpStore[mobileNumber];

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  sendOTP,
  verifyOTP,
  getProfile,
  updateProfile,
};