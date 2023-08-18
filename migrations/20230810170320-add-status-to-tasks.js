"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Tasks", "status", {
        type: Sequelize.ENUM("Incomplete", "Complete"),
        defaultValue: "Incomplete",
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Tasks", "status"),
      queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_Tasks_status";',
      );
  },
};
