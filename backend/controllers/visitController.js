const Visit = require("../models/Visit");
const Property = require("../models/Property");
const PG = require("../models/PG");
const createNotification = require("../utils/createNotification");

const bookVisit = async (req, res) => {
  try {
    const {
      propertyId,
      pgId,
      visitDate,
      visitTime,
      message,
    } = req.body;

// Admin cannot book visits
if (req.user.role === "admin") {
  return res.status(403).json({
    success: false,
    message: "Admins cannot book property visits.",
  });
}

    // Validation
    if (!visitDate || !visitTime) {
      return res.status(400).json({
        success: false,
        message: "Visit date and time are required.",
      });
    }

    if (!propertyId && !pgId) {
      return res.status(400).json({
        success: false,
        message: "Property or PG is required.",
      });
    }

    let listing;
    let visitType;

    // Property Booking
    if (propertyId) {
      listing = await Property.findById(propertyId);

      if (!listing) {
        return res.status(404).json({
          success: false,
          message: "Property not found.",
        });
      }

      visitType = "Property";
    }

    // PG Booking
    if (pgId) {
      listing = await PG.findById(pgId);

      if (!listing) {
        return res.status(404).json({
          success: false,
          message: "PG not found.",
        });
      }

      visitType = "PG";
    }

    // Prevent booking own listing
    if (listing.owner.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot book a visit for your own listing.",
      });
    }

    // Prevent duplicate booking
    const existingVisit = await Visit.findOne({
      owner: listing.owner,
      visitDate: new Date(visitDate),
      visitTime,
      status: {
        $in: ["Pending", "Approved"],
      },
      isDeleted: false,
    });

    if (existingVisit) {
      return res.status(400).json({
        success: false,
        message:
          "This time slot is already booked. Please choose another time.",
      });
    }

    // Create Visit
    const visit = await Visit.create({
      user: req.user.id,
      owner: listing.owner,

      property: propertyId || null,
      pg: pgId || null,

      visitType,

      propertyTitle: listing.title,
      propertyImage:
        listing.images?.length > 0
          ? listing.images[0]
          : "",

      propertyAddress: listing.address,
      propertyCity: listing.city,

      visitDate,
      visitTime,
      message,
    });

    // Notify Owner
    await createNotification({
      user: listing.owner,
      title: "New Visit Request",
      message: `${visitType} visit requested for "${listing.title}".`,
      type: "visit-request",
      referenceId: visit._id,
      referenceType: "Visit",
    });

    return res.status(201).json({
      success: true,
      message: "Visit booked successfully.",
      visit,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Owner - Get Visit Requests
// ===============================
const getOwnerVisitRequests = async (req, res) => {
  try {
    const visits = await Visit.find({
      owner: req.user.id,
      isDeleted: false,
    })
      .populate("user", "name mobileNumber email profileImage")
      .populate("property", "title images")
      .populate("pg", "title images")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      visits,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Owner - Approve Visit
// ===============================
const approveVisit = async (req, res) => {
  try {
    const visit = await Visit.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found.",
      });
    }

 if (visit.status !== "Pending") {
  return res.status(400).json({
    success: false,
    message: "Only pending visits can be approved.",
  });
}

    visit.status = "Approved";
    visit.approvedAt = new Date();

    visit.statusHistory.push({
      status: "Approved",
      changedAt: new Date(),
    });

    await visit.save();

    await createNotification({
      user: visit.user,
      title: "Visit Approved",
     message: `Your visit for "${visit.propertyTitle}" has been approved.`,
      type: "visit-approved",
      referenceId: visit._id,
      referenceType: "Visit",
    });

    return res.status(200).json({
      success: true,
      message: "Visit approved successfully.",
      visit,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Owner - Reject Visit
// ===============================
const rejectVisit = async (req, res) => {
  try {
    const { rejectionReason } = req.body;

    const visit = await Visit.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found.",
      });
    }

    if (visit.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending visits can be rejected.",
      });
    }

    visit.status = "Rejected";
    visit.rejectedAt = new Date();
    visit.rejectionReason = rejectionReason || "";

    visit.statusHistory.push({
      status: "Rejected",
      changedAt: new Date(),
    });

    await visit.save();

    await createNotification({
      user: visit.user,
      title: "Visit Rejected",
     message: `Your visit for "${visit.propertyTitle}" has been rejected.`,
      type: "visit-rejected",
      referenceId: visit._id,
      referenceType: "Visit",
    });

    return res.status(200).json({
      success: true,
      message: "Visit rejected successfully.",
      visit,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const completeVisit = async (req, res) => {
  try {
    const visit = await Visit.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found.",
      });
    }

    if (visit.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message: "Only approved visits can be completed.",
      });
    }

    visit.status = "Completed";
    visit.completedAt = new Date();

    visit.statusHistory.push({
      status: "Completed",
      changedAt: new Date(),
    });

    await visit.save();

    await createNotification({
      user: visit.user,
      title: "Visit Completed",
     message: `Your visit for "${visit.propertyTitle}" has been marked as complete.`,
      type: "visit-completed",
      referenceId: visit._id,
      referenceType: "Visit",
    });

    return res.status(200).json({
      success: true,
      message: "Visit marked as completed.",
      visit,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const rescheduleVisit = async (req, res) => {
  try {
    const {
      visitDate,
      visitTime,
      reason,
    } = req.body;

    const visit = await Visit.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found.",
      });
    }

    if (visit.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message:
          "Only approved visits can be rescheduled.",
      });
    }

    // Save previous schedule
    visit.previousVisitDate = visit.visitDate;
    visit.previousVisitTime = visit.visitTime;

    // Update current schedule
    visit.visitDate = visitDate;
    visit.visitTime = visitTime;

    // Mark as rescheduled
    visit.isRescheduled = true;
    visit.rescheduledVisitDate = visitDate;
    visit.rescheduledVisitTime = visitTime;
    visit.ownerNotes = reason || "";

    visit.statusHistory.push({
      status: "Rescheduled",
      changedAt: new Date(),
    });

    await visit.save();

    await createNotification({
      user: visit.user,
      title: "Visit Rescheduled",
      message: `Your visit for "${visit.propertyTitle}" has been rescheduled by owner.`,
      type: "visit-rescheduled",
      referenceId: visit._id,
      referenceType: "Visit",
    });

    return res.status(200).json({
      success: true,
      message: "Visit rescheduled successfully.",
      visit,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyVisits = async (req, res) => {
  try {
    const visits = await Visit.find({
      user: req.user.id,
      isDeleted: false,
    })
      .populate("property", "title images")
      .populate("pg", "title images")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      visits,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// User - Cancel Visit
// ===============================
const cancelVisit = async (req, res) => {
  try {
    const { cancellationReason = "" } = req.body || {};

    const visit = await Visit.findOne({
      _id: req.params.id,
      user: req.user.id,
      isDeleted: false,
    });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found.",
      });
    }

 if (
  visit.status !== "Pending" &&
  visit.status !== "Approved"
) {
  return res.status(400).json({
    success: false,
    message:
      "Only pending or approved visits can be cancelled.",
  });
}
    visit.status = "Cancelled";
    visit.cancelledAt = new Date();
    visit.cancellationReason =
      cancellationReason || "";

    visit.statusHistory.push({
      status: "Cancelled",
      changedAt: new Date(),
    });

    await visit.save();

    await createNotification({
      user: visit.owner,
      title: "Visit Cancelled",
      message: `The user cancelled the visit for "${visit.propertyTitle}".`,
      type: "visit-cancelled",
      referenceId: visit._id,
      referenceType: "Visit",
    });

    return res.status(200).json({
      success: true,
      message: "Visit cancelled successfully.",
      visit,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Admin - Get All Visits
// ===============================
const getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.find({
      isDeleted: false,
    })
      .populate("user", "name email mobileNumber")
      .populate("owner", "name email mobileNumber")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      visits,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Admin - Visit Statistics
// ===============================
const getVisitStats = async (req, res) => {
  try {
    const [
      totalVisits,
      pendingVisits,
      approvedVisits,
      completedVisits,
      rejectedVisits,
      cancelledVisits,
    ] = await Promise.all([
      Visit.countDocuments({ isDeleted: false }),
      Visit.countDocuments({
        status: "Pending",
        isDeleted: false,
      }),
      Visit.countDocuments({
        status: "Approved",
        isDeleted: false,
      }),
      Visit.countDocuments({
        status: "Completed",
        isDeleted: false,
      }),
      Visit.countDocuments({
        status: "Rejected",
        isDeleted: false,
      }),
      Visit.countDocuments({
        status: "Cancelled",
        isDeleted: false,
      }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalVisits,
        pendingVisits,
        approvedVisits,
        completedVisits,
        rejectedVisits,
        cancelledVisits,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  bookVisit,
  getOwnerVisitRequests,
  approveVisit,
  rejectVisit,
  completeVisit,
  rescheduleVisit,
  getMyVisits,
  cancelVisit,
  getAllVisits,
  getVisitStats,
};