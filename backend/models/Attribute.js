// models/Attribute.js
const { DataTypes } = require('sequelize');
const sequelize = require('../_db');
const AttributeValue = require('./AttributeValue');
const Product = require('./Product');
const ProductAttributes = require('./ProductAttributes');

// Define the Attribute model
const Attribute = sequelize.define('Attribute', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});




// Return the model
module.exports = Attribute;
