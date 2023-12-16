const Joi = require('joi');

const clientSchema = Joi.object({
  nombre: Joi.string().min(3).max(255).required()
});

const updateClientSchema = Joi.object({
  nombre: Joi.string().min(3).max(255)
});

module.exports = {
  clientSchema,
  updateClientSchema
};
