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
  },{
    tableName: 'productattributevalues' 
  }
);

module.exports = ProductAttributeValue;
