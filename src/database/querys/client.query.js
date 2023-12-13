const sequelize = require('../db');

const createClientQuery = `
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
  );
`;

module.exports = async() => {
  await sequelize
    .query(createClientQuery)
    .then(() => {
      console.log('Clients table created successfully');
    })
    .catch((error) => {
      console.error('Error creating clients table:', error);
    });
};
