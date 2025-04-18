const express = require("express");
const router = express.Router();
const {
  getAllPriorities,
  getPriorityById,
  getPriorityByLevel,
} = require("../controllers/priorityController");

// Get all priorities
router.get("/", getAllPriorities);

// Get priority by ID
router.get("/id/:priority_id", getPriorityById);

// Get priority by level
router.get("/level/:level", getPriorityByLevel);

module.exports = router;
