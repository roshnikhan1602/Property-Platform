const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
  addPG,
  getAllPGs,
  getMyPGs,
  getPGById,
  updatePG,
  deletePG,
  // togglePGStatus,
  incrementPGViews,
} = require("../controllers/pgController");

// Protected Routes
router.post(
  "/",
  authMiddleware,
  upload.array("images", 10),
  addPG
);

router.get(
  "/my-pgs",
  authMiddleware,
  getMyPGs
);

router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 10),
  updatePG
);

// router.put(
//   "/:id/status",
//   authMiddleware,
//   togglePGStatus
// );

router.delete(
  "/:id",
  authMiddleware,
  deletePG
);

// Public Routes
router.get("/", getAllPGs);

router.get(
  "/:id",
  getPGById
);

router.put(
  "/:id/view",
  incrementPGViews
);

module.exports = router;