const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
module.exports = sequelize;
