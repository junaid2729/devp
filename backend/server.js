const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const auths = require('./routes/auths');
const cors = require('cors'); // Ensure this is included

dotenv.config(); // Load environment variables from .env file

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware

// Use authentication routes
app.use('/api/auth', auths);

// Set the port to the value specified in the .env file or default to 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
