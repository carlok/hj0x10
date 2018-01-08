"use strict";

const userModel = function(server) {
  const basicModel = require("./parent/basic.model")(server);

  return class User extends basicModel {
    static get tableName() {
      return "users";
    }

    static get relationMappings() {
      const Group = require("./user_group.model")(server);

      return {
        groups: {
          relation: basicModel.BelongsToOneRelation,
          modelClass: Group,
          join: {
            from: "users.id_group",
            to: "users_groups.id"
          }
        }
      };
    }
  };
};

module.exports = userModel;
