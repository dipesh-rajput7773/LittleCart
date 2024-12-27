"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../_db");
const Category = require("./Category");
const ProductImage = require("./product_image");
const ProductParent = require("./product_parent");

const Product = sequelize.define(
  "Product",
  {
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "products",
        key: "id",
      },
    },
    sku_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    category_ids: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tax_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tax_rate: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    special_price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    featured: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    meta_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_keys: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attribute_ids: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
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
    modelName: "Product",
    tableName: "products",
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

// Define associations in the model
Product.associate = function (models) {
  // Product.hasOne(ProductImage, {
  //   foreignKey: "product_id",
  //   as: "product_image",
  // });
  Product.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category",
  });
  Product.belongsTo(ProductParent, {
    foreignKey: "parent_id",
    as: "parent",
  });
  Product.hasMany(ProductImage, {
    foreignKey: "product_id",
    as: "product_images",
  });
};

module.exports = Product;
