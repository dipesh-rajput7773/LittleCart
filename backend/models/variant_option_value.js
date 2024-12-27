const { DataTypes } = require('sequelize');
const sequelize = require('../_db');

// Define the VariantOptionValue model
const VariantOptionValue = sequelize.define('VariantOptionValue', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attribute_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attribute_value_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  variant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1, // Default status, could mean 'active'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically sets creation time
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically sets update time
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true, // Soft delete column
  },
}, {
  tableName: 'variant_option_values', // Explicitly set table name
  paranoid: true, // Enable soft delete (won't physically remove records)
  deletedAt: 'deletedAt', // Name of the column for soft delete
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Define associations
VariantOptionValue.associate = (models) => {
  // VariantOptionValue belongs to AttributeValue
  VariantOptionValue.belongsTo(models.AttributeValue, {
    foreignKey: 'attribute_value_id',
    targetKey: 'id', // Link to the 'id' of AttributeValue
    as: 'attribute_value', // Alias for accessing the associated AttributeValue
  });
};

module.exports = VariantOptionValue;
