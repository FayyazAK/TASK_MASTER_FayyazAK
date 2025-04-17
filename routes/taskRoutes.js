const express = require("express");
const router = express.Router();
const {
  createTask,
  getTaskById,
  getAllTasks,
  deleteTask,
  updateTaskStatus,
  updateTask,
  getOverdueTasks,
  getPendingTasks,
  getTasksDueToday,
} = require("../controllers/taskController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, createTask);
router.get("/", authenticate, getAllTasks);
router.get("/:task_id", authenticate, getTaskById);
router.delete("/:task_id", authenticate, deleteTask);
router.put("/:task_id", authenticate, updateTask);
router.put("/:task_id/status", authenticate, updateTaskStatus);
router.get("/status/pending", getPendingTasks);
router.get("/due/today", getTasksDueToday);
router.get("/due/overdue", getOverdueTasks);

module.exports = router;
