const Joi = require('joi');

const certificateSchema = Joi.object({
  tasa: Joi.number().min(0).required(),
  monto_inicial: Joi.number().min(0).required(),
  fec_vencimiento: Joi.date().required(),
  fec_creado: Joi.date(),
  id_cliente: Joi.number().min(1).required()
});

module.exports = certificateSchema;
