const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
    });

    // Respond with success message and user data
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    // Respond with error message
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists and password matches
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with success message, token, and user data
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    // Respond with error message
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;
