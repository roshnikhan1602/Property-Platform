const express = require("express");

const router = express.Router();

const {
  addProperty,
  getAllProperties,
  getPropertyById,
  filterProperties,
} = require("../controllers/propertyController");

router.post("/", addProperty);

router.get("/", getAllProperties);

router.get("/filter/search", filterProperties);

router.get("/:id", getPropertyById);

module.exports = router;