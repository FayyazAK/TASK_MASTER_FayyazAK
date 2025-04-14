const express = require("express");
const config = require("./config/env");
const cookieParser = require("cookie-parser");
const initializeDatabase = require("./config/db-init");
const userRoutes = require("./routes/userRoutes");
const responseHandler = require("./middleware/responseHandler");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const listRoutes = require("./routes/listRoutes");
const taskRoutes = require("./routes/taskRoutes");
const HTTP_STATUS = require("./utils/statusCodes");
const app = express();
const PORT = config.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Custom Response Handler
app.use(responseHandler);
// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  return res.success({ message: "Hello from server!" });
});

// 404 page handler
app.use((req, res) => {
  return res.error(
    "Not Found - The requested resource does not exist",
    HTTP_STATUS.NOT_FOUND
  );
});

// Error handler Middleware
app.use(errorHandler);

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
