# 📝 TaskMaster - Advanced To-Do List API

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)
![Redis](https://img.shields.io/badge/Redis-6.0+-red.svg)

TaskMaster is a powerful, feature-rich RESTful API for managing to-do lists and tasks with robust user authentication, role-based permissions, and comprehensive task organization capabilities.

## ⭐ What Makes TaskMaster Different

Unlike standard to-do list applications, TaskMaster offers:

- **Enterprise-grade security** with JWT authentication, bcrypt password hashing, and role-based access control
- **Multi-level organization** with lists and tasks hierarchy for better organization
- **Priority management system** with customizable priority levels
- **Advanced caching** with Redis for optimized performance and scalability
- **Admin dashboard capabilities** for team management and oversight
- **Comprehensive API** that can support multiple frontend clients (web, mobile, desktop)
- **Performance optimizations** with database connection pooling and proper indexing
- **Scalable architecture** with clustering support via PM2
- **Advanced filtering** for tasks based on due dates, completion status, and priorities
- **Bulk operations** for efficient task and list management
- **Advanced logging** with daily log rotation for better debugging and monitoring
- **Full HTTPS support** with custom SSL certificate configuration
- **Rate limiting** to prevent API abuse and ensure system stability
- **Separate development and production environments** with environment-specific configurations

## ✨ Features

### 👤 User Management

- Secure user registration and authentication with JWT
- User profiles with customizable details
- Role-based authorization (admin/regular users)
- Password hashing with bcrypt for top-level security
- Profile update functionality for users

### 📋 List Management

- Create and organize multiple lists per user
- Detailed list information with timestamps
- Bulk operations for efficient list management
- List statistics showing total tasks and pending tasks
- Automatic timestamp updates when tasks are modified

### ✅ Task Management

- Create, update, and organize tasks within lists
- Multiple priority levels (Low, Medium, High, Urgent)
- Task due dates with status tracking
- Task filtering and search capabilities
- Mark tasks as complete/incomplete
- Task modification with automated list update timestamps
- Due date filtering for overdue and today's tasks

### 🛡️ Security

- JWT-based authentication with secure cookie options
- HTTPS support with automatic HTTP to HTTPS redirection
- Rate limiting to prevent abuse and brute force attacks
- Input validation and sanitization against injection attacks
- Helmet security headers to protect against common vulnerabilities
- CORS protection with configurable allowed origins, methods, and headers

### 📊 Performance

- **Redis caching layer** with intelligent invalidation strategies
- Connection pooling for database optimization
- Efficient SQL queries with proper indexing
- Clustering support via PM2
- Optimized database schema with appropriate relationships
- Transaction support for data integrity

### 📝 Logging

- Comprehensive logging with Winston
- Daily log rotation to prevent log file bloat
- Different log levels for development and production
- Separate error and combined logs
- Console logging with colorized output

## 🧠 Caching Strategy

TaskMaster implements a sophisticated Redis caching strategy:

### Cache Implementation

- **Cache-Aside Pattern**: Check cache first, fall back to database
- **Time-Based Expiration**: Configurable TTL for all cached items
- **Strategic Invalidation**: Smart cache clearing when data is modified
- **Hierarchical Key Structure**: Organized key naming scheme for efficient invalidation
- **Namespace Prefixing**: Prevents key collisions with other applications

### Key Generators

Structured naming convention for cache keys:

- `users:${userId}` - Single user data
- `users:${userId}:lists` - All lists for a user
- `users:${userId}:lists:${listId}` - Specific list data
- `users:${userId}:tasks` - All tasks for a user
- `priorities` - All priority levels

### Cache Operations

- Automatic cache invalidation on writes
- Pattern-based invalidation for related entities
- Error-resistant caching with graceful fallbacks
- Optional cache clearing on application startup

## 🛠️ Technical Stack

- **Backend**: Node.js, Express.js 5.x
- **Database**: MySQL 8+
- **Caching**: Redis 6+
- **Authentication**: JWT (JSON Web Tokens)
- **Process Manager**: PM2
- **Security**: Helmet, bcrypt, rate-limiting
- **Logging**: Winston with daily rotation
- **Development**: Nodemon for hot-reloading

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- Redis (v6.0 or higher)
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
   # Development mode with hot reloading
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

### User Management

- `PUT /api/user/update-profile` - Update user profile

### Lists

- `GET /api/lists` - Get all lists for user (query param: include_tasks)
- `POST /api/lists` - Create a new list
- `GET /api/lists/:list_id` - Get a specific list (query param: include_tasks)
- `PUT /api/lists/:list_id` - Update a list
- `DELETE /api/lists/:list_id` - Delete a list
- `DELETE /api/lists/:list_id/clear` - Remove all tasks from a list
- `DELETE /api/lists` - Delete all lists for user
- `DELETE /api/lists/clear` - Clear all tasks from all lists

### Tasks

- `GET /api/tasks` - Get all tasks for user (query param: completed)
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
- `POST /api/admin/priorities` - Create a new priority
- `PUT /api/admin/priorities/:id` - Update a priority
- `DELETE /api/admin/priorities/:id` - Delete a priority

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
# Restart server on changes using Nodemon
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
- Regularly update dependencies to mitigate security vulnerabilities

## 🚀 Performance Optimization

- Redis caching for frequently accessed data
- Database connection pooling
- Proper SQL indexing
- PM2 clustering for load distribution
- Rate limiting to prevent overload

## 🧩 Future Improvements

- Add unit and integration testing
- Implement Swagger/OpenAPI documentation
- Consider TypeScript for type safety
- Add Docker configuration for easier deployment
- Implement Continuous Integration/Deployment pipelines

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

Made with ❤️ by Fayyaz AK
