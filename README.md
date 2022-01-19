# Meme Generator (OMM 2021/22)
Project of the LMU Online Multimedia Course 2021/22.

Stack:
- Frontend: Typescript React SPA
- Backend: Express

# Docs / Concepts

## Sign in with Google
### General
Google Sign-In requires to register your Application within the
[Google Cloud Platform](https://console.cloud.google.com/) (e.g., explained
[here](https://www.freakyjolly.com/google-signin-login-button-in-react-js-example-using-react-google_login-package/))

This setup currently uses a test Google Application that is only allowed to be
used by permitted Google Accounts (for this test application, the frontend must
be served via `http://localhost:3000`).

The [React Google Login](https://www.npmjs.com/package/react-google-login)
library is used for the generation of the "Sign in with Google" button in the
frontend. The backend uses the
[Google Auth Library](https://www.npmjs.com/package/google-auth-library) for
verification of the id token.

Link to the Google Docs about Google Sign In:
https://developers.google.com/identity/sign-in/web/sign-in?hl=en

### Login Process
- User uses the "Sign in with Google" in the Frontend.
- The Frontend uses the id_token (returned by Google) to authenticate with the
  backend.
- The backend creates a user in the database on first requests with a new google
  token_id / Google user id.
- Backend routes can be secured by requiring authentication via the
  `requireAuthentication` middleware.
