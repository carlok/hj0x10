"use strict";

const userGroupModel = function(server) {
  const basicModel = require("./parent/basic.model")(server);

  return class UserGroup extends basicModel {
    static get tableName() {
      return "users_groups";
    }
  };
};

module.exports = userGroupModel;
