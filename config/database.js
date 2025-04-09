const mysql = require('mysql2');
require('dotenv').config();

// MYSQL DATABASE CONNECTION POOL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'todo_list',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// MYSQL DATABASE CONNECTION POOL PROMISE
const promisePool = pool.promise();

// TEST THE DATABASE CONNECTION
promisePool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database!');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

module.exports = promisePool;
