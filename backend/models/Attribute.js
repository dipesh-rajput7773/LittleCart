const { DataTypes } = require('sequelize');
const sequelize = require('../_db');
const AttributeValue = require('./AttributeValue');

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
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
}, {
  tableName: 'attributes', 
  paranoid: true,
  deletedAt: 'deletedAt', 
  timestamps: true,
});

// Define associations
Attribute.associate = (models) => {
  // Attribute has many AttributeValue
  Attribute.hasMany(AttributeValue, {
    foreignKey: 'attribute_id',
    as: 'attribute_values', // Alias for accessing associated AttributeValues
  });
};

module.exports = Attribute;
