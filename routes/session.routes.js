var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// Login
router.post('/', (request, response) => {
  User
    .findOne({ username: request.body.user.username })
    .then(user => {
      user
        .authenticate(request.body.user.password)
        .then(
          user => {
            var token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24 // seconds
            });
            response.json({
              user,
              authToken: token
            });
          },
          err => response.status(401).json({ message: "Unable to login with credentials provided." })
        );
    });
});

module.exports = router;
