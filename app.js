require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var User = require('./models/user');
var bodyParser = require('body-parser');
var noteRoutes = require('./routes/note.routes');
var headers = require('./middleware/headers');

var app = express();

app.use(headers);

app.use(bodyParser.json());

app.use('/api/v1/notes', noteRoutes);

app.post('/users', function(request, response) {
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

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
