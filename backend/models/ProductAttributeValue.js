const { DataTypes } = require("sequelize");
const sequelize = require("../_db");

const ProductAttributeValue = sequelize.define(
  "ProductAttributeValue",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ProductAttributeValue;
