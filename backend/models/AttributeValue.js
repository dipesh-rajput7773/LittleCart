// models/AttributeValue.js
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
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'attribute_values',
  paranoid: true, // Enables soft deletion
  deletedAt: 'deletedAt',
  timestamps: true,
});

// Define the association: AttributeValue belongs to Attribute
AttributeValue.associate = (models) => {
  // Make sure `Attribute` is properly imported here
  AttributeValue.belongsTo(models.Attribute, {
    foreignKey: 'attribute_id',
    as: 'attribute',  // Alias for accessing the associated Attribute
  });
};

// Export the model
module.exports = AttributeValue;
