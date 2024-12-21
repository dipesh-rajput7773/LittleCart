const { DataTypes } = require('sequelize');
const sequelize = require('../_db');

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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
},{
  tableName: 'attributes' // Explicitly setting table name
});

module.exports = Attribute;
