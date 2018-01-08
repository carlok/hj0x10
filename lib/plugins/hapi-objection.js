"use strict";
exports.register = function(server, options, next) {
  const Knex = require("knex");
  const knex = Knex(server.app.dbOptions);

  const startup = function() {
    return knex;
  };

  server.expose({
    startup: startup
  });

  next();
};

exports.register.attributes = {
  name: "objection"
};
