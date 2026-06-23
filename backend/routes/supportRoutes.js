const express = require("express");

const router = express.Router();

const {
  createSupportMessage,
  getAllSupportMessages,
  getUserSupportMessages,
  replyToSupportMessage,
  resolveSupportMessage,
  deleteSupportMessage,
} = require("../controllers/supportController");

router.post(
  "/",
  createSupportMessage
);

router.get(
  "/",
  getAllSupportMessages
);

router.get(
  "/user/:userId",
  getUserSupportMessages
);

router.put(
  "/reply/:id",
  replyToSupportMessage
);

router.put(
  "/resolve/:id",
  resolveSupportMessage
);

router.delete(
  "/:id",
  deleteSupportMessage
);

module.exports = router;