const Joi = require('joi');

const createUserSchema = Joi.object({
  fullName: Joi.string()
    .pattern(/^[A-Za-z][A-Za-z ]{2,30}$/)
    .min(3)
    .max(30)
    .required(),

  username: Joi.string()
    .pattern(/^[A-Za-z][A-Za-z0-9_]{2,30}$/)
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(/^\w[a-zA-Z0-9]{8,30}$/)
    .min(8)
    .max(30)
    .required(),
});

module.exports = createUserSchema;
