const app = require("./app");
const config = require("./config/env");
const initializeDatabase = require("./config/db-init");
const createServers = require("./config/server");
const { cacheHelpers } = require("./config/redis");

async function startServer() {
  try {
    await initializeDatabase();

    // Clear Redis cache if CLEAR_CACHE_ON_START is true
    if (config.CLEAR_CACHE_ON_START === true) {
      console.log("Clearing Redis cache on startup...");
      await cacheHelpers.clear();
      console.log("Redis cache cleared successfully");
    }

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
