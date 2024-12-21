const { DataTypes } = require("sequelize");
const sequelize = require("../_db");

const ProductAttribute = sequelize.define(
  "ProductAttribute",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  },{
    tableName: 'productattributes' 
  }
);

module.exports = ProductAttribute;
