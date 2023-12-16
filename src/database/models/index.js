const Certificate = require('./certificate.model');
const Client = require('./client.model');
const TransactionType = require('./transactionType.model');
const CertificateVsTransaction = require('./certificateVsTransaction.model');

Certificate.belongsTo(Client, {
  foreignKey: 'id_cliente',
  as: 'cliente'
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

module.exports = {
  Certificate,
  Client,
  TransactionType,
  CertificateVsTransaction
};
