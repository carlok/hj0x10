"use strict";

// const Joi = require("joi");

const UsersLoginSchema = require('../../schemas/users.login.schema.js');

const schemaPost = {
  params: false,
  query: false,
  payload: UsersLoginSchema
};

module.exports = schemaPost;
