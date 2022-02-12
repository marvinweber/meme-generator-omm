# Docker Setup for Meme Generator

The docker-compose files in this directory can be used to either just spin up
MongoDB (for development), or MongoDB together with a frontend and backend.
Depending on what you want to do, choose the proper compose files.

## Start MongoDB (and Mongo Express)

This starts a MongoDB docker container that can be used for local development
of the express application.

```shell
# start docker services
docker compose -f docker-compose.yml up -d
```

### Mongo Express
This is a simple web dashboard giving access to the MongoDB.  
**Note**: It may be necessary to restart the service once after the initial
start, because of not available MongoDB connection.


## Start MongoDB + Apps (Frontend and Backend)
Make sure to adjust the `.env` file **in the frontend directory** and the
`.backend.env` file **in this directory** with proper / desired values.
```shell
# start docker services
docker compose -f docker-compose.yml -f docker-compose.app.yml up -d
```

## Single Services
Single docker compose services can be easily started/stopped like so:
```shell
# docker compose -f docker-compose.yml -f docker-compose.app.yml up -d <service>

# example:
# start backend
docker compose -f docker-compose.yml -f docker-compose.app.yml up -d omm_backend
# stop backend
docker compose -f docker-compose.yml -f docker-compose.app.yml stop omm_backend
```

## Ressources
See Docker Docs for more details about Docker and Docker Compose:
https://docs.docker.com/
