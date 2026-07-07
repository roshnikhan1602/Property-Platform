const PG = require("../models/PG");
const User = require("../models/User");
const Subscription = require("../models/Subscription");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

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

// Check subscription limits
const subscription =
  await Subscription.findOne({
    user: req.user.id,
    status: "Active",
  });

const pgCount =
  await PG.countDocuments({
    owner: req.user.id,
  });

if (
  subscription &&
  subscription.pgLimit !== -1 &&
  pgCount >= subscription.pgLimit
) {
  return res.status(403).json({
    success: false,
    message: `Your ${subscription.plan} plan allows only ${subscription.pgLimit} PG listings. Upgrade your subscription to add more.`,
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
      type: "pg",
    });

const user = await User.findById(
  req.user.id
);

    if (user && user.role === "user") {
      user.role = "owner";
      await user.save();
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

    const totalPGs =
      await PG.countDocuments(filters);

    const pgs = await PG.find(filters)
      .sort({ views: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      pgs,
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

    res.status(200).json({
      success: true,
      pgs,
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
    const pg = await PG.findById(
      req.params.id
    );

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    res.status(200).json({
      success: true,
      pg,
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
        type: "pg",
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
  deletePG,
  incrementPGViews,
};