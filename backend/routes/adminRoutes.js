const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getAllProperties,
  getApprovedProperties,
  approveProperty,
  disapproveProperty,
  deleteProperty,
  deleteUser,
  getUserById,

  getAllPGs,
  approvePG,
  disapprovePG,
  deletePG,

  getDashboardStats,
  getAllSubscriptions,

  exportUsersToExcel,
  exportPropertiesToExcel,
} = require("../controllers/adminController");

router.get(
  "/dashboard-stats",
  getDashboardStats
);

// Subscription Routes
router.get(
  "/subscriptions",
  getAllSubscriptions
);

// User Routes
router.get("/users", getAllUsers);

router.get(
  "/export/users",
  exportUsersToExcel
);

router.get("/user/:id", getUserById);

router.delete("/user/:id", deleteUser);

// Property Routes
router.get("/properties", getAllProperties);

router.get(
  "/export/properties",
  exportPropertiesToExcel
);

router.get(
  "/approved-properties",
  getApprovedProperties
);

router.put(
  "/approve/:id",
  approveProperty
);

router.put(
  "/disapprove/:id",
  disapproveProperty
);

router.delete(
  "/property/:id",
  deleteProperty
);

// PG Routes
router.get("/pgs", getAllPGs);

router.put(
  "/pg/approve/:id",
  approvePG
);

router.put(
  "/pg/disapprove/:id",
  disapprovePG
);

router.delete(
  "/pg/:id",
  deletePG
);

module.exports = router;