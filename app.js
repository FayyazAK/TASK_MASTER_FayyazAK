const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./config/env");
const corsConfig = require("./config/cors");
const responseHandler = require("./middleware/responseHandler");
const errorHandler = require("./middleware/errorHandler");
const HTTP_STATUS = require("./utils/statusCodes");
const routes = require("./routes");

const app = express();

// CORS Configuration
app.use(cors(corsConfig));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// SSL Redirect Middleware
if (config.SSL.enabled) {
  app.use((req, res, next) => {
    if (!req.secure) {
      const httpsUrl = `https://${req.headers.host}${req.url}`;
      return res.redirect(301, httpsUrl);
    }
    next();
  });
}

// Custom Response Handler
app.use(responseHandler);

// Routes
app.use("/api", routes);

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

module.exports = app;
