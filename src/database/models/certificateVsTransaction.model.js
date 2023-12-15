const DataTypes = require('sequelize');
const sequelize = require('../db.js');

const CertificateVsTransaction = sequelize.define(
  'certificado_vs_transaccion',
  {
    id_tipo_transaccion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_certificado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = CertificateVsTransaction;
