// server.js

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Clgproject', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors()); // Use CORS middleware

// User model
const User = require('./models/User');

// Register user
app.post('/api/auth/register', async (req, res) => {
  const { firstName, lastName, username, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Set the port to the value specified in the .env file or default to 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
