const express = require("express");
const {
  getRequests,
  createRequest,
  deleteRequest,
  updateRequest,
} = require("../controllers/booking");
const { authorize, protect } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(protect, getRequests)
  .post(protect, createRequest);
router
  .route("/:id")
  .put(protect, updateRequest)
  .delete(protect, authorize("admin"), deleteRequest);

module.exports = router;
