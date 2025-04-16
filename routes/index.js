const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const listRoutes = require("./listRoutes");
const taskRoutes = require("./taskRoutes");

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/lists", listRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
