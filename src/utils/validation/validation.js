const { clientSchema, updateClientSchema } = require('./schemas/client.schema');
const certificateSchema = require('./schemas/certificate.schema');
const transactionSchema = require('./schemas/transaction.schema');

const validateClient = (data) => clientSchema.validate(data);
const validateUpdateClient = (data) => updateClientSchema.validate(data);
const validateCertificate = (data) => certificateSchema.validate(data);
const validateTransaction = (data) => transactionSchema.validate(data);

module.exports = {
  validateClient,
  validateUpdateClient,
  validateCertificate,
  validateTransaction
};
