const Property = require("../models/Property");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const addProperty = async (req, res) => {
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
                    folder: "property-platform",
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

    const property =
      await Property.create({
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
      message:
        "Property added successfully",
      property,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const {
      city,
      locality,
      propertyType,
      listingType,
      minPrice,
      maxPrice,
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

    if (locality) {
      filters.locality = {
        $regex: locality,
        $options: "i",
      };
    }

    if (propertyType) {
      filters.propertyType = propertyType;
    }

    if (listingType) {
      filters.listingType = listingType;
    }

    if (minPrice || maxPrice) {
      filters.price = {};

      if (minPrice) {
        filters.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filters.price.$lte = Number(maxPrice);
      }
    }

    const totalProperties = await Property.countDocuments(filters);

    const properties = await Property.find(filters)
      .sort({ views: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      properties,
      currentPage: page,
      totalPages: Math.ceil(totalProperties / limit),
      totalProperties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      owner: req.params.userId,
    });

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    let imageUrls = property.images;

    if (req.files && req.files.length > 0) {
      imageUrls = [];

      for (const file of req.files) {
        const uploadedImage =
          await new Promise(
            (resolve, reject) => {
              const uploadStream =
                cloudinary.uploader.upload_stream(
                  {
                    folder:
                      "property-platform",
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
                .createReadStream(
                  file.buffer
                )
                .pipe(uploadStream);
            }
          );

        imageUrls.push(
          uploadedImage.secure_url
        );
      }
    }

    const updatedProperty =
      await Property.findByIdAndUpdate(
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
        "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const remainingProperties =
      await Property.countDocuments({
        owner: property.owner,
      });

    if (remainingProperties === 0) {
      const user = await User.findById(
        property.owner
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
        "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const incrementViews = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      views: property.views,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const filterProperties = async (req, res) => {
  try {
    const filters = {};

    if (req.query.city) {
      filters.city = {
        $regex: req.query.city,
        $options: "i",
      };
    }

    if (req.query.locality) {
      filters.locality = {
        $regex: req.query.locality,
        $options: "i",
      };
    }

    if (req.query.listingType) {
      filters.listingType =
        req.query.listingType;
    }

    if (req.query.propertyType) {
      filters.propertyType =
        req.query.propertyType;
    }

    const properties =
      await Property.find(filters);

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  incrementViews,
  filterProperties,
};