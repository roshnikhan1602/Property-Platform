const express = require("express");

const router = express.Router();

const {
  getPlans,
  getCurrentSubscription,
  downgradeSubscription,
  getSubscriptionHistory,
} = require("../controllers/subscriptionController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/plans", getPlans);

router.get(
  "/current",
  authMiddleware,
  getCurrentSubscription
);

router.get(
  "/history",
  authMiddleware,
  getSubscriptionHistory
);

router.put(
  "/downgrade",
  authMiddleware,
  downgradeSubscription
);

module.exports = router;