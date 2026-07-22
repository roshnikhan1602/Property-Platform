const PG = require("../models/PG");
const User = require("../models/User");
const Subscription = require("../models/Subscription");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
const welcomeOwnerEmail = require("../templates/welcomeOwnerEmail");
const Wishlist = require("../models/wishlistModel");

const addPG = async (req, res) => {
  try {
    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedImage =
          await new Promise(
            (resolve, reject) => {
              const uploadStream =
                cloudinary.uploader.upload_stream(
                  {
                    folder: "property-platform/pgs",
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
                .createReadStream(file.buffer)
                .pipe(uploadStream);
            }
          );

        imageUrls.push(
          uploadedImage.secure_url
        );
      }
    }

    // Get user's latest subscription
    const latestSubscription =
      await Subscription.findOne({
        user: req.user.id,
      }).sort({ createdAt: -1 });

    const pgCount =
      await PG.countDocuments({
        owner: req.user.id,
      });

    // Default Free plan limits
    let pgLimit = 1;
    let planName = "Free";

    // If subscription is active, use its limits
    if (
      latestSubscription &&
      latestSubscription.status === "Active"
    ) {
      pgLimit = latestSubscription.pgLimit;
      planName = latestSubscription.plan;
    }

    // If subscription is expired, don't allow adding PGs
    if (
      latestSubscription &&
      latestSubscription.status === "Expired"
    ) {
      return res.status(403).json({
        success: false,
        message:
          latestSubscription.plan === "Free"
            ? "Your free trial has ended. Upgrade to Premium or Elite to continue adding PG listings."
            : `Your ${latestSubscription.plan} subscription has expired. Please renew your subscription to continue adding PG listings.`,
      });
    }

    // Check limit
    if (
      pgLimit !== -1 &&
      pgCount >= pgLimit
    ) {
      return res.status(403).json({
        success: false,
        message: `Your ${planName} plan allows only ${pgLimit} PG listing${pgLimit > 1 ? "s" : ""
          }. Please upgrade your subscription to add more PG listings.`,
      });
    }

    const pg = await PG.create({
      ...req.body,
      owner: req.user.id,
      images: imageUrls,
    });
    const admins = await User.find({
      role: "admin",
    });

    for (const admin of admins) {
      await Notification.create({
        user: admin._id,
        title: "New PG Submitted",
        message: `"${pg.title}" has been submitted and is awaiting approval.`,
        type: "general",
        referenceId: pg._id,
        referenceType: "PG",
      });
    }

    await Notification.create({
      user: req.user.id,
      title: "PG Submitted",
      message:
        "Your PG has been submitted successfully and is awaiting admin approval.",
      type: "general",
    });

    const user = await User.findById(
      req.user.id
    );

    if (user && user.role === "user") {
      user.role = "owner";
      await user.save();


      // Send owner welcome email
      if (user.email) {
        await sendEmail(
          user.email,
          "Welcome to PropertyHub as an Owner 🚀",
          welcomeOwnerEmail(user.name)
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "PG added successfully",
      pg,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPGs = async (req, res) => {
  try {
    const {
      city,
      gender,
      sharingType,
    } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const filters = {
      isApproved: true,
      isActive: true,
    };

    if (city) {
      filters.city = {
        $regex: city,
        $options: "i",
      };
    }

    if (gender) {
      filters.genderPreference = gender;
    }

    if (sharingType) {
      filters.sharingType = sharingType;
    }

    let pgs = await PG.find(filters)
      .sort({ views: -1 })
      .skip(skip)
      .limit(limit);

    const filteredPGs = [];

    for (const pg of pgs) {
      const subscription =
        await Subscription.findOne({
          user: pg.owner,
        }).sort({ createdAt: -1 });

      if (
        subscription &&
        subscription.status === "Expired"
      ) {
        continue;
      }

      filteredPGs.push(pg);
    }

    const totalPGs =
      filteredPGs.length;

    res.status(200).json({
      success: true,
      pgs: filteredPGs,
      currentPage: page,
      totalPages: Math.ceil(
        totalPGs / limit
      ),
      totalPGs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyPGs = async (req, res) => {
  try {
    const pgs = await PG.find({
      owner: req.user.id,
    });

    const updatedPGs = await Promise.all(
      pgs.map(async (pg) => {
        const wishlistCount =
          await Wishlist.countDocuments({
            itemId: pg._id,
            itemType: "PG",
          });

        return {
          ...pg.toObject(),
          wishlistCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      pgs: updatedPGs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPGById = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    // Clone PG object
    const pgData = pg.toObject();

    // Get owner's latest subscription
    const latestSubscription =
      await Subscription.findOne({
        user: pg.owner,
      }).sort({ createdAt: -1 });

    let contactAvailable = true;
    let listingAvailable = true;

    if (
      latestSubscription &&
      latestSubscription.status === "Expired"
    ) {
      contactAvailable = false;
      listingAvailable = false;

      pgData.ownerPhone = "";
      pgData.ownerEmail = "";
    }

    res.status(200).json({
      success: true,
      contactAvailable,
      listingAvailable,
      pg: pgData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePG = async (req, res) => {
  try {
    const pg = await PG.findById(
      req.params.id
    );

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }
    if (pg.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this PG",
      });
    }
    let imageUrls = [];

    if (req.body.existingImages) {
      imageUrls = JSON.parse(req.body.existingImages);
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedImage =
          await new Promise(
            (resolve, reject) => {
              const uploadStream =
                cloudinary.uploader.upload_stream(
                  {
                    folder: "property-platform/pgs",
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
                .createReadStream(file.buffer)
                .pipe(uploadStream);
            }
          );

        imageUrls.push(
          uploadedImage.secure_url
        );
      }
    }

    const updatedPG =
      await PG.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          images: imageUrls,
        },
        {
          new: true,
        }
      );

    await Notification.create({
      user: req.user.id,
      title: "PG Updated",
      message: `"${updatedPG.title}" has been updated successfully.`,
      type: "general",
    });
    res.status(200).json({
      success: true,
      message:
        "PG updated successfully",
      pg: updatedPG,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const togglePGStatus = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    if (pg.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this PG",
      });
    }

    // Deactivating
    if (pg.isActive) {
      if (!req.body.reason || req.body.reason.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Please provide a reason for deactivation.",
        });
      }

      pg.isActive = false;
      pg.deactivationReason = req.body.reason.trim();
    }
    // Activating
    else {
      pg.isActive = true;
      pg.deactivationReason = "";
    }

    await pg.save();

    await Notification.create({
      user: req.user.id,
      title: pg.isActive
        ? "PG Activated"
        : "PG Deactivated",
      message: pg.isActive
        ? `"${pg.title}" has been activated.`
        : `"${pg.title}" has been deactivated.`,
      type: "general",
      referenceId: pg._id,
      referenceType: "PG",
    });

    res.status(200).json({
      success: true,
      message: `PG ${
        pg.isActive ? "activated" : "deactivated"
      } successfully.`,
      pg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePG = async (req, res) => {
  try {
    const pg = await PG.findById(
      req.params.id
    );

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    if (pg.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this PG",
      });
    }

    await Notification.create({
      user: req.user.id,
      title: "PG Deleted",
      message: `"${pg.title}" has been deleted successfully.`,
      type: "general",
    });

    await pg.deleteOne();

    const remainingPGs =
      await PG.countDocuments({
        owner: pg.owner,
      });

    if (remainingPGs === 0) {
      const user = await User.findById(
        pg.owner
      );

      if (
        user &&
        user.role === "owner"
      ) {
        user.role = "user";
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      message:
        "PG deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const incrementPGViews = async (
  req,
  res
) => {
  try {
    const pg = await PG.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    res.status(200).json({
      success: true,
      views: pg.views,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addPG,
  getAllPGs,
  getMyPGs,
  getPGById,
  updatePG,
  togglePGStatus,
  deletePG,
  incrementPGViews,
};