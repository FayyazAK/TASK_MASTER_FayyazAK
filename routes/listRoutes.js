const express = require("express");
const router = express.Router();
const {
  createList,
  getUserLists,
  getListById,
  deleteList,
  deleteAllLists,
  updateList,
  cleanUpList,
  cleanUpAllLists,
} = require("../controllers/listController");
const { authenticate } = require("../middleware/auth");

// Static routes (no parameters)
router.post("/", authenticate, createList);
router.get("/", authenticate, getUserLists);
router.delete("/", authenticate, deleteAllLists);
router.delete("/clear", authenticate, cleanUpAllLists);

// Parameterized routes
router.get("/:list_id", authenticate, getListById);
router.put("/:list_id", authenticate, updateList);
router.delete("/:list_id", authenticate, deleteList);
router.delete("/:list_id/clear", authenticate, cleanUpList);

module.exports = router;
