const sequelize = require('../db');

const createClientCertificateQuery = `
CREATE TABLE IF NOT EXISTS cliente_certificado (
    id_cliente INTEGER REFERENCES clientes(id),
    id_certificado INTEGER REFERENCES certificados(id)
  );
`;

module.exports = async() => {
  await sequelize
    .query(createClientCertificateQuery)
    .then(() => {
      console.log('ClientVSCertificate table created successfully');
    })
    .catch((error) => {
      console.error('Error creating clientVSCertificate table:', error);
    });
};
