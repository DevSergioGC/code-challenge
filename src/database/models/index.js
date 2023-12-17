const Certificate = require('./certificate.model');
const Client = require('./client.model');
const TransactionType = require('./transactionType.model');
const CertificateVsTransaction = require('./certificateVsTransaction.model');

Certificate.belongsTo(Client, {
  foreignKey: 'id_cliente',
  as: 'cliente'
});

Client.hasMany(Certificate, {
  foreignKey: 'id_cliente',
  as: 'certificados'
});

Certificate.belongsToMany(TransactionType, {
  through: CertificateVsTransaction,
  foreignKey: 'id_certificado',
  as: 'tipo_transaccion'
});

TransactionType.belongsToMany(Certificate, {
  through: CertificateVsTransaction,
  foreignKey: 'id_tipo_transaccion',
  as: 'transaccion'
});

Certificate.hasMany(CertificateVsTransaction, { foreignKey: 'id_certificado' });

CertificateVsTransaction.belongsTo(Certificate, {
  foreignKey: 'id_certificado'
});

TransactionType.hasMany(CertificateVsTransaction, {
  foreignKey: 'id_tipo_transaccion'
});

CertificateVsTransaction.belongsTo(TransactionType, {
  foreignKey: 'id_tipo_transaccion'
});

module.exports = {
  Certificate,
  Client,
  TransactionType,
  CertificateVsTransaction
};
