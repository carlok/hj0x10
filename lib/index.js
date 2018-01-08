"use strict";

const Blipp = require("blipp");
const CorsHeaders = require("hapi-cors-headers");
const Env = require("node-env-file");
const Hapi = require("hapi");

// const Fs = require('fs'); // TODO (for Knex)

// our support plugins
const Knex = require("./plugins/hapi-knex");
const Objection = require("./plugins/hapi-objection");

// our routes plugins
const Users = require("./api/users/users.route");

Env(__dirname + "./../.env");

const server = new Hapi.Server();
server.connection({
  host: process.env.HOST,
  port: process.env.PORT,
  routes: {
    cors: true
  }
});
server.ext("onPreResponse", CorsHeaders);

const dbOptions = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 2,
    max: 10
  }
};
if (process.env.DB_AWS_SSL == 1) {
  dbOptions.connection.ssl = {
    ca: Fs.readFileSync(__dirname + "/../rds-combined-ca-bundle.pem")
  };
}

server.app.authRemoteAPI = process.env.AUTH_REMOTE_API;
server.app.dbOptions = dbOptions;
server.app.jwtSecretKey = process.env.JWT_SECRET_KEY;

// TODO move the block in a plugin
const validate = function(jwtDecoded, request, callback) {
  const User = require("./models/user.model")(server);
  User.query()
    .where("id", jwtDecoded.id)
    .then(user => {
      if (user.length) {
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    })
    .catch(error => {
      return callback(error);
    });
};

server.register([require("hapi-auth-jwt2")], err => {
  if (err) {
    console.log(err);
  }

  server.auth.strategy("jwt", "jwt", true, {
    // so with the previous "true", JWT auth is required for all routes by default
    key: process.env.JWT_SECRET_KEY,
    validateFunc: validate,
    verifyOptions: { ignoreExpiration: true, algorithms: ["HS256"] }
  });
});

server.register(
  [
    // supports
    { register: Knex, options: dbOptions },
    { register: Objection, options: {} },
    // APIs
    {
      register: Users,
      routes: {
        prefix: process.env.PREFIX + "/users"
      }
    },
    Blipp
  ],
  err => {
    err !== undefined ? console.log(err) : null;
  }
);

server.start(serverError => {
  serverError !== undefined ? console.log(serverError) : null;
  console.log(`Server running at ${server.info.uri}`);
});
