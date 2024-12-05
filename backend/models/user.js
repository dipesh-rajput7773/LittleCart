const { DataTypes } = require('sequelize');
const sequelize = require('../_db'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  email: {
    type: DataTypes.STRING,
    unique: true,    
    allowNull: false,  // Email is required
    validate: {
      isEmail: true,   // Validate email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,  // Password is required
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer',  
  },
}, {
  timestamps: true,  
});

// Export the User model
module.exports = User;
