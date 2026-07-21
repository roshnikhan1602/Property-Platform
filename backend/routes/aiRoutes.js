const express = require("express");

const router = express.Router();

const {
  visualizeRoom,
} = require("../controllers/aiController");

router.post(
  "/generate-interior",
  visualizeRoom
);

module.exports = router;