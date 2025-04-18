const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require("../middleware/auth");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const authRoutes = require("./authRoutes");
const listRoutes = require("./listRoutes");
const taskRoutes = require("./taskRoutes");
const priorities = require("./priorityRoutes");

router.use("/auth", authRoutes);
router.use("/admin", authenticate, authorizeAdmin, adminRoutes);
router.use("/user", authenticate, userRoutes);
router.use("/lists", authenticate, listRoutes);
router.use("/tasks", authenticate, taskRoutes);
router.use("/priorities", authenticate, priorities);

module.exports = router;
