var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// Login
router.post('/', (request, response) => {
  User
    .findOne({ username: request.body.user.username })
    .then(
      user => {
        if (user) {
          user.authenticate(request.body.user.password, (isMatch) => {
            if (isMatch) {
              var token = jwt.sign(user._id, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24 // seconds
              });
              response.json({
                message: "User logged in successfully!",
                user,
                authToken: token
              });
            }
            else {
              response.status(401).json({ message: "Unable to login with credentials provided." });
            }
          });
        }
        else {
          response.status(401).json({ message: "Unable to login with credentials provided." });
        }
      }
    );
});

module.exports = router;
