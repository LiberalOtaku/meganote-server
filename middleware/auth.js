var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = (req, res, next) => {
  if (isPreflight(req) || isLoggingInOrSigningUp(req)) {
    next();
    return;
  }

  const token = req.headers.authorization;

  if (token) {
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
      if (err) {
        res.status(401).json({ message: 'Authentication required.' });
        return;
      }

      // Find the user
      User
        .findOne({ _id: decodedPayload })
        .then(
          user => {
            if (user) {
              // Add user to request
              req.user = user;
              next();
            }
            else {
              res.status(401).json({ message: 'Authentication required.' });
            }
          }
        );
    });
  }
  else {
    res.status(401).json({ message: 'Authentication required.' });
  }
};

function isPreflight(req) {
  return (req.method.toLowerCase() === 'options');
}

function isLoggingInOrSigningUp(req) {
  if (req.method.toLowerCase() !== 'post') {
    return false;
  }

  const loggingIn = req.originalUrl.includes('sessions');
  const signingUp = req.originalUrl.includes('users');

  return (loggingIn || signingUp);

}
