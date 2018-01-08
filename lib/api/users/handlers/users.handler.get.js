"use strict";

const Boom = require("boom");

module.exports = (server, options, request, reply) => {
  const User = require("./../../../models/user.model")(server);

  User.query()
    .eager("groups")
    .where("id", request.params.id_user)
    .then(users => {
      if (users.length == 1) {
        // users[0] is just an example
        return reply(users[0]).header(
          "Authorization",
          request.headers.authorization
        );
      } else {
        return reply(Boom.badRequest("Unknown user"));
      }
    })
    .catch(error => {
      console.log(error);
      return reply(Boom.badRequest("[problem] GET users/{id_user}"));
    });
};
