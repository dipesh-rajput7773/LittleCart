"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require('../_db'); 
const Variant = require('./Variant'); 

const ProductParent = sequelize.define(
  'ProductParent',
  {
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "SKU must be unique."
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    complete_add: {
      type: DataTypes.ENUM('Y', 'N'),
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
    modelName: "ProductParent",
    tableName: "product_parents",
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

// Define associations
ProductParent.associate = function (models) {
  ProductParent.hasMany(models.Variant, { foreignKey: "product_id", as: "variant" });
};

module.exports = ProductParent;
