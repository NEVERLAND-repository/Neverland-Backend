const Joi = require('joi');

const loginUserSchema = Joi.object({
  username: Joi.string()
    .pattern(/^\w[a-zA-Z0-9]*$/)
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(/^\w[a-zA-Z0-9]*$/)
    .min(8)
    .max(30)
    .required(),
});

module.exports = loginUserSchema;
