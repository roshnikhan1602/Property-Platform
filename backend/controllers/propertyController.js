const Property = require("../models/Property");

const addProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const incrementViews = async (req, res) => {
  try {
    const property =
      await Property.findByIdAndUpdate(
        req.params.id,
        {
          $inc: { views: 1 },
        },
        {
          new: true,
        }
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      views: property.views,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const filterProperties = async (req, res) => {
  try {
    const filters = {};

    if (req.query.city) {
      filters.city = {
        $regex: req.query.city,
        $options: "i",
      };
    }

    if (req.query.listingType) {
      filters.listingType =
        req.query.listingType;
    }

    if (req.query.propertyType) {
      filters.propertyType =
        req.query.propertyType;
    }

    const properties =
      await Property.find(filters);

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  getPropertyById,
  incrementViews,
  filterProperties,
};