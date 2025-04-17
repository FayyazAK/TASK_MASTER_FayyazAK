const Priority = require("../models/Priority");
const HTTP_STATUS = require("../utils/statusCodes");

// Get all priority levels
const getAllPriorities = async (req, res, next) => {
  try {
    const priorities = await Priority.getPriorities();
    return res.success(priorities, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in getAllPriorities:", error);
    return next(error);
  }
};

// Get priority by ID

const getPriorityById = async (req, res, next) => {
  try {
    const { priority_id } = req.params;

    // Validate priority_id
    const parsedPriorityId = parseInt(priority_id);
    if (isNaN(parsedPriorityId)) {
      return res.error(
        "Valid priority ID is required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Get priority
    const priority = await Priority.getPriorityById(parsedPriorityId);

    if (!priority) {
      return res.error("Priority not found", HTTP_STATUS.NOT_FOUND);
    }

    return res.success(priority, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in getPriorityById:", error);
    return next(error);
  }
};

// Get priority by level
const getPriorityByLevel = async (req, res, next) => {
  try {
    const { level } = req.params;

    // Validate level
    const parsedLevel = parseInt(level);
    if (isNaN(parsedLevel)) {
      return res.error(
        "Valid priority level is required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Get priority
    const priority = await Priority.getPriorityByLevel(parsedLevel);

    if (!priority) {
      return res.error("Priority level not found", HTTP_STATUS.NOT_FOUND);
    }

    return res.success(priority, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in getPriorityByLevel:", error);
    return next(error);
  }
};

module.exports = {
  getAllPriorities,
  getPriorityById,
  getPriorityByLevel,
};
