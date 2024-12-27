const { DataTypes } = require('sequelize');
const sequelize = require('../_db');

// Define the product_image_temp model
const ProductImageTemp = sequelize.define('product_image_temp', {
  form_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  attribute_ids: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'product_image_temp',
  timestamps: true, // This will automatically add createdAt and updatedAt fields
  // paranoid: true // Uncomment if you want to enable soft deletes (which require a deletedAt field)
});

// Associations can be defined here if necessary
ProductImageTemp.associate = (models) => {
  // Define associations, if required
  // Example:
  // ProductImageTemp.belongsTo(models.Product, { foreignKey: 'product_id' });
};

module.exports = ProductImageTemp;
