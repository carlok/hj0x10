"use strict";

const Joi = require("joi");

const schemaPost = {
  params: {
    id_user: Joi.number()
      .integer()
      .min(1)
      .required()
  },
  query: false,
  payload: false
};

module.exports = schemaPost;
