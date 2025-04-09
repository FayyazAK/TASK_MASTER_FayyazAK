const User = require('../models/User');
const { validateEmail, validatePassword, hashPassword } = require('../utils/utils');

// Response helpers
const successResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({ status: "success", data });
};

const errorResponse = (res, message, statusCode = 400) => {
  res.status(statusCode).json({ status: "error", message });
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    successResponse(res, users);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// Get single user
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return errorResponse(res, 'User ID is required');
    }

    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Validate required fields
    if (!firstName || !username || !email || !password) {
      return errorResponse(res, 'First name, username, email and password are required');
    }

    // Validate email format
    if (!validateEmail(email)) {
      return errorResponse(res, 'Invalid email format');
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return errorResponse(res, 'Password must be at least 8 characters long');
    }

    // Check for existing username
    const existingUsername = await User.findByUsername(username.toLowerCase());
    if (existingUsername) {
      return errorResponse(res, 'Username is already taken');
    }

    // Check for existing email
    const existingEmail = await User.findByEmail(email.toLowerCase());
    if (existingEmail) {
      return errorResponse(res, 'Email is already registered');
    }

    // Create new user
    const hashedPassword = await hashPassword(password);
    const userId = await User.create({
      firstName,
      lastName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword
    });

    const newUser = await User.findById(userId);
    successResponse(res, newUser, 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, username, email, password } = req.body;

    if (!userId) {
      return errorResponse(res, 'User ID is required');
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return errorResponse(res, 'User not found', 404);
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      return errorResponse(res, 'Invalid email format');
    }

    // Validate password if provided
    if (password && !validatePassword(password)) {
      return errorResponse(res, 'Password must be at least 8 characters long');
    }

    // Check for duplicate username
    if (username && username.toLowerCase() !== existingUser.username) {
      const existingUsername = await User.findByUsername(username.toLowerCase());
      if (existingUsername) {
        return errorResponse(res, 'Username is already taken');
      }
    }

    // Check for duplicate email
    if (email && email.toLowerCase() !== existingUser.email) {
      const existingEmail = await User.findByEmail(email.toLowerCase());
      if (existingEmail) {
        return errorResponse(res, 'Email is already registered');
      }
    }

    // Prepare update data
    const updateData = {
      firstName: firstName || existingUser.first_name,
      lastName: lastName || existingUser.last_name,
      username: username ? username.toLowerCase() : existingUser.username,
      email: email ? email.toLowerCase() : existingUser.email,
      password: password ? await hashPassword(password) : existingUser.password
    };

    // Update user
    await User.update(userId, updateData);
    const updatedUser = await User.findById(userId);
    successResponse(res, updatedUser);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return errorResponse(res, 'User ID is required');
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return errorResponse(res, 'User not found', 404);
    }

    await User.delete(userId);
    successResponse(res, { message: 'User deleted successfully' });
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}; 