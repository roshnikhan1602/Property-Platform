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
  incrementViews,
  filterProperties,
} = require("../controllers/propertyController");

router.post(
  "/",
  authMiddleware,
  upload.array("images", 10),
  addProperty
);

router.get("/", getAllProperties);

router.get(
  "/filter/search",
  filterProperties
);

router.put(
  "/:id/view",
  incrementViews
);

router.get(
  "/my-properties/:userId",
  getMyProperties
);

router.get("/:id", getPropertyById);

router.put(
  "/:id",
  upload.array("images", 10),
  updateProperty
);

router.delete("/:id", deleteProperty);

module.exports = router;