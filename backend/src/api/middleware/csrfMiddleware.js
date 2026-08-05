// csrfMiddleware.js

const crypto = require('crypto');
const { errorResponder, errorTypes } = require('../../core/errors');

/**
 * Custom CSRF Middleware
 */
// eslint-disable-next-line consistent-return
const csrfMiddleware = (req, res, next) => {
  const TOKEN_SECRET = process.env.CSRF_TOKEN; // Change this to a strong secret key

  // Utility function to create a unique CSRF token
  const createCsrfToken = () => crypto.randomBytes(32).toString('hex'); // Generate a random 32-byte token
  // Utility function to hash the CSRF token
  const hashToken = (token) =>
    crypto.createHmac('sha256', TOKEN_SECRET).update(token).digest('hex');

  // 1. Check if the incoming request is a GET request
  if (req.method === 'GET') {
    if (!req.cookies.csrf_token || !req.cookies.csrf_token_client) {
      const token = createCsrfToken();

      res.cookie('csrf_token', hashToken(token), {
        httpOnly: true,
        sameSite: 'Strict',
      });

      res.cookie('csrf_token_client', token, {
        sameSite: 'Strict',
      });
    }

    return next();
  }

  // 2. For POST, PUT, and DELETE requests, verify the CSRF token
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const csrfTokenClient = req.headers['x-csrf-token']; // Token from the client request
    const csrfTokenServer = req.cookies.csrf_token; // Hashed token from server-side cookie
    if (!csrfTokenClient || !csrfTokenServer) {
      throw errorResponder(
        errorTypes.TOKEN_EXPIRED,
        'Please refresh the website.'
      );
    }

    // 3. Validate the CSRF token
    const csrfTokenClientHash = hashToken(csrfTokenClient);

    if (csrfTokenClientHash !== csrfTokenServer) {
      throw errorResponder(
        errorTypes.TOKEN_EXPIRED,
        'Please refresh the website.'
      );
    }

    return next();
  }

  next();
};

module.exports = csrfMiddleware;
