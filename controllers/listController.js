const config = require("../config/env");
const List = require("../models/List");
const HTTP_STATUS = require("../utils/statusCodes");

const createList = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.error("Invalid request: empty body", HTTP_STATUS.BAD_REQUEST);
    }

    const { title, description } = req.body;

    // Validate inputs
    if (!title || typeof title !== "string") {
      return res.error(
        "Title is required and must be a string",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const trimmedTitle = title.trim();

    if (
      trimmedTitle.length < config.LIST_TITLE_MIN_LENGTH ||
      trimmedTitle.length > config.LIST_TITLE_MAX_LENGTH
    ) {
      return res.error(
        "Title must be between 3 and 100 characters",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const list_id = await List.create(
      req.user.user_id,
      trimmedTitle,
      description
    );

    const list = await List.getListById(list_id, req.user.user_id);

    res.success(list, HTTP_STATUS.CREATED);
  } catch (error) {
    console.error("Error in createList:", error.message);
    return next(error);
  }
};

const getUserLists = async (req, res, next) => {
  try {
    const { include_tasks } = req.query;
    const lists =
      include_tasks === "true"
        ? await List.getListsWithTasks(req.user.user_id)
        : await List.getLists(req.user.user_id);
    res.success(lists, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in getUserLists:", error.message);
    return next(error);
  }
};

const getListById = async (req, res, next) => {
  try {
    const { list_id } = req.params;
    const { include_tasks } = req.query;

    if (!list_id || isNaN(parseInt(list_id))) {
      return res.error("Valid list ID is required", HTTP_STATUS.BAD_REQUEST);
    }

    const list =
      include_tasks === "true"
        ? await List.getListByIdWithTasks(parseInt(list_id), req.user.user_id)
        : await List.getListById(parseInt(list_id), req.user.user_id);

    if (!list) {
      return res.error("List not found!", HTTP_STATUS.NOT_FOUND);
    }

    return res.success(list, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in getListById:", error.message);
    return next(error);
  }
};

const updateList = async (req, res, next) => {
  try {
    const { list_id } = req.params;
    const { title, description } = req.body;

    if (!list_id || isNaN(parseInt(list_id))) {
      return res.error("Valid list ID is required", HTTP_STATUS.BAD_REQUEST);
    }

    if (!title && !description) {
      return res.error(
        "At least one field (title or description) is required for update",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Prepare update data
    const updateData = {};

    if (title) {
      const trimmedTitle = title.trim();
      if (
        typeof title !== "string" ||
        trimmedTitle.length < config.LIST_TITLE_MIN_LENGTH ||
        trimmedTitle.length > config.LIST_TITLE_MAX_LENGTH
      ) {
        return res.error(
          `Title must be between ${config.LIST_TITLE_MIN_LENGTH} and ${config.LIST_TITLE_MAX_LENGTH} characters`,
          HTTP_STATUS.BAD_REQUEST
        );
      }
      updateData.title = trimmedTitle;
    }

    if (description) {
      const trimmedDescription = description.trim();
      if (
        typeof description !== "string" ||
        trimmedDescription.length > config.LIST_DESCRIPTION_MAX_LENGTH
      ) {
        return res.error(
          `Description must be a string and less than ${config.LIST_DESCRIPTION_MAX_LENGTH} characters`,
          HTTP_STATUS.BAD_REQUEST
        );
      }
      updateData.description = trimmedDescription;
    }

    // Update the list
    const updatedList = await List.updateList(
      parseInt(list_id),
      req.user.user_id,
      updateData
    );

    if (!updatedList) {
      return res.error("List not found!", HTTP_STATUS.NOT_FOUND);
    }

    return res.success(updatedList, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in updateList:", error.message);
    return next(error);
  }
};

const deleteList = async (req, res, next) => {
  try {
    const { list_id } = req.params;

    if (!list_id || isNaN(parseInt(list_id))) {
      return res.error("Valid list ID is required", HTTP_STATUS.BAD_REQUEST);
    }

    const deleted = await List.deleteList(parseInt(list_id), req.user.user_id);

    if (!deleted) {
      return res.error("List not found!", HTTP_STATUS.NOT_FOUND);
    }

    return res.success(null, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in deleteList:", error.message);
    return next(error);
  }
};

const deleteAllLists = async (req, res, next) => {
  try {
    await List.deleteAllLists(req.user.user_id);
    return res.success(null, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in deleteAllLists:", error.message);
    return next(error);
  }
};

const cleanUpList = async (req, res, next) => {
  try {
    const { list_id } = req.params;

    if (!list_id || isNaN(parseInt(list_id))) {
      return res.error("Valid list ID is required", HTTP_STATUS.BAD_REQUEST);
    }
    //Check if the list exists
    const list = await List.getListById(parseInt(list_id), req.user.user_id);

    //Check if the list belongs to the user
    if (!list) {
      return res.error("List not found!", HTTP_STATUS.NOT_FOUND);
    }

    await List.cleanUpList(parseInt(list_id));

    return res.success(null, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in cleanUpList:", error.message);
    return next(error);
  }
};

const cleanUpAllLists = async (req, res, next) => {
  try {
    await List.cleanUpAllLists(req.user.user_id);
    return res.success(null, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Error in cleanUpAllLists:", error.message);
    return next(error);
  }
};

module.exports = {
  createList,
  getUserLists,
  getListById,
  updateList,
  deleteList,
  deleteAllLists,
  cleanUpList,
  cleanUpAllLists,
};
