"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, _DataTypes) => {
  class Subtask extends Model {
    static associate(models) {
      // Association to Task
      this.belongsTo(models.Task, { foreignKey: "taskId", as: "task" });
    }
  }

  Subtask.init(
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
      status: {
        type: DataTypes.ENUM("Incomplete", "Complete"),
        defaultValue: "Incomplete",
      },
      taskId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Tasks",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Subtask",
    },
  );

  return Subtask;
};
