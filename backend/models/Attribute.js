// models/Attribute.js
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
  tableName: 'attributes',
  paranoid: true,
  deletedAt: 'deletedAt',
  timestamps: true,
});


// Define the association: AttributeValue belongs to Attribute
Attribute.associate = (models) => {
  // Make sure `Attribute` is properly imported here
  Attribute.hasMany(models.AttributeValue, {
    foreignKey: 'attribute_id',
    as: 'attribute_values',
  });
};



// Export the model for use in other files
module.exports = Attribute;
