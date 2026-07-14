const Subscription = require("../models/Subscription");
const SubscriptionHistory = require("../models/SubscriptionHistory");
const Property = require("../models/Property");
const PG = require("../models/PG");

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
    // Find the latest subscription
let subscription =
  await Subscription.findOne({
    user: req.user.id,
  }).sort({ createdAt: -1 });

// Brand new user -> create Free subscription
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

const downgradeSubscription = async (
  req,
  res
) => {
  try {
    const { plan } = req.body;

    const selectedPlan = plans.find(
      (p) => p.name === plan
    );

    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan.",
      });
    }

    const subscription =
      await Subscription.findOne({
        user: req.user.id,
        status: "Active",
      });

    const previousPlan =
      subscription?.plan || "Free";

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found.",
      });
    }

    const propertyCount =
      await Property.countDocuments({
        owner: req.user.id,
      });

    const pgCount =
      await PG.countDocuments({
        owner: req.user.id,
      });

    if (
      selectedPlan.propertyLimit !== -1 &&
      propertyCount >
        selectedPlan.propertyLimit
    ) {
      return res.status(400).json({
        success: false,
        message: `You currently have ${propertyCount} properties. Reduce them to ${selectedPlan.propertyLimit} before downgrading.`,
      });
    }

    if (
      selectedPlan.pgLimit !== -1 &&
      pgCount >
        selectedPlan.pgLimit
    ) {
      return res.status(400).json({
        success: false,
        message: `You currently have ${pgCount} PG listings. Reduce them to ${selectedPlan.pgLimit} before downgrading.`,
      });
    }

    subscription.plan =
      selectedPlan.name;
    subscription.amount =
      selectedPlan.price;
    subscription.propertyLimit =
      selectedPlan.propertyLimit;
    subscription.pgLimit =
      selectedPlan.pgLimit;

    await subscription.save();

    await SubscriptionHistory.create({
      user: req.user.id,
      previousPlan,
      newPlan: selectedPlan.name,
      action: "Downgrade",
      amount: 0,
      payment: null,
    });

    res.json({
      success: true,
      message:
        "Subscription updated successfully.",
      subscription,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update subscription.",
    });
  }
};

const getSubscriptionHistory =
  async (req, res) => {
    try {
      const history =
        await SubscriptionHistory.find({
          user: req.user.id,
        })
          .populate("payment")
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        history,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch subscription history.",
      });
    }
  };

module.exports = {
  getPlans,
  getCurrentSubscription,
  downgradeSubscription,
  getSubscriptionHistory,
};