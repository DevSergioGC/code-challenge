const sequelize = require('../db');

const createTransactionsVsCertificateQuery = `
CREATE TABLE IF NOT EXISTS certificado_vs_transaccion (
  id SERIAL PRIMARY KEY,
  id_tipo_transaccion INT, 
  id_certificado INT, 
  CONSTRAINT fk_tipo_transaccion
    FOREIGN KEY(id_tipo_transaccion)
    REFERENCES tipo_transaccion(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_certificado
    FOREIGN KEY(id_certificado)
    REFERENCES certificados(id)
    ON DELETE CASCADE,
  monto DOUBLE PRECISION NOT NULL
);`;

module.exports = () => {
  sequelize
    .query(createTransactionsVsCertificateQuery)
    .then(() => {
      console.log('Transactions vs Certificate table created successfully');
    })
    .catch((error) => {
      console.error('Error creating Transactions vs Certificate table:', error);
    });
};
