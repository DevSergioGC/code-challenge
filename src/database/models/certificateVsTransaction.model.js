const DataTypes = require('sequelize');
const sequelize = require('../db.js');

const CertificateVsTransaction = sequelize.define(
  'certificado_vs_transaccion',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    constraints: [
      {
        unique: false,
        fields: ['id_certificado', 'id_tipo_transaccion']
      }
    ]
  }
);

module.exports = CertificateVsTransaction;
