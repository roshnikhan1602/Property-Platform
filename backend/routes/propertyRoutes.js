const express = require("express");

const router = express.Router();

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

router.post("/", addProperty);

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

router.put("/:id", updateProperty);

router.delete("/:id", deleteProperty);

module.exports = router;