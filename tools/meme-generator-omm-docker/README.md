# Docker Setup for Meme Generator

This starts a MongoDB docker container that can be used for local development
of the express application.

```bash
# start docker services
docker compose up -d
```

## Mongo Express
This is a simple web dashboard giving access to the MongoDB.  
**Note**: It may be necessary to restart the service once, if it exists because
of not available MongoDB connection.
