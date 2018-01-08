"use strict";

const Joi = require("joi");

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
});
