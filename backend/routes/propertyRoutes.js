const express = require("express");

const router = express.Router();

const {
  addProperty,
} = require("../controllers/propertyController");

router.post("/", addProperty);

module.exports = router;