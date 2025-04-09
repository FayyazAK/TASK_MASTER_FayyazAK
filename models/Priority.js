const db = require("../config/database");

class Priority {
  static async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS priorities (
          priority_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(20) NOT NULL,
          level INT NOT NULL UNIQUE
        )
      `);
    } catch (error) {
      console.error("Error creating priorities table:", error);
      throw error;
    }
  }

  static async initializePriorities() {
    try {
      await db.execute(`
        INSERT IGNORE INTO priorities (name, level) VALUES 
        ('Low', 1),
        ('Medium', 2),
        ('High', 3),
        ('Urgent', 4)
      `);
      console.log("Priority levels initialized successfully");
    } catch (error) {
      console.error("Error initializing priority levels:", error);
      throw error;
    }
  }

}

module.exports = Priority;
