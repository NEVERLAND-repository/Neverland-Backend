const Joi = require('joi');

const updateUserSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(30)
    .required(),

  gender: Joi.string()
    .pattern(/^male$|^female$|^non-binary$|^none$/)
    .min(3)
    .max(30)
    .required(),
});

module.exports = updateUserSchema;
