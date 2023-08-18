"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, _DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // Define associations here, if any. For example:
      // this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      priority: {
        type: DataTypes.ENUM("High", "Medium", "Low"),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Incomplete", "Complete"),
        defaultValue: "Incomplete",
      },
    },
    {
      sequelize,
      modelName: "Task",
    },
  );

  return Task;
};
