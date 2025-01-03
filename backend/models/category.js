"use strict";
const { DataTypes } = require('sequelize');
const sequelize = require('../_db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 255],
    },
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  short_content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  featured: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'archived'),
    defaultValue: 'active',
  },
  meta_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meta_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meta_description: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: 'categories',
  paranoid: true,
  deletedAt: 'deletedAt',
  timestamps: true,
  indexes: [
    {
      name: 'name_unique',
      unique: true,
      fields: ['name'],
      length: { name: 191 },  // Limit index to first 191 characters of 'name'
    },
    {
      name: 'slug_unique',
      unique: true,
      fields: ['slug'],
      length: { slug: 191 },  // Limit index to first 191 characters of 'slug'
    }
  ],
});

// Define associations
Category.associate = (models) => {
  Category.belongsTo(models.Category, {
    foreignKey: 'parent_id',
    as: 'parent',  // Alias for the parent category
  });

  Category.hasMany(models.Category, {
    foreignKey: 'parent_id',
    as: 'sub_categories',  // Alias for the sub-categories
  });
};

module.exports = Category;
