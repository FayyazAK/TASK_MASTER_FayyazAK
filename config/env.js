require("dotenv").config();
// Make sure to add the .env file to the root of the project
// and add the variables to the .env file
// this file is used to get the variables from the .env file
// fix type errors, fallback to default values, etc.
// and use them in the project
module.exports = {
  // NODE ENV
  NODE_ENV: process.env.NODE_ENV || "development",

  // SERVER CONFIG
  PORT: process.env.PORT || 8000,

  // CORS CONFIG
  CORS: {
    ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS
      ? process.env.CORS_ALLOWED_ORIGINS.split(",")
      : ["http://localhost:3000"],
    ALLOWED_METHODS: process.env.CORS_ALLOWED_METHODS
      ? process.env.CORS_ALLOWED_METHODS.split(",")
      : ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    ALLOWED_HEADERS: process.env.CORS_ALLOWED_HEADERS
      ? process.env.CORS_ALLOWED_HEADERS.split(",")
      : ["Content-Type", "Authorization"],
  },

  // JWT CONFIG
  JWT_SECRET: process.env.JWT_SECRET || "todo-list@fayyaz-ak",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  COOKIE_EXPIRES_IN: Number(process.env.COOKIE_EXPIRES_IN) || 86400000,

  // DATABASE CONFIG
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "todo_list",

  // ADMIN CREDENTIALS
  ADMIN_FIRST_NAME: process.env.ADMIN_FIRST_NAME || "Admin",
  ADMIN_LAST_NAME: process.env.ADMIN_LAST_NAME || "User",
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || "admin",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@example.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin",

  //TO DO LIST
  LIST_TITLE_MIN_LENGTH: 3,
  LIST_TITLE_MAX_LENGTH: 150,
  LIST_DESCRIPTION_MAX_LENGTH: 500,
  TASK_TITLE_MIN_LENGTH: 3,
  TASK_TITLE_MAX_LENGTH: 150,
  TASK_DESCRIPTION_MAX_LENGTH: 500,

  //SSL CONFIG
  SSL: {
    enabled: process.env.SSL_ENABLED === "true",
    key: process.env.SSL_KEY_PATH || "../ssl/key.pem",
    cert: process.env.SSL_CERT_PATH || "../ssl/cert.pem",
    port: process.env.SSL_PORT || 443,
  },

  //RATE LIMITING
  RATE_LIMIT: {
    WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    MAX: Number(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  },
};
