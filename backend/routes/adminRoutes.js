// const express = require('express');
// const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin');
// const router = express.Router();

// // Admin Registration
// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if admin already exists
//     const adminExists = await Admin.findOne({ username });

//     if (adminExists) {
//       return res.status(400).json({ message: 'Admin already exists' });
//     }

//     // Create a new admin
//     const admin = new Admin({
//       username,
//       password,
//     });

//     await admin.save();

//     // Create JWT token
//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.status(201).json({ message: 'Admin registered successfully', token, admin });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering admin', error: error.message });
//   }
// });

// // Admin Login
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ username });

//     if (!admin || !(await admin.comparePassword(password))) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.status(200).json({ message: 'Admin login successful', token, admin });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in as admin', error: error.message });
//   }
// });

// module.exports = router;
