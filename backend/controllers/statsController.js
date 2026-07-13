const Property = require("../models/Property");
const PG = require("../models/PG");
const User = require("../models/User");

const getPlatformStats = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments({
      isApproved: true,
    });

    const totalPGs = await PG.countDocuments({
      isApproved: true,
    });

    const totalUsers = await User.countDocuments();

    const propertyCities =
      await Property.distinct("city", {
        isApproved: true,
      });

    const pgCities =
      await PG.distinct("city", {
        isApproved: true,
      });

    const uniqueCities = [
      ...new Set([
        ...propertyCities,
        ...pgCities,
      ]),
    ];

    res.status(200).json({
      success: true,
      stats: {
        properties:
          totalProperties + totalPGs,
        cities: uniqueCities.length,
        users: totalUsers,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch platform statistics.",
    });
  }
};

module.exports = {
  getPlatformStats,
};