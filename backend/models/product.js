// models/product.js
const { DataTypes } = require('sequelize');
const Category = require('./Category')
const ProductAttributes = require('./ProductAttributes')
const Attribute = require('./Attribute')
const sequelize = require('../_db'); 

    const Product = sequelize.define('Product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
   
     
  
module.exports = Product
  