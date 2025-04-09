const db = require("../config/database");

class User {
  static async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          user_id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50),
          username VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    } catch (error) {
      console.error("Error creating users table:", error);
      throw error;
    }
  }

  static async create({ firstName, lastName, username, email, password }) {
    const [result] = await db.execute(
      "INSERT INTO users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName || null, username, email, password]
    );
    return result.insertId;
  }

  static async find() {
    const [rows] = await db.execute("SELECT * FROM users");
    return rows;
  }

  static async findByUsername(username) {
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  static async findById(userId) {
    const [rows] = await db.execute("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ]);
    return rows[0];
  }

  static async update(userId, { username, email, password }) {
    await db.execute(
      "UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?",
      [username, email, password, userId]
    );
  }

  static async delete(userId) {
    await db.execute("DELETE FROM users WHERE user_id = ?", [userId]);
  }
}

module.exports = User;
