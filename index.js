const cluster = require("cluster");
const os = require("os");
const app = require("./app");
const config = require("./config/env");
const initializeDatabase = require("./config/db-init");
const createServers = require("./config/server");

const numCPUs = os.cpus().length;
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Initialize database in master process
  initializeDatabase()
    .then(() => {
      // console.log("Database initialization completed in master process");

      // Fork workers after database is initialized
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        console.log(
          `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
        );
        // console.log("Starting a new worker");
        cluster.fork();
      });
    })
    .catch((error) => {
      console.error("Failed to initialize database:", error);
      process.exit(1);
    });
} else {
  async function startServer() {
    try {
      // Create HTTP and/or HTTPS servers based on configuration
      const servers = createServers(app);

      if (config.SSL.enabled) {
        console.log(
          `Worker ${process.pid} is running on https://localhost:${config.SSL.port}`
        );
      } else {
        console.log(
          `Worker ${process.pid} is running on http://localhost:${config.PORT}`
        );
      }
    } catch (error) {
      console.error(`Worker ${process.pid} failed to start:`, error);
      process.exit(1);
    }
  }

  startServer();
}
