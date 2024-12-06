const {DataTypes} = require('sequelize')
const sequelize = require("../_db");
const Category = require('./category')
const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,  
          },
          description: {
            type: DataTypes.STRING,
            allowNull: true,  
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,  
            validate: {
              isFloat: true, 
              min: 0,  
            },
          },
          categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,  
            references: {
              model: Category,  
              key: 'id',  
            },
          },  
},
 {
    timestamps: true,
  })

// Define associations
Product.belongsTo(Category, { foreignKey: 'categoryId' });  

module.exports = Product;