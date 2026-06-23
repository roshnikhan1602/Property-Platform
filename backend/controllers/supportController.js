const SupportMessage = require("../models/SupportMessage");

const createSupportMessage = async (
  req,
  res
) => {
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

      const message =
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

      res.status(200).json({
        success: true,
        message,
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
      const message =
        await SupportMessage.findByIdAndUpdate(
          req.params.id,
          {
            status: "Resolved",
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        message,
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