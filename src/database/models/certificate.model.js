const DataTypes = require('sequelize');
const sequelize = require('../db.js');
const Client = require('./client.model.js');

const Certificate = sequelize.define(
  'certificados',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tasa: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    monto: {
      type: DataTypes.NUMBER,
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
    timestamps: false
  }
);

Certificate.belongsTo(Client, {
  foreignKey: 'id_cliente',
  as: 'cliente'
});

module.exports = Certificate;
