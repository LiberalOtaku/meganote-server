var router = require('express').Router();
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
    username: request.body.user.username
  });

  user
    .save()
    .then(
      userData => {
        response.json({
          message: "User added successfully!",
          user: userData
        });
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
