const responseHandler = (req, res, next) => {
  // Success response handler
  res.success = (data, statusCode = 200) => {
    res.status(statusCode).json({ status: "success", data });
  };

  // Error response handler
  res.error = (message, statusCode = 400) => {
    res.status(statusCode).json({ status: "error", message });
  };

  next();
};

module.exports = responseHandler; 