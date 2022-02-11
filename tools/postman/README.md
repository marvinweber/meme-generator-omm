# Postman Collection

The Postman collection contains information about all available endpoints of the
backend. It can be converted to an OpenAPI specification using the
[postman-to-openapi](https://joolfe.github.io/postman-to-openapi/) utility and
the provided `p2o-options.json` configuration file.

Convert postman collection to OpenAPI specification like so:
```shell
# install postman-to-openapi
npm i -g postman-to-openapi

# convert
p2o ./omm-postman-collection.json -f openapi.yml -o ./p2o-options.json
```
