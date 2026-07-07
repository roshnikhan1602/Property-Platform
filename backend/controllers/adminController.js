const User = require("../models/User");
const Property = require("../models/Property");
const PG = require("../models/PG");
const Notification = require("../models/Notification");
const getAllUsers = async (req, res) => {
  try {
   const users = await User.find().lean();

const usersWithCounts = await Promise.all(
  users.map(async (user) => {
    const propertyCount =
      await Property.countDocuments({
        owner: user._id,
      });

    const pgCount =
      await PG.countDocuments({
        owner: user._id,
      });

    return {
      ...user,
      propertyCount,
      pgCount,
    };
  })
);

res.status(200).json({
  success: true,
  users: usersWithCounts,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserById = async (
  req,
  res
) => {
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
      message: error.message,
    });
  }
};

const deleteUser = async (
  req,
  res
) => {
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

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message:
          "Admin users cannot be deleted",
      });
    }

    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllProperties = async (
  req,
  res
) => {
  try {
    const properties =
      await Property.find();

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

const getApprovedProperties =
  async (req, res) => {
    try {
      const properties =
        await Property.find({
          isApproved: true,
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

const approveProperty = async (
  req,
  res
) => {
  try {
    const property =
      await Property.findByIdAndUpdate(
        req.params.id,
        {
          isApproved: true,
        },
        {
          new: true,
        }
      );

      console.log("Property:", property);
      if (property) {
          await Notification.create({
            user: property.owner,
            title: "Property Approved 🎉",
            message: `"${property.title}" has been approved by the admin.`,
            type: "property-approved",
            referenceId: property._id,
            referenceType: "Property",
          });
        }

        console.log("Approval notification created");
        
    res.status(200).json({
      success: true,
      message:
        "Property approved successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const disapproveProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: false,
      },
      {
        new: true,
      }
    );

    if (property) {
      await Notification.create({
        user: property.owner,
        title: "Property Rejected ❌",
        message: `"${property.title}" has been rejected by the admin.`,
        type: "property-rejected",
        referenceId: property._id,
        referenceType: "Property",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property disapproved successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProperty = async (
  req,
  res
) => {
  try {
    await Property.findByIdAndDelete(
      req.params.id
    );

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
const getAllPGs = async (req, res) => {
  try {
    const pgs = await PG.find();

    res.status(200).json({
      success: true,
      pgs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approvePG = async (req, res) => {
  try {
    const pg = await PG.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
      },
      {
        new: true,
      }
    );

    if (pg) {
      await Notification.create({
        user: pg.owner,
        title: "PG Approved 🎉",
        message: `"${pg.title}" has been approved by the admin.`,
        type: "pg-approved",
      });
    }

    if (pg) {
        await Notification.create({
          user: pg.owner,
          title: "PG Rejected",
          message: `"${pg.title}" has been rejected by the admin.`,
          type: "rejection",
        });
      }
    res.status(200).json({
      success: true,
      message: "PG approved successfully",
      pg,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const disapprovePG = async (req, res) => {
  try {
    const pg = await PG.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: false,
      },
      {
        new: true,
      }
    );

    if (pg) {
      await Notification.create({
        user: pg.owner,
        title: "PG Rejected ❌",
        message: `"${pg.title}" has been rejected by the admin.`,
        type: "pg-rejected",
        referenceId: pg._id,
        referenceType: "PG",
      });
    }

    res.status(200).json({
      success: true,
      message: "PG disapproved successfully",
      pg,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePG = async (req, res) => {
  try {
    await PG.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "PG deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,

  getAllProperties,
  getApprovedProperties,
  approveProperty,
  disapproveProperty,
  deleteProperty,

  getAllPGs,
  approvePG,
  disapprovePG,
  deletePG,
};