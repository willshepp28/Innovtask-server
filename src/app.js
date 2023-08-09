require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Import your configuration

const application = express();
const PORT = process.env.PORT || 5001;

application.use(cors());
application.use(express.json());

// Get the appropriate configuration based on your environment
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Create a Sequelize instance
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

// Test the database connection and create it if it doesn't exist
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(async (error) => {
    if (error.original.code === '3D000') {
      console.log('Database does not exist. Creating...');
      await sequelize.query(`CREATE DATABASE "${dbConfig.database}"`);
      console.log('Database created successfully.');
    } else {
      console.error('Unable to connect to the database:', error);
    }
  });

// Signup route here...
application.get("/", (request, response) => {
  response.json({ message: "Successful"})
})

application.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync();
});
