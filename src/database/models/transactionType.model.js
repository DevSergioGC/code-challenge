const DataTypes = require('sequelize');
const sequelize = require('../db.js');

const TransactionType = sequelize.define(
  'tipo_transaccion',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo_transaccion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = TransactionType;
