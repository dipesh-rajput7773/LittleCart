const { DataTypes } = require('sequelize');
const sequelize = require('../_db'); // assuming you have a sequelize instance at this path

// Define the Stock model using sequelize.define
const Stock = sequelize.define(
  'Stock',
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // assuming product_id is required
    },
    variant: {
      type: DataTypes.INTEGER,
      allowNull: false, // assuming variant is required
    },
    variant_option_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // variant_option_id can be null
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false, // assuming stock is required
    },
    sold_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // assuming sold_stock starts from 0
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
      allowNull: true, // allowing null for soft deletes
    },
  },
  {
    tableName: 'stocks', // optional, defines the table name
    paranoid: true, // Enables soft deletion
    deletedAt: 'deletedAt', // column for soft deletion
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Define associations (if any)
Stock.associate = (models) => {
  // Example of an association if needed later
  // Stock.belongsTo(models.Attribute, { foreignKey: 'attribute_id' });
};

module.exports = Stock;
