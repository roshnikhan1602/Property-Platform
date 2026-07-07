const Subscription = require("../models/Subscription");

const plans = [
  {
    name: "Free",
    price: 0,
    propertyLimit: 2,
    pgLimit: 1,
    features: [
      "2 Property Listings",
      "1 PG Listing",
      "Basic Support",
    ],
  },
  {
    name: "Premium",
    price: 299,
    propertyLimit: 10,
    pgLimit: 10,
    features: [
      "10 Property Listings",
      "10 PG Listings",
      "Priority Listing",
      "Premium Badge",
    ],
  },
  {
    name: "Elite",
    price: 999,
    propertyLimit: -1,
    pgLimit: -1,
    features: [
      "Unlimited Properties",
      "Unlimited PGs",
      "Highest Priority Listing",
      "Elite Badge",
    ],
  },
];

const getPlans = async (req, res) => {
  res.json({
    success: true,
    plans,
  });
};

const getCurrentSubscription = async (
  req,
  res
) => {
  try {
    let subscription =
      await Subscription.findOne({
        user: req.user.id,
        status: "Active",
      });

    // Automatically create Free plan
    if (!subscription) {
      subscription =
        await Subscription.create({
          user: req.user.id,
          plan: "Free",
          amount: 0,
          propertyLimit: 2,
          pgLimit: 1,
          status: "Active",
        });
    }

    res.json({
      success: true,
      subscription,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch subscription.",
    });
  }
};

module.exports = {
  getPlans,
  getCurrentSubscription,
};