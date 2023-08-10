"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, _DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Task, {
        foreignKey: "userId",
        as: "tasks",
        onDelete: "CASCADE",
      });
    }

    // Check if an unencrypted password entered by the user can be compared to the hashed password stored in our database
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          this.setDataValue("password", bcrypt.hashSync(value, salt));
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          user.id = uuidv4();
        },
      },
    },
  );

  return User;
};
