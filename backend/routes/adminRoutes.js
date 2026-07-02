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
} = require("../controllers/adminController");

router.get("/users", getAllUsers);

router.get("/user/:id", getUserById);

router.delete("/user/:id", deleteUser);

router.get("/properties", getAllProperties);

router.get(
  "/approved-properties",
  getApprovedProperties
);

router.put("/approve/:id", approveProperty);

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