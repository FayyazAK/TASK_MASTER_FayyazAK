const HTTP_STATUS = require("../utils/statusCodes");
const { verifyToken } = require("../services/jwtService");

const authenticate = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.error("Unauthenticated", HTTP_STATUS.UNAUTHORIZED);
    }

    // Verify token
    const decoded = verifyToken(token);
    // Add user from payload to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.error("Unauthenticated", HTTP_STATUS.UNAUTHORIZED);
    }
    return res.error("Unauthenticated", HTTP_STATUS.UNAUTHORIZED);
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.error("Unauthorized", HTTP_STATUS.FORBIDDEN);
  }
  next();
};

module.exports = { authenticate, authorizeAdmin };
