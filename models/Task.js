const db = require("../config/database");

class Task {
  static async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS tasks (
          task_id INT AUTO_INCREMENT PRIMARY KEY,
          list_id INT NOT NULL,
          title VARCHAR(150) NOT NULL,
          description TEXT,
          priority_id INT,
          due_date DATETIME,
          is_completed BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (list_id) REFERENCES lists(list_id) ON DELETE CASCADE,
          FOREIGN KEY (priority_id) REFERENCES priorities(priority_id) ON DELETE SET NULL
        )
      `);
    } catch (error) {
      console.error("Error creating tasks table:", error);
      throw error;
    }
  }

}

module.exports = Task;
