const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const jwt = require("jsonwebtoken");

const sendOTPController = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    const existingUser = await User.findOne({
      mobileNumber,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already registered",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await OTP.findOneAndUpdate(
      { mobileNumber },
      {
        otp,
        verified: false,
        verifiedAt: null,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    console.log(`OTP for ${mobileNumber}: ${otp}`);


    res.status(200).json({
      success: true,
      message: "OTP generated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOTPController = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and OTP are required",
      });
    }

    const otpData = await OTP.findOne({
      mobileNumber,
    });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (otpData.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    otpData.verified = true;
    otpData.verifiedAt = new Date();

    await otpData.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sendForgotPasswordOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this mobile number",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await OTP.findOneAndUpdate(
      { mobileNumber },
      {
        otp,
        verified: false,
        verifiedAt: null,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    console.log(`Forgot Password OTP for ${mobileNumber}: ${otp}`);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and OTP are required",
      });
    }

    const otpData = await OTP.findOne({ mobileNumber });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (otpData.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    otpData.verified = true;
    otpData.verifiedAt = new Date();

    await otpData.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and new password are required",
      });
    }

    const otpData = await OTP.findOne({ mobileNumber });

    if (!otpData || !otpData.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    await OTP.deleteOne({ mobileNumber });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, mobileNumber, password } = req.body;

    if (!name || !mobileNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      mobileNumber,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already registered",
      });
    }

    const otpData = await OTP.findOne({
      mobileNumber,
    });

    if (!otpData || !otpData.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your mobile number first",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      mobileNumber,
      password: hashedPassword,
      isVerified: true,
    });

    await OTP.deleteOne({
      mobileNumber,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and password are required",
      });
    }

    const user = await User.findOne({
      mobileNumber,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updateData = {
      name,
    };

    if (email && email.trim() !== "") {
      updateData.email = email.trim();
    } else {
      updateData.$unset = {
        email: "",
      };
    }

  const user = await User.findByIdAndUpdate(
  req.user.id,
  updateData,
  {
    new: true,
  }
);

    if (!user) {
      return res.status(404).json({
        success: false,
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
      success: false,
      message: error.message,
    });
  }
};

const uploadProfileImage = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const uploadedImage =
      await new Promise(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  "property-platform/profile-images",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );

          streamifier
            .createReadStream(req.file.buffer)
            .pipe(uploadStream);
        }
      );

  const user =
  await User.findByIdAndUpdate(
    req.user.id,
    {
      profileImage:
        uploadedImage.secure_url,
    },
    {
      new: true,
    }
  );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Profile image updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendOTPController,
  verifyOTPController,
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  resetPassword,
  signup,
  login,
  logout,
  getMe,
  getProfile,
  updateProfile,
  uploadProfileImage,
};