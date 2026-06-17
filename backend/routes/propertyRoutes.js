const express = require("express");

const router = express.Router();

const {
  addProperty,
  getAllProperties,
  getPropertyById,
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

router.get("/:id", getPropertyById);

module.exports = router;