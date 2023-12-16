const Joi = require('joi');

const transactionsSchema = Joi.object({
  id_certificado: Joi.number().integer().required(),
  monto: Joi.number().min(0).required()
});

module.exports = transactionsSchema;
