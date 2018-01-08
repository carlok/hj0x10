"use strict";

const usersSchemaLoginPost = require("./schemas/users.schema.login.post");
const usersSchemaGet = require("./schemas/users.schema.get");

const usersHandlerLoginPost = require("./handlers/users.handler.login.post");
const usersHandlerGet = require("./handlers/users.handler.get");

exports.register = function(server, options, next) {
  server.route([
    {
      method: "POST",
      path: "/login",
      config: {
        auth: false,
        validate: usersSchemaLoginPost
      },
      handler: (request, reply) =>
        usersHandlerLoginPost(server, options, request, reply)
    },
    {
      method: "GET",
      path: "/{id_user}", // add ending slash on "not GET"
      config: {
        validate: usersSchemaGet
      },
      handler: (request, reply) =>
        usersHandlerGet(server, options, request, reply)
    }
  ]);

  next();
};

exports.register.attributes = {
  name: "users"
};
