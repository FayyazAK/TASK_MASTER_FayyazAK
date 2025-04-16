const rateLimit = require("express-rate-limit");
const HTTP_STATUS = require("../utils/statusCodes");

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Enable/Disable the `X-RateLimit-*` headers
  // Custom handler for when limit is exceeded
  handler: (req, res) => {
    return res.error(
      `Too many requests from this IP, please try again after ${Math.ceil(
        res.getHeader("Retry-After") / 60
      )} minutes.`,
      HTTP_STATUS.TOO_MANY_REQUESTS
    );
  },
});

module.exports = limiter;
