const Notification = require("../models/Notification");

const createNotification = async ({
  user,
  title,
  message,
  type = "general",
  referenceId = null,
  referenceType = null,
}) => {
  try {
    return await Notification.create({
      user,
      title,
      message,
      type,
      referenceId,
      referenceType,
    });
  } catch (error) {
    console.error("Notification Error:", error.message);
    return null;
  }
};

module.exports = createNotification;