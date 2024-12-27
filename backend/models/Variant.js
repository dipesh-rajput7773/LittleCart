const { DataTypes } = require('sequelize');
const sequelize = require('../_db');


const Variant = sequelize.define('Variant', {
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
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, 
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0, 
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
  tableName: 'variants', 
  paranoid: true,
  deletedAt: 'deletedAt', 
  timestamps: true, 
});


Variant.associate = (models) => {

  Variant.hasMany(models.VariantOptionValue, {
    foreignKey: 'variant_id',
    as: 'variant_option_values', 
  });

  // Variant belongs to attribute
  Variant.belongsTo(models.Attribute, {
    foreignKey: 'attribute_id',
    as: 'attribute', 
  });
};

module.exports = Variant;
