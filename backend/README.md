# Meme Generator Backend

## Dev Setup
Make sure Node.js (>= v16) is installed.
```
# install npm packages
npm install

# serve
npm start

# serve with hot reloading
npm run watch:dev
```

## Configuration
Configuration is set via the `.env` file. Set proper values there and
**restart the server**.  
Configuration includes MongoDB access, secret for signing JWT Tokens, etc.

## MongoDB Connection
Either start the Docker Services (`/tools/meme-generator-omm-docker`) and simply
use it.  
Or, alternatively, use MongoDB Cloud Atlas. See this tutorial for this option:
https://www.mongodb.com/languages/mern-stack-tutorial (you can adjust the
credentials in the `config.env` files then, accordingly).

### Mongoose
Mongoose is used for Model "Management";  
getting started: https://mongoosejs.com/


## API (Endpoint) Documentation
An OpenAPI specification file is used to serve a interactive API documentation
page on: `http://localhost:3050/api-docs/`.  
Currently, it is not created dynamically (from routes or so), but depends on the
`openapi.yml` specification file, which has to be kept up-to-date.

## Docker
To create a Docker image serving the backend, run:
```shell
# make sure to be in backend root directory
cd ./backend

# build the image
docker build -t omm-meme-fe:latest .

# run the image (in this example, use port 3000 on the outside)
# (the container exposes port 80)
docker run --env-file .env -d -p 3050:3050 omm-meme-backend:latest
```
Make sure to provide proper environment variables (see  `.env` file for required
ones) while running the container. The `.env` file is not available in the
container (image)! However, if you run the backend from the backend directory,
docker will automatically use the `.env` file located there to expose the
values set into the running container.

