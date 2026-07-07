const express = require("express");

const router = express.Router();

const {
  getPlans,
  getCurrentSubscription,
} = require("../controllers/subscriptionController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/plans", getPlans);

router.get(
  "/current",
  authMiddleware,
  getCurrentSubscription
);

module.exports = router;