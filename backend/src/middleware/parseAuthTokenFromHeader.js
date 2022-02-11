import { request, response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt_decode from 'jwt-decode';
import crypto from 'crypto';
import { jwtVerify } from 'jose';
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
  req.authenticated = false;
  let authenticated, user;

  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next();
    }
    const [authType, authData] = authorizationHeader.split(' ');

    switch (authType) {
      case 'Bearer':
        [authenticated, user] = await verifyBearerToken(authData);
      default:
        // no other login types (than Bearer Token / JWT) supported yet
        break;
    }
  } catch {
  } finally {
    if (authenticated) {
      req.authenticated = true;
      req.user = user;
    }
  }

  next();
  return;
}

/**
 * Verify the given JWT / Bearer Token
 *
 * @param {string} token The JWT token.
 * @returns [authenticated, user]: flag to indicate whether authentication was
 *          successfull and the actual user object (in case of successfull
 *          authentication).
 */
async function verifyBearerToken(token) {
  if (!token) {
    return [false, null];
  }

  const decodedToken = jwt_decode(token);
  const tokenIssuer = decodedToken['iss'] || null;

  switch (tokenIssuer) {
    case 'accounts.google.com':
      return await verifyGoogleAuthToken(token);
    case process.env.JWT_ISSUER:
      return await verifyOMMJwtAuthToken(token);
    default:
      // no other login types supported, currently
      return [false, null];
  }
}

/**
 * Verify a given JWT Token that has been issued by this application.
 *
 * @param {string} token JWT token provided by the user.
 * @returns [ authenticated, userObject ]
 */
async function verifyOMMJwtAuthToken(token) {
  try {
    const secretKey = crypto.createSecretKey(process.env.JWT_SECRET);
    // this throws an exception when token is invalid
    const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
      issuer: process.env.JWT_ISSUER,
    });

    const usr = await User.findById(payload._id);
    return !!usr ? [true, usr] : [false, null];
  } catch {
    return [false, null];
  }
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
        profilePicUrl: payload['picture'],
      });
      await user.save().then();
    }

    return [true, user];
  } catch (err) {
    return [false, null];
  }
}
