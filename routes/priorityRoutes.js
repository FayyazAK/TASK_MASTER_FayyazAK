const express = require("express");
const router = express.Router();
const {
  getAllPriorities,
  getPriorityById,
  getPriorityByLevel,
} = require("../controllers/priorityController");
const { authenticate } = require("../middleware/auth");

// Get all priorities
router.get("/", authenticate, getAllPriorities);

// Get priority by ID
router.get("/id/:priority_id", authenticate, getPriorityById);

// Get priority by level
router.get("/level/:level", authenticate, getPriorityByLevel);

module.exports = router;
