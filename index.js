const app = require("./app");
const config = require("./config/env");
const initializeDatabase = require("./config/db-init");
const createServers = require("./config/server");

async function startServer() {
  try {
    await initializeDatabase();

    // Create HTTP and/or HTTPS servers based on configuration
    const servers = createServers(app);

    if (config.SSL.enabled) {
      console.log(`Server is running on https://localhost:${config.SSL.port}`);
    } else {
      console.log(`Server is running on http://localhost:${config.PORT}`);
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
