const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    visitId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },

    pg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PG",
      default: null,
    },

    visitType: {
      type: String,
      enum: ["Property", "PG"],
      required: true,
    },

    propertyTitle: {
      type: String,
      default: "",
      trim: true,
    },

    propertyImage: {
      type: String,
      default: "",
    },

    propertyAddress: {
      type: String,
      default: "",
      trim: true,
    },

    propertyCity: {
      type: String,
      default: "",
      trim: true,
    },

    visitDate: {
      type: Date,
      required: true,
    },

    visitTime: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
    enum: [
  "Pending",
  "Approved",
  "Rejected",
  "Completed",
  "Cancelled",
],
      default: "Pending",
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rejectedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
      trim: true,
    },

    cancellationReason: {
      type: String,
      default: "",
      trim: true,
    },

    ownerNotes: {
      type: String,
      default: "",
      trim: true,
    },

    isRescheduled: {
      type: Boolean,
      default: false,
    },

    previousVisitDate: {
      type: Date,
      default: null,
    },

    previousVisitTime: {
      type: String,
      default: "",
    },

    rescheduledVisitDate: {
      type: Date,
      default: null,
    },

    rescheduledVisitTime: {
      type: String,
      default: "",
    },

    checkedIn: {
      type: Boolean,
      default: false,
    },

    checkedInAt: {
      type: Date,
      default: null,
    },

    isRated: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    review: {
      type: String,
      default: "",
      trim: true,
    },

    ratedAt: {
      type: Date,
      default: null,
    },

    approvalEmailSent: {
      type: Boolean,
      default: false,
    },

    reminderEmailSent: {
      type: Boolean,
      default: false,
    },

    completionEmailSent: {
      type: Boolean,
      default: false,
    },

    reminderSent: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    statusHistory: [
      {
        status: {
          type: String,
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

visitSchema.pre("save", async function () {
  if (!this.visitId) {
    const count = await mongoose.models.Visit.countDocuments();

    this.visitId = `VST-${String(count + 1).padStart(6, "0")}`;
  }

  if (this.isNew) {
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date(),
    });
  }
});

module.exports = mongoose.model("Visit", visitSchema);