const { DataTypes } = require("sequelize");
const sequelize = require("../_db");
const Attribute = require("./Attribute");

const AttributeValue = sequelize.define("AttributeValue", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// 

module.exports = AttributeValue;
