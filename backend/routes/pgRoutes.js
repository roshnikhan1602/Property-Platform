const express = require("express");

const router = express.Router();

const {
  addPG,
  getAllPGs,
  getMyPGs,
  getPGById,
  updatePG,
  deletePG,
  incrementPGViews,
} = require("../controllers/pgController");

router.post("/", addPG);

router.get("/", getAllPGs);

router.get(
  "/my-pgs/:userId",
  getMyPGs
);

router.put(
  "/:id/view",
  incrementPGViews
);

router.get("/:id", getPGById);

router.put("/:id", updatePG);

router.delete("/:id", deletePG);

module.exports = router;