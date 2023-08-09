require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Import your configuration
const { User } = require("../models")

const application = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
const whitelist = ['https://innovtask.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

application.use(cors(corsOptions));
application.use(express.json());

// Get the appropriate configuration based on your environment
const env = process.env.NODE_ENV || 'development';

// Signup route here...
application.get("/", async(request, response) => {
  try {
    const users = await User.findAll({
      attributes: ['firstName', 'lastName'],
    }); 
    response.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    response.status(500).json({ success: false, message: "Error fetching users." });
  }
})

application.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
