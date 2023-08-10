"use strict";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Sample user data
    const users = [
      {
        id: uuidv4(),
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: bcrypt.hashSync("password", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        password: bcrypt.hashSync("password", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // ... Add the rest of the users similarly
    ];

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
