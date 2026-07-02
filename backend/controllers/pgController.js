const PG = require("../models/PG");
const User = require("../models/User");
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

    const pg = await PG.create({
      ...req.body,
      images: imageUrls,
    });

    const user = await User.findById(
      req.body.owner
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
    const pgs = await PG.find().sort({
      views: -1,
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

const getMyPGs = async (req, res) => {
  try {
    const pgs = await PG.find({
      owner: req.params.userId,
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
    const pg = await PG.findByIdAndDelete(
      req.params.id
    );

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

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