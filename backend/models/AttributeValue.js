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
  attribute_id: {
    type: DataTypes.INTEGER,
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
  tableName: 'attribute_values',
  paranoid: true,
  deletedAt: 'deletedAt',
  timestamps: true,
});

AttributeValue.associate = (models) => {

  AttributeValue.belongsTo(Attribute, {
    foreignKey: 'attribute_id',
    as: 'attribute', // Alias for accessing the associated Attribute
  });
};

module.exports = AttributeValue;
