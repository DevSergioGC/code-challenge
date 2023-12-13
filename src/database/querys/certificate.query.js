const sequelize = require('../db');

const createCertificatesQuery = `
CREATE TABLE IF NOT EXISTS certificados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fec_vencimiento DATE NOT NULL
  );
`;

module.exports = async() => {
  await sequelize
    .query(createCertificatesQuery)
    .then(() => {
      console.log('Certificates table created successfully');
    })
    .catch((error) => {
      console.error('Error creating certificates table:', error);
    });
};
