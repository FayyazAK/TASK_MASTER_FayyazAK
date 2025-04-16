const express = require("express");
const router = express.Router();
const {
  createTask,
  getTaskById,
  getAllTasks,
  deleteTask,
  updateTaskStatus,
  updateTask,
} = require("../controllers/taskController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, createTask);
router.get("/:task_id", authenticate, getTaskById);
router.get("/", authenticate, getAllTasks);
router.delete("/:task_id", authenticate, deleteTask);
router.put("/:task_id", authenticate, updateTask);
router.put("/:task_id/status", authenticate, updateTaskStatus);
module.exports = router;
