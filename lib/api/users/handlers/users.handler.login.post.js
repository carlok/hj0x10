"use strict";

const Bcrypt = require("bcrypt");
const Boom = require("boom");
const Jwt = require("jsonwebtoken");

module.exports = (server, options, request, reply) => {
  function setToken(user) {
    return Jwt.sign(
      {
        id: user.id,
        email: user.username,
        name: user.name,
        surname: user.surname,
        login: user.login
      },
      server.app.jwtSecretKey /*,
      {
        expiresIn: "1h"
      }*/
    );
  }

  const User = require("./../../../models/user.model")(server);

  // how to save the hash of a password
  /*const saltRounds = 10;
  Bcrypt.hash(request.payload.password, saltRounds, function(err, hash) {
    if (err !== undefined) {
      console.log("bcrypt err", err);
    }
    console.log("bcrypt hash", hash);
  });*/

  User.query()
    .eager("groups")
    .where("email", request.payload.email)
    .then(users => {
      if (users.length == 1) {
        Bcrypt.compare(request.payload.password, users[0].hpassword)
          .then(res => {
            if (res === true) {
              return reply({ token: setToken(users[0]) });
            } else {
              return reply(Boom.badRequest("Wrong password"));
            }
          })
          .catch(err => {
            console.log(err);
            reply(Boom.badRequest("[problem] POST users login (password)"));
          });
      } else {
        return reply(Boom.badRequest("Unknown user"));
      }
    })
    .catch(error => {
      console.log(error);
      return reply(Boom.badRequest("[problem] POST users login (query)"));
    });
};
