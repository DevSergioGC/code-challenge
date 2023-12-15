const sequelize = require('../db');

const createTransactionsVsCertificateQuery = `
CREATE TABLE IF NOT EXISTS certificado_vs_transaccion (
    id_tipo_transaccion INTEGER NOT NULL REFERENCES tipo_transaccion(id),
    id_certificado INTEGER NOT NULL REFERENCES certificados(id),
    monto DOUBLE PRECISION NOT NULL,
  );
`;

module.exports = async () => {
  await sequelize
    .query(createTransactionsVsCertificateQuery)
    .then(() => {
      console.log('Transactions vs Certificate table created successfully');
    })
    .catch((error) => {
      console.error('Error creating Transactions vs Certificate table:', error);
    });
};
