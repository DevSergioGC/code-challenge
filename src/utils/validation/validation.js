const { clientSchema, updateClientSchema } = require('./schemas/client.schema');
const certificateSchema = require('./schemas/certificate.schema');

const validateClient = (data) => clientSchema.validate(data);
const validateUpdateClient = (data) => updateClientSchema.validate(data);
const validateCertificate = (data) => certificateSchema.validate(data);

module.exports = {
  validateClient,
  validateUpdateClient,
  validateCertificate
};
