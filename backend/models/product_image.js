"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require('../_db'); 
const ProductImage = sequelize.define(
  'ProductImage',
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ProductImage",
    tableName: "product_images",
    paranoid: true, 
    deletedAt: "deletedAt",  
  }
);



module.exports = ProductImage;
