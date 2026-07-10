const express = require("express");
const {
  shareViaEmail,
} = require("../controllers/shareController");

const router = express.Router();

router.post("/email", shareViaEmail);

module.exports = router;