require('dotenv').config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, "", {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
});


sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports =  sequelize;
