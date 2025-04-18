const db = require("../config/database");
const PRIORITY = require("../queries/priorityQueries");

class Priority {
  static async createTable() {
    try {
      await db.execute(PRIORITY.CREATE_TABLE);
    } catch (error) {
      console.error("Error creating priorities table:", error);
      throw error;
    }
  }

  static async initializePriorities() {
    try {
      await db.execute(PRIORITY.INITIALIZE_PRIORITIES);
      console.log("Priority levels initialized successfully");
    } catch (error) {
      console.error("Error initializing priority levels:", error);
      throw error;
    }
  }

  static async getPriorities() {
    try {
      const [results] = await db.execute(PRIORITY.GET_PRIORITIES);
      return results;
    } catch (error) {
      console.error("Error getting priorities:", error);
      throw error;
    }
  }

  static async getPriorityById(priority_id) {
    try {
      const [results] = await db.execute(PRIORITY.GET_PRIORITY_BY_ID, [
        priority_id,
      ]);
      return results[0];
    } catch (error) {
      console.error("Error getting priority by ID:", error);
      throw error;
    }
  }

  static async getPriorityByLevel(level) {
    try {
      const [results] = await db.execute(PRIORITY.GET_PRIORITY_BY_LEVEL, [
        level,
      ]);
      return results[0];
    } catch (error) {
      console.error("Error getting priority by level:", error);
      throw error;
    }
  }
  static async createPriority(name, level) {
    try {
      const [result] = await db.execute(PRIORITY.CREATE_PRIORITY, [
        name,
        level,
      ]);
      return result.insertId;
    } catch (error) {
      console.error("Error creating priority:", error);
      throw error;
    }
  }

  static async updatePriority(priority_id, name, level) {
    try {
      const [result] = await db.execute(PRIORITY.UPDATE_PRIORITY, [
        name,
        level,
        priority_id,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating priority:", error);
      throw error;
    }
  }

  static async deletePriority(priority_id) {
    try {
      const [result] = await db.execute(PRIORITY.DELETE_PRIORITY, [
        priority_id,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting priority:", error);
      throw error;
    }
  }

  static async checkLevelExists(level, priority_id = 0) {
    try {
      const [results] = await db.execute(PRIORITY.CHECK_LEVEL_EXISTS, [
        level,
        priority_id,
      ]);
      return results[0].count > 0;
    } catch (error) {
      console.error("Error checking if level exists:", error);
      throw error;
    }
  }
}

module.exports = Priority;
