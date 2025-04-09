const db = require("../config/database");

class List {
  static async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS lists (
          list_id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          title VARCHAR(100) NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
        )
      `);
    } catch (error) {
      console.error("Error creating lists table:", error);
      throw error;
    }
  }

}

module.exports = List;
