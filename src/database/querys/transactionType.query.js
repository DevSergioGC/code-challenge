const sequelize = require('../db');

const createTransactionsTypeQuery = `
CREATE TABLE IF NOT EXISTS tipo_transaccion (
    id SERIAL PRIMARY KEY,
    tipo_transaccion VARCHAR(255) NOT NULL,
  );
`;

module.exports = async () => {
  await sequelize
    .query(createTransactionsTypeQuery)
    .then(() => {
      console.log('Transactions table created successfully');
    })
    .catch((error) => {
      console.error('Error creating transactions table:', error);
    });
};
