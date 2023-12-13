const DataTypes = require('sequelize');
const sequelize = require('../db.js');

const ClientVSCertificate = sequelize.define('cliente_certificado', {
  id_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clientes',
      key: 'id'
    }
  },
  id_certificado: {
    type: DataTypes.INTEGER,
    references: {
      model: 'certificados',
      key: 'id'
    }
  }
});

module.exports = ClientVSCertificate;
