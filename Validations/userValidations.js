const Joi = require('joi');

const userValSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = userValSchema;
