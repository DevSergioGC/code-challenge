const Joi = require('joi');

const transactionsSchema = Joi.object({
  id_certificado: Joi.number().integer().required().min(1),
  monto: Joi.number().min(1).required()
});

module.exports = transactionsSchema;
