const express = require("express");
const config = require("./config/env");
const initializeDatabase = require("./config/db-init");
const userRoutes = require('./routes/userRoutes');

const app = express();

const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
  return res.json({
    message: "Hello from server!",
  });
});

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
