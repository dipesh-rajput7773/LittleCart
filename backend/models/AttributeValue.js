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
},{
  tableName: 'attributevalues' // Explicitly setting table name
});




module.exports = AttributeValue;
