/**
 * SQL Queries for Task model
 */

module.exports = {
  // Table creation query
  CREATE_TABLE: `
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
  `,

  CREATE_TASK: `
    INSERT INTO tasks (list_id, title, description, priority_id, due_date)
    VALUES (?, ?, ?, ?, ?)
  `,

  GET_ALL_TASKS: `
    SELECT * FROM tasks WHERE list_id IN (
      SELECT list_id FROM lists WHERE user_id = ?
    )
  `,

  GET_TASK_BY_ID: `
    SELECT * FROM tasks WHERE task_id = ? AND list_id = ? AND list_id IN (
      SELECT list_id FROM lists WHERE user_id = ?
    )
  `,

  GET_TASKS_BY_LIST_ID: `
    SELECT * FROM tasks WHERE list_id = ? AND list_id IN (
      SELECT list_id FROM lists WHERE user_id = ?
    )
  `,

  DELETE_TASK: `
    DELETE FROM tasks WHERE task_id = ? AND list_id = ? AND list_id IN (
      SELECT list_id FROM lists WHERE user_id = ?
    )
  `,

  UPDATE_TASK_STATUS: `
    UPDATE tasks SET is_completed = ? WHERE task_id = ? AND list_id = ? AND list_id IN (
      SELECT list_id FROM lists WHERE user_id = ?
    )
  `,

  UPDATE_TASK: `
    UPDATE tasks SET title = ?, description = ?, priority_id = ?, due_date = ? WHERE task_id = ? AND list_id = ? AND list_id IN (
      SELECT list_id FROM lists WHERE user_id = ?
    )
  `,

  UPDATE_LIST_TIMESTAMP: `
    UPDATE lists SET updated_at = CURRENT_TIMESTAMP WHERE list_id = ? AND user_id = ?
  `,
};
