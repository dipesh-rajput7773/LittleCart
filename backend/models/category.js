const { DataTypes } = require('sequelize');
const sequelize = require('../_db');
const slugify = require('slugify');  // A useful package to generate slugs

// Define the Category model
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      len: [3, 255], 
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,  // Slug pattern
    }
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories', 
      key: 'id'
    },
    onDelete: 'CASCADE', 
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'archived'),
    defaultValue: 'active', 
  },
  order: {
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
}, {
  tableName: 'categories', 
  timestamps: true, 
  paranoid: true, 
  indexes: [
    {
      unique: true,
      fields: ['slug'],
    },
  ],
});

// Add hook to auto-generate the slug if it's not provided
Category.beforeCreate((category, options) => {
  if (!category.slug) {
    category.slug = slugify(category.name, { lower: true, strict: true }); // Auto-generate slug from name
  }
});

Category.beforeUpdate((category, options) => {
  if (!category.slug && category.name) {
    category.slug = slugify(category.name, { lower: true, strict: true }); // Auto-update slug if name changes
  }
});

Category.associate = (models) => {
  // One-to-many relationship with Product
  Category.hasMany(models.Product, {
    foreignKey: 'categoryId',
    as: 'products', 
  });

  // Self-association for hierarchical categories
  Category.hasMany(Category, {
    foreignKey: 'parentId',
    as: 'subcategories',
  });
};

module.exports = Category;
