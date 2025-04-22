const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/userController");
const {
  createPriority,
  updatePriority,
  deletePriority,
} = require("../controllers/priorityController");

// User routes for admin
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Priority routes for admin
router.post("/priorities", createPriority);
router.put("/priorities/:priority_id", updatePriority);
router.delete("/priorities/:priority_id", deletePriority);

module.exports = router;
