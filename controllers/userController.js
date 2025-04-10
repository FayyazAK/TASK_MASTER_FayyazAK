const User = require('../models/User');
const { validateEmail, validatePassword, hashPassword } = require('../utils/utils');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // Remove sensitive data from each user
    const sanitizedUsers = users.map(user => {
      const { password, ...sanitizedUser } = user;
      return sanitizedUser;
    });
    res.success(sanitizedUsers);
  } catch (error) {
    res.error(error.message, 500);
  }
};

// Get single user
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.error('User ID is required');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.error('User not found', 404);
    }
    // Remove sensitive data
    const { password, ...sanitizedUser } = user;
    res.success(sanitizedUser);
  } catch (error) {
    res.error(error.message, 500);
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Validate required fields
    if (!firstName || !username || !email || !password) {
      return res.error('First name, username, email and password are required');
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.error('Invalid email format');
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return res.error('Password must be at least 8 characters long');
    }

    // Check for existing username
    const existingUsername = await User.findByUsername(username.toLowerCase());
    if (existingUsername) {
      return res.error('Username is already taken');
    }

    // Check for existing email
    const existingEmail = await User.findByEmail(email.toLowerCase());
    if (existingEmail) {
      return res.error('Email is already registered');
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
    // Remove sensitive data
    const { password: userPassword, ...sanitizedUser } = newUser;
    res.success(sanitizedUser, 201);
  } catch (error) {
    res.error(error.message);
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, username, email, password } = req.body;

    if (!userId) {
      return res.error('User ID is required');
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.error('User not found', 404);
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      return res.error('Invalid email format');
    }

    // Validate password if provided
    if (password && !validatePassword(password)) {
      return res.error('Password must be at least 8 characters long');
    }

    // Check for duplicate username
    if (username && username.toLowerCase() !== existingUser.username) {
      const existingUsername = await User.findByUsername(username.toLowerCase());
      if (existingUsername) {
        return res.error('Username is already taken');
      }
    }

    // Check for duplicate email
    if (email && email.toLowerCase() !== existingUser.email) {
      const existingEmail = await User.findByEmail(email.toLowerCase());
      if (existingEmail) {
        return res.error('Email is already registered');
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
    // Remove sensitive data
    const { password: userPassword, ...sanitizedUser } = updatedUser;
    res.success(sanitizedUser);
  } catch (error) {
    res.error(error.message);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.error('User ID is required');
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.error('User not found', 404);
    }

    await User.delete(userId);
    res.success({ message: 'User deleted successfully' });
  } catch (error) {
    res.error(error.message, 500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}; 