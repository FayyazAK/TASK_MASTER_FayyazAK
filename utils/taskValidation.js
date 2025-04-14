const HTTP_STATUS = require("./statusCodes");
const Priority = require("../models/Priority");
const config = require("../config/env");

const validateTitle = (title) => {
  if (!title || title.trim() === "") {
    return { message: "Title is required", status: HTTP_STATUS.BAD_REQUEST };
  }

  if (title.length > config.TASK_TITLE_MAX_LENGTH) {
    return {
      message: `Title must be less than ${config.TASK_TITLE_MAX_LENGTH} characters`,
      status: HTTP_STATUS.BAD_REQUEST,
    };
  }

  return null;
};

const validateDescription = (description) => {
  if (!description || description.trim() === "") {
    return null;
  }

  if (description.length > config.TASK_DESCRIPTION_MAX_LENGTH) {
    return {
      message: `Description must be less than ${config.TASK_DESCRIPTION_MAX_LENGTH} characters`,
      status: HTTP_STATUS.BAD_REQUEST,
    };
  }
  return null;
};

const validatePriorityId = async (priorityId) => {
  if (priorityId === undefined || priorityId === null) {
    return null;
  }

  const parsedPriorityId = parseInt(priorityId);
  if (isNaN(parsedPriorityId)) {
    return {
      message: "Priority ID must be a valid number",
      status: HTTP_STATUS.BAD_REQUEST,
    };
  }

  const priority = await Priority.getPriorityById(parsedPriorityId);
  if (!priority) {
    return { message: "Invalid priority ID", status: HTTP_STATUS.BAD_REQUEST };
  }

  return null;
};

const validateDueDate = (dueDate) => {
  if (!dueDate) {
    return null;
  }

  if (isNaN(new Date(dueDate))) {
    return {
      message: "Due date must be a valid date (YYYY-MM-DD)",
      status: HTTP_STATUS.BAD_REQUEST,
    };
  }

  return null;
};

const validateIsCompleted = (isCompleted) => {
  if (isCompleted === undefined) {
    return null;
  }

  if (
    typeof isCompleted !== "boolean" &&
    isCompleted !== "0" &&
    isCompleted !== "1" &&
    isCompleted !== 0 &&
    isCompleted !== 1 &&
    isCompleted !== "true" &&
    isCompleted !== "false"
  ) {
    return {
      message: "is_completed must be a boolean value",
      status: HTTP_STATUS.BAD_REQUEST,
    };
  }

  return null;
};

const parseIsCompleted = (isCompleted) => {
  return (
    isCompleted === true ||
    isCompleted === "true" ||
    isCompleted === 1 ||
    isCompleted === "1"
  );
};

module.exports = {
  validateTitle,
  validateDescription,
  validatePriorityId,
  validateDueDate,
  validateIsCompleted,
  parseIsCompleted,
};
