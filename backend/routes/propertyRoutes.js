const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
  addProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  togglePropertyStatus,
  incrementViews,
  filterProperties,
} = require("../controllers/propertyController");

// Protected Routes
router.post(
  "/",
  authMiddleware,
  upload.array("images", 10),
  addProperty
);

router.get(
  "/my-properties",
  authMiddleware,
  getMyProperties
);

router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 10),
  updateProperty
);

router.put(
  "/:id/toggle-status",
  authMiddleware,
  togglePropertyStatus
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProperty
);

// Public Routes
router.get(
  "/filter/search",
  filterProperties
);

router.get("/", getAllProperties);

router.get(
  "/:id",
  getPropertyById
);

router.put(
  "/:id/view",
  incrementViews
);

module.exports = router;