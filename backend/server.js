// server.js

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Import bcrypt

// Load environment variables from .env file
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clgproject', {
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

// Import Models
const User = require('./models/User');
const Admin = require('./models/admin');
const Booking = require('./models/Booking');

// Middleware to handle JSON data and enable CORS
// (Already set up above, so no need to duplicate)

// ----------------------------------
// User Routes
// ----------------------------------

// Register user
app.post('/api/auth/register', async (req, res) => {
  const { firstName, lastName, username, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

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
    console.error('Error registering user:', error.message);
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
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Fetch all users (for admin use)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password from response for security
    res.status(200).json(users);
  } catch (error) {
    // console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// ----------------------------------
// Booking Routes
// ----------------------------------

// Create a booking
app.post('/api/bookings', async (req, res) => {
  const { username, email, pickupLocation, dropLocation, goodsType, weight, date, time, price } = req.body;

  try {
    const booking = new Booking({
      username,
      email,
      pickupLocation,
      dropLocation,
      goodsType,
      weight,
      date,
      time,
      price,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error.message);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Get all bookings (for admin use)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// ----------------------------------
// Admin Routes
// ----------------------------------
// Admin Registration Route
app.post('/api/admin/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin Login Route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login successful', token, admin });
  } catch (error) {
    console.error('Error logging in admin:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// ----------------------------------
// Start the Server
// ----------------------------------

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
