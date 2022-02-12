# Meme Generator - Frontend

## NPM Setup, Dev Server, and Tests
```shell
# install dependencies
npm install

# start development server with hot reloading
# development server can be accessed via: http://localhost:3000
npm start

# run tests
npm test

# build production bundle
npm run build
```

## Dependencies
Stack:
- Typescript
- React
- TailwindCSS
### React
Docs: https://reactjs.org/docs/getting-started.html  
React Router is used for handling different pages/routes (Getting Started Docs:
https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)

### TailwindCSS
TailwindCSS is used for Component / CSS styling.   
Docs: https://tailwindcss.com/docs/installation.

## Docs
## Configuration
Configuration (Backend API Endpoint, Google Client ID, etc.) is set via the
`.env` file. Set proper values there and **restart the dev server** (or make
a new production build).

Available Configuration Keys:
  - `REACT_APP_API_URL`: Endpoint of the Backend/ API.
  - `REACT_APP_GOOGLE_OAUTH_CLIENT_ID`: Client ID of the Google OAuth
    application.
  - `REACT_APP_OVERVIEW_PER_PAGE`: Amount of images to load per page on the
    meme overview (i.e., how many new memes to load if scrolled to the end of
    the page).


### State Management
[Redux](https://redux.js.org/tutorials/typescript-quick-start) (together
with [React Redux](https://react-redux.js.org/introduction/getting-started)) is
used for global state management.
Global state/store files are stored in the `src/store/*` directory.

### HTTP Request Frontend -> Backend
Use the `apiClient`, exported from the `index.tsx` file. It has already set the
correct `baseUrl` and the authorization header will also be set with a correct
value once the user logged in.


## Docker
To create a Docker image serving the built frontend, run:
```shell
# make sure to be in frontend root directory
cd ./frontend

# build the image
docker build -t omm-meme-fe:latest .

# run the image (in this example, use port 3000 on the outside)
# (the container exposes port 80)
docker run -d -p 3000:80 omm-meme-fe:latest
```
Make sure to setup the `.env` file with desired/proper values
**before building** the image!
