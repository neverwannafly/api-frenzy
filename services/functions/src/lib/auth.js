const jwt = require('jsonwebtoken');

const TOKEN_ISSUER = 'api-frenzy';
const TOKEN_SECRET = process.env.SECRET_KEY_BASE;

function decodeToken(token) {
  token = token.replace('Bearer ', '');

  try {
    const decodedToken = jwt.verify(token, TOKEN_SECRET, {
      algorithms: ['HS256'],
      issuer: TOKEN_ISSUER,
    });

    return decodedToken;
  } catch (err) {
    console.error('Error decoding the JWT:', err.message);
    return null;
  }
}

function authenticateUser(token) {
  const response = { success: false, error: '', user: null };

  if (!token) {
    response.error = 'Authorization token required';
    return response;
  }

  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.id) {
    response.error = 'Invalid or expired token';
    return response;
  }

  response.success = true;
  response.user = decodedToken.id;

  return response;
}

module.exports = { decodeToken, authenticateUser };
