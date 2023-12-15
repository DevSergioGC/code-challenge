const sequelize = require('../db');

const createCertificatesQuery = `
CREATE TABLE IF NOT EXISTS certificados (
    id SERIAL PRIMARY KEY,
    tasa DOUBLE PRECISION NOT NULL,
    monto_inicial DOUBLE PRECISION NOT NULL,
    fec_vencimiento DATE NOT NULL,
    fec_creado DATE DEFAULT NOW(),
    id_cliente INTEGER REFERENCES clientes(id)
  );
`;

module.exports = async () => {
  await sequelize
    .query(createCertificatesQuery)
    .then(() => {
      console.log('Certificates table created successfully');
    })
    .catch((error) => {
      console.error('Error creating certificates table:', error);
    });
};
