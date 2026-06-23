const PG = require("../models/PG");
const User = require("../models/User");

const addPG = async (req, res) => {
  try {
    const pg = await PG.create(req.body);

    await User.findByIdAndUpdate(req.body.owner, {
      role: "owner",
    });

    res.status(201).json({
      success: true,
      message: "PG added successfully",
      pg,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllPGs = async (req, res) => {
  try {
    const pgs = await PG.find().sort({
      views: -1,
    });

    res.status(200).json({
      success: true,
      pgs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyPGs = async (req, res) => {
  try {
    const pgs = await PG.find({
      owner: req.params.userId,
    });

    res.status(200).json({
      success: true,
      pgs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPGById = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        message: "PG not found",
      });
    }

    res.status(200).json({
      success: true,
      pg,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePG = async (req, res) => {
  try {
    const pg = await PG.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      pg,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePG = async (req, res) => {
  try {
    await PG.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "PG deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const incrementPGViews = async (req, res) => {
  try {
    const pg = await PG.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      views: pg.views,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addPG,
  getAllPGs,
  getMyPGs,
  getPGById,
  updatePG,
  deletePG,
  incrementPGViews,
};