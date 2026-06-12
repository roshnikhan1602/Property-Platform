const express = require("express");

const router = express.Router();

const {
  addProperty,
  getAllProperties,
  getPropertyById,
} = require("../controllers/propertyController");

router.post("/", addProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

module.exports = router;