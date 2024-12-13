const { DataTypes } = require('sequelize');
const sequelize = require('../_db');

// Define the AttributeValue model
const AttributeValue = sequelize.define('AttributeValue', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});




module.exports = AttributeValue;
