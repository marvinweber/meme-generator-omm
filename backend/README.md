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

The Backend is served on port `3050`.

## Configuration
Configuration is set via the `.env` file. Set proper values there and
**restart the server**.  
Configuration includes MongoDB access, secret for signing JWT Tokens, etc.

The following configuration keys can be set:
  - `PUBLIC_URL`: = The public URL of the Backend (is used, for example, for
    generating Download URLs / links to Meme images, etc.).
  - `GOOGLE_APP_CLIENT_ID`: Client ID of the Google OAuth application.
  - `MONGODB_URI` URI to the MongoDB server/database.
  - `JWT_SECRET`: Secret used to encrpyt / sign JWT Tokens.
  - `JWT_ISSUER` Issuer name of the JWT Tokens created by the backend.


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
It is not created dynamically (from routes or so), but depends on the
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
container image!  
Especially, a MongoDB server must be running "somewhere" and the URI in the
`.env` file must be correct and working.
