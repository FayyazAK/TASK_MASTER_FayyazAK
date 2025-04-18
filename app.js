const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/env");
const corsConfig = require("./config/cors");
const responseHandler = require("./middleware/responseHandler");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");
const STATUS = require("./utils/statusCodes");
const MSG = require("./utils/messages");
const helmet = require("helmet");
const routes = require("./routes");
const logger = require("./utils/logger");

const app = express();

// CORS Configuration
app.use(cors(corsConfig));

// Helmet Configuration
app.use(helmet());

// Logging middleware
app.use(morgan("combined", { stream: logger.stream }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// SSL Redirect Middleware
if (config.SSL.enabled) {
  app.use((req, res, next) => {
    if (!req.secure) {
      const httpsUrl = `https://${req.headers.host}${req.url}`;
      logger.info(`Redirecting to HTTPS: ${httpsUrl}`);
      return res.redirect(301, httpsUrl);
    }
    next();
  });
}

// Custom Response Handler
app.use(responseHandler);
// Rate Limiter Middleware (must be after responseHandler)
app.use(rateLimiter);

// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  logger.info("Root endpoint accessed");
  return res.success(null, MSG.SERVER_RUNNING, STATUS.OK);
});

// 404 page handler
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.url}`);
  return res.error(MSG.NOT_FOUND, STATUS.NOT_FOUND);
});

// Error handler Middleware
app.use((err, req, res, next) => {
  logger.error("Unhandled error:", {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  errorHandler(err, req, res, next);
});

module.exports = app;
