const DataTypes = require('sequelize');
const sequelize = require('../db.js');

const Client = sequelize.define(
  'clientes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING
  },
  {
    timestamps: false
  }
);

module.exports = Client;
