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
    tasa: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    monto_inicial: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    fec_vencimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fec_creado: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Certificate;
