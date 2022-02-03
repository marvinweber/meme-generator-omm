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
Note: Currently WIP

An OpenAPI specification file is used to serve a interactive API documentation
page on: `http://localhost:3050/api-docs/`.  
Currently, it is not created dynamically (from routes or so), but depends on the
`openapi.yml` specification file, which should be kept up-to-date.
