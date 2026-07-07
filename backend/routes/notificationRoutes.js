const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createNotification,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
} = require("../controllers/notificationController");

// Create Notification (Internal API)
router.post(
  "/",
  authMiddleware,
  createNotification
);

// Get All Notifications
router.get(
  "/",
  authMiddleware,
  getNotifications
);

// Get Unread Count
router.get(
  "/unread",
  authMiddleware,
  getUnreadCount
);

// Mark One Notification as Read
router.put(
  "/:id/read",
  authMiddleware,
  markAsRead
);

// Mark All Notifications as Read
router.put(
  "/read-all",
  authMiddleware,
  markAllAsRead
);

// Delete One Notification
router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);

// Delete All Notifications
router.delete(
  "/",
  authMiddleware,
  deleteAllNotifications
);

module.exports = router;