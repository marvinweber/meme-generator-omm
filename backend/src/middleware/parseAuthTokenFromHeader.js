import { request, response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.js';

const GOOGLE_APP_CLIENT_ID = process.env.GOOGLE_APP_CLIENT_ID;

/**
 * An express middleware that verifies the given authentication token.
 * If a google id token is given a no user exists yet (i.e. first login), a user
 * will be created.
 * The user object will be attached to the request object, as well as the
 * authentication state.
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
export default async function parseAuthTokenFromHeader(req, res, next) {
  const authType = req.get('Authentication-Type');
  const authToken = req.get('Authentication-Token');
  req.authenticated = false;

  // no authentication details provided with request: skip check
  if (!authType || !authToken) {
    next();
    return;
  }

  let authenticated, user;
  switch (authType.toLowerCase()) {
    case 'google_oauth':
      [authenticated, user] = await verifyGoogleAuthToken(authToken);
      break;
    default:
      // no other login types supported, currently
      break;
  }

  if (authenticated) {
    req.authenticated = true;
    req.user = user;
  }

  next();
  return;
}

async function verifyGoogleAuthToken(token) {
  try {
    const client = new OAuth2Client(GOOGLE_APP_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_APP_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // user ids of "login with google" users are prepended with G
    const userId = 'G_' + payload['sub'];

    // find user in database
    let user = await User.findOne({ id: userId });

    // if user was not found -> create new one
    if (!user) {
      user = new User({
        id: userId,
        email: payload['email'],
        name: payload['name'],
        oauth: 'google',
        registeredAt: Date.now(),
      });
      await user.save().then();
    }

    return [true, user];
  } catch (err) {
    return [false, null];
  }
}
