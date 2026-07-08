const SupportMessage = require("../models/SupportMessage");
const Notification = require("../models/Notification");
const User = require("../models/User");

const createSupportMessage = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      message,
    } = req.body;

    const supportMessage =
      await SupportMessage.create({
        userId,
        name,
        email,
        message,
      });

    // Notify all admins
    const admins = await User.find({
      role: "admin",
    });

    for (const admin of admins) {
      await Notification.create({
        user: admin._id,
        title: "New Support Ticket 🎫",
        message: `${name} has raised a support request.`,
        type: "support",
        referenceId: supportMessage._id,
        referenceType: "Support",
      });
    }

    res.status(201).json({
      success: true,
      supportMessage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to send support message",
    });
  }
};

const getAllSupportMessages =
  async (req, res) => {
    try {
      const messages =
        await SupportMessage.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch messages",
      });
    }
  };

const getUserSupportMessages =
  async (req, res) => {
    try {
      const messages =
        await SupportMessage.find({
          userId: req.params.userId,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch user messages",
      });
    }
  };

const replyToSupportMessage =
  async (req, res) => {
    try {
      const { reply } = req.body;

      const supportMessage =
        await SupportMessage.findByIdAndUpdate(
          req.params.id,
          {
            reply,
            status: "Replied",
          },
          {
            new: true,
          }
        );

     console.log("Support Message:", supportMessage);

if (supportMessage) {
  console.log("User ID:", supportMessage.userId);

  const notification = await Notification.create({
    user: supportMessage.userId,
    title: "Support Reply 💬",
    message: "Our support team has replied to your support ticket.",
    type: "support-reply",
    referenceId: supportMessage._id,
    referenceType: "Support",
  });

  console.log("Notification Created:", notification);
}

      res.status(200).json({
        success: true,
        message: supportMessage,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to send reply",
      });
    }
  };

const resolveSupportMessage =
  async (req, res) => {
    try {
      const supportMessage =
        await SupportMessage.findByIdAndUpdate(
          req.params.id,
          {
            status: "Resolved",
          },
          {
            new: true,
          }
        );

      if (supportMessage) {
        await Notification.create({
          user: supportMessage.userId,
          title: "Support Ticket Resolved ✅",
          message:
            "Your support ticket has been marked as resolved.",
          type: "support",
          referenceId: supportMessage._id,
          referenceType: "Support",
        });
      }

      res.status(200).json({
        success: true,
        message: supportMessage,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to resolve message",
      });
    }
  };

const deleteSupportMessage =
  async (req, res) => {
    try {
      await SupportMessage.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Message deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to delete message",
      });
    }
  };

module.exports = {
  createSupportMessage,
  getAllSupportMessages,
  getUserSupportMessages,
  replyToSupportMessage,
  resolveSupportMessage,
  deleteSupportMessage,
};