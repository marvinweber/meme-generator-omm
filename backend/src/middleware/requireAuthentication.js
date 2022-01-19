import { request, response } from 'express';
import parseAuthTokenFromHeader from './parseAuthTokenFromHeader.js';

/**
 * Middleware that requires the user to be authenticated to proceed.
 * 401 error is returen in case of missing authentication.
 * This middleware must be located after the {@link parseAuthTokenFromHeader}
 * middleware in the middleware chain.
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
export default function requireAuthentication(req, res, next) {
  if (!req.authenticated) {
    res.status(401).json({
      forbidden: true,
    });
  } else {
    next();
  }
}
