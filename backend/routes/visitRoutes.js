const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
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
} = require("../controllers/visitController");


router.post("/book", authMiddleware, bookVisit);

router.get("/my-visits", authMiddleware, getMyVisits);

router.put(
  "/cancel/:id",
  authMiddleware,
  cancelVisit
);

router.get(
  "/owner",
  authMiddleware,
  getOwnerVisitRequests
);

router.put(
  "/approve/:id",
  authMiddleware,
  approveVisit
);

router.put(
  "/reject/:id",
  authMiddleware,
  rejectVisit
);

router.put(
  "/complete/:id",
  authMiddleware,
  completeVisit
);

router.put(
  "/reschedule/:id",
  authMiddleware,
  rescheduleVisit
);

router.get(
  "/admin/all",
  authMiddleware,
  getAllVisits
);

router.get(
  "/admin/stats",
  authMiddleware,
  getVisitStats
);

module.exports = router;