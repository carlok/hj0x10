Boilerplate Hapi (v16) + hapi-auth-jwt2 + Objection/Knex (over MySQL)

```
yarn add --exact something
yarn add --dev --exact something
yarn install
```

```
references:
https://github.com/dwyl/hapi-auth-jwt2
https://github.com/dwyl/hapi-auth-jwt2/issues/222

testing a not restricted route:
http -j --verbose POST http://127.0.0.1:1337/api/v1/users/login email=carlo.perassi@something.com password=Prova123!

testing a restricted route without a valid token:
http -j --verbose GET http://127.0.0.1:1337/api/v1/users/restricted

testing a restricted route with a valid token:
(note the ":" at the end of the token)
http --auth-type=jwt \
--auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNhcmxvIiwic3VybmFtZSI6IlBlcmFzc2kiLCJpYXQiOjE1MTUxNTg3NTl9.OLpaQQc0YRC2XyWih2hSX5kGTI-daqo7TrS_-7tN6tA:' \
-j --verbose http://127.0.0.1:1337/api/v1/users/1
```