var router = require('express').Router();
var User = require('../models/user');

router.post('/', function(request, response) {
  var user = new User({
    name: request.body.user.name,
    username: request.body.user.username
  });
  user
    .save()
    .then(function(userData) {
      response.json({
        message: "User added successfully!",
        user: userData
      });
    });
});

module.exports = router;
