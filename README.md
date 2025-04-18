# 📝 TaskMaster - Advanced To-Do List API

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)

TaskMaster is a powerful, feature-rich RESTful API for managing to-do lists and tasks with robust user authentication, role-based permissions, and comprehensive task organization capabilities.

## ✨ Features

### 👤 User Management
- Secure user registration and authentication with JWT
- User profiles with customizable details
- Role-based authorization (admin/regular users)
- Password hashing with bcrypt for top-level security

### 📋 List Management
- Create and organize multiple lists per user
- Detailed list information with timestamps
- Bulk operations for efficient list management

### ✅ Task Management
- Create, update, and organize tasks within lists
- Multiple priority levels (Low, Medium, High, Urgent)
- Task due dates with status tracking
- Task filtering and search capabilities
- Mark tasks as complete/incomplete

### 🔒 Security
- JWT-based authentication
- HTTPS support
- Rate limiting to prevent abuse
- Input validation and sanitization
- Helmet security headers

### 📊 Performance
- Connection pooling for database optimization
- Efficient SQL queries with proper indexing
- Clustering support via PM2

## 🛠️ Technical Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Process Manager**: PM2
- **Security**: Helmet, bcrypt
- **Logging**: Winston with daily rotation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/TaskMaster.git
   cd TaskMaster
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables (use `.env-example` as a template)

4. Generate SSL certificates (if using HTTPS):
   ```bash
   npm run ssl:generate
   ```

5. Start the server:
   ```bash
   # Development mode
   npm start

   # OR using PM2
   npm run pm2:dev
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/current-user` - Get current user info
- `POST /api/auth/logout` - Logout user

### Lists
- `GET /api/lists` - Get all lists for user
- `POST /api/lists` - Create a new list
- `GET /api/lists/:list_id` - Get a specific list
- `PUT /api/lists/:list_id` - Update a list
- `DELETE /api/lists/:list_id` - Delete a list
- `DELETE /api/lists/:list_id/clear` - Remove all tasks from a list
- `DELETE /api/lists` - Delete all lists for user
- `DELETE /api/lists/clear` - Clear all tasks from all lists

### Tasks
- `GET /api/tasks` - Get all tasks for user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:task_id` - Get a specific task
- `PUT /api/tasks/:task_id` - Update a task
- `DELETE /api/tasks/:task_id` - Delete a task
- `PUT /api/tasks/:task_id/status` - Update task completion status

### Priorities
- `GET /api/priorities` - Get all priority levels
- `GET /api/priorities/id/:priority_id` - Get priority by ID
- `GET /api/priorities/level/:level` - Get priority by level

### Admin Routes (admin role required)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user by ID
- `POST /api/admin/users` - Create a new user
- `PUT /api/admin/users/:id` - Update a user
- `DELETE /api/admin/users/:id` - Delete a user

## 📦 Production Deployment

For production environments:

```bash
# Start PM2 in production mode
npm run pm2:start

# Monitor logs
npm run pm2:logs

# Monitor processes
npm run pm2:monit

# Check status
npm run pm2:status
```

## 🧪 Development

```bash
# Restart server on changes
npm start

# Generate SSL certificates
npm run ssl:generate
```

## 🔐 Security Considerations

- Always change default admin credentials in production
- Use environment variables for sensitive information
- Enable HTTPS in production
- Configure proper CORS settings for your frontend
- Set appropriate rate limits based on your application needs

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

Made with ❤️ by [Fayyaz AK]
