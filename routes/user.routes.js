var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/', function(request, response) {
  if (!passwordsPresent(request.body.user) || !passwordsMatch(request.body.user)) {
    response.status(422).json({
      status: 422,
      message: 'Passwords do not match!',
    });
    return;
  }

  var user = new User({
    name: request.body.user.name,
    username: request.body.user.username,
    password_digest: bcrypt.hashSync(request.body.user.password, 10)
  });

  user
    .save()
    .then(
      userData => {
        var token = jwt.sign(userData._id, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24 // seconds
        });
        response.json({
          message: "User added successfully!",
          user: userData,
          authToken: token
        });
      }
    );
});

router.put('/:id', (request, response) => {
  User
    .findOne({ _id: request.params.id })
    .then(
      user => {
        if (user) {
          // User exists
          user.name = request.body.user.name;
          user.username = request.body.user.username;
          user
            .save()
            .then(
              // On success
              () => response.json({ user }),
              // On failure
              () => response.status(422).json({ message: "Unable to update user." })
            );
        }
        else {
          // User does not exist
          response.status(404).json({ message: "User not found." });
        }
      }
    );
});

module.exports = router;

////////////////////

function passwordsPresent(payload) {
  return (payload.password && payload.passwordConfirmation);
}

function passwordsMatch(payload) {
  return (payload.password === payload.passwordConfirmation);
}
