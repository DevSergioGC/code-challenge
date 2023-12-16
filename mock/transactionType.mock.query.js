const sequelize = require('../src/database/db');

const mockTransactionType = `
  INSERT INTO tipo_transaccion (tipo_transaccion) VALUES ('Deposito');
    INSERT INTO tipo_transaccion (tipo_transaccion) VALUES ('Retiro');
  `;

module.exports = async () => {
  await sequelize
    .query(mockTransactionType)
    .then(() => {
      console.log('Mock transaction type table successfully');
    })
    .catch((error) => {
      console.error('Error mocking transaction type table:', error);
    });
};
