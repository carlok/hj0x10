"use strict";

const basicModel = function(server) {
  const Objection = require("objection");
  const Model = Objection.Model;

  Model.knex(server.plugins.objection.startup());

  return Model;
};

module.exports = basicModel;
