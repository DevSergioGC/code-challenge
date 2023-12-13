const DataTypes = require('sequelize');
const sequelize = require('../db.js');

const Certificate = sequelize.define(
  'certificados',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    fec_vencimiento: DataTypes.DATE
  },
  {
    timestamps: false
  }
);

module.exports = Certificate;
