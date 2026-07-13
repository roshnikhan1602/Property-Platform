const express = require("express");

const {
  getPlatformStats,
} = require("../controllers/statsController");

const router = express.Router();

router.get("/", getPlatformStats);

module.exports = router;