// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Correct connection string without PORT specification
    await mongoose.connect('mongodb://localhost:27017/Clgproject', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to Clgproject');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
