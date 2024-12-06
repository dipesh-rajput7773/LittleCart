const { DataTypes } = require("sequelize");
const sequelize = require("../_db");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Category name is required
      unique: true, // Category name should be unique
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Category;