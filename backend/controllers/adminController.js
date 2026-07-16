const User = require("../models/User");
const Property = require("../models/Property");
const PG = require("../models/PG");
const Notification = require("../models/Notification");
const Subscription = require("../models/Subscription");
const Payment = require("../models/Payment");
const SubscriptionHistory = require("../models/SubscriptionHistory");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();

    const usersWithCounts =
      await Promise.all(
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

const disapproveProperty =
  async (req, res) => {
    try {
      const property =
        await Property.findByIdAndUpdate(
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
          title:
            "Property Rejected ❌",
          message: `"${property.title}" has been rejected by the admin.`,
          type: "property-rejected",
          referenceId: property._id,
          referenceType: "Property",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Property disapproved successfully",
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

const getAllPGs = async (
  req,
  res
) => {
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

const approvePG = async (
  req,
  res
) => {
  try {
    const pg =
      await PG.findByIdAndUpdate(
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
        referenceId: pg._id,
        referenceType: "PG",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "PG approved successfully",
      pg,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const disapprovePG = async (
  req,
  res
) => {
  try {
    const pg =
      await PG.findByIdAndUpdate(
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
      message:
        "PG disapproved successfully",
      pg,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePG = async (
  req,
  res
) => {
  try {
    await PG.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "PG deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalOwners =
      await User.countDocuments({
        role: "owner",
      });

    const totalProperties =
      await Property.countDocuments();

    const totalPGs =
      await PG.countDocuments();

    const freeUsers =
      await Subscription.countDocuments({
        plan: "Free",
        status: "Active",
      });

    const premiumUsers =
      await Subscription.countDocuments({
        plan: "Premium",
        status: "Active",
      });

    const eliteUsers =
      await Subscription.countDocuments({
        plan: "Elite",
        status: "Active",
      });

    const activeSubscriptions =
      await Subscription.countDocuments({
        status: "Active",
      });

    const totalRevenueResult =
      await Payment.aggregate([
        {
          $match: {
            status: "Success",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const totalRevenue =
      totalRevenueResult.length > 0
        ? totalRevenueResult[0].total
        : 0;

    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const monthlyRevenueResult =
      await Payment.aggregate([
        {
          $match: {
            status: "Success",
            createdAt: {
              $gte: startOfMonth,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const monthlyRevenue =
      monthlyRevenueResult.length > 0
        ? monthlyRevenueResult[0].total
        : 0;

    const totalPayments =
      await Payment.countDocuments({
        status: "Success",
      });

    const upgrades =
      await SubscriptionHistory.countDocuments({
        action: "Upgrade",
      });

    const downgrades =
      await SubscriptionHistory.countDocuments({
        action: "Downgrade",
      });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalOwners,
        totalProperties,
        totalPGs,

        freeUsers,
        premiumUsers,
        eliteUsers,
        activeSubscriptions,

        totalRevenue,
        monthlyRevenue,
        totalPayments,

        upgrades,
        downgrades,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch dashboard statistics.",
    });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const today = new Date();

    const expiredSubscriptions =
  await Subscription.find({
    endDate: {
      $ne: null,
      $lt: today,
    },
    status: "Active",
  });

for (const subscription of expiredSubscriptions) {
  const previousPlan =
    subscription.plan;

 subscription.status = "Expired";

await subscription.save();
}

    const subscriptions =
      await Subscription.find()
        .populate(
          "user",
          "name mobileNumber email role"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch subscriptions.",
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

  getDashboardStats,
  getAllSubscriptions,
};