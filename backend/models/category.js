const { DataTypes } = require('sequelize');
const sequelize = require('../_db');

// Define the Category model
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  tableName: 'categories' // Explicitly setting table name
});
module.exports = Category;
