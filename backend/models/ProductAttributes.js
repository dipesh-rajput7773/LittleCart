// models/productAttributes.js
const { DataTypes } = require('sequelize');
const sequelize = require('../_db'); 


    const ProductAttributes = sequelize.define('ProductAttributes', {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      attributeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Attributes',
          key: 'id',
        },
      },
      attributeValueId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'AttributeValues',
          key: 'id',
        },
      },
    });
  
module.exports = ProductAttributes;
  