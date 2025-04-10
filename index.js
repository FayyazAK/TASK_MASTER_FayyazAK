const express = require("express");
const config = require("./config/env");
const initializeDatabase = require("./config/db-init");
const userRoutes = require("./routes/userRoutes");
const responseHandler = require("./middleware/responseHandler");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = config.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Cuustom Response Handler
app.use(responseHandler);

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  return res.success({ message: "Hello from server!" });
});

// 404 page handler
app.use((req, res) => {
  return res.error("Not Found - The requested resource does not exist", 404);
});

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
