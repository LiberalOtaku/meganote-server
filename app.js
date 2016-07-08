require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var User = require('./models/user');
var Note = require('./models/note');
var bodyParser = require('body-parser');

var app = express();

app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});

app.use(bodyParser.json());

app.get('/', function(request, response) {
  Note
    .find()
    .sort({ updated_at: -1 })
    .then(function(notes) {
      response.json(notes);
    });
});

app.get('/:id', function(request, response) {
  Note
    .findOne({
      _id: request.params.id
    })
    .then(function(noteData) {
      response.json(noteData);
    });
});

app.post('/', function(request, response) {
  var note = new Note({
    title: request.body.note.title,
    body_html: request.body.note.body_html
  });
  note
    .save()
    .then(function(noteData) {
      response.json({
        message: "Note added successfully!",
        note: noteData
      });
    });
});

app.put('/:id', function(request, response) {
  Note
    .findOne({
      _id: request.params.id
    })
    .then(function(note) {
      note.title = request.body.note.title;
      note.body_html = request.body.note.body_html;
      note
        .save()
        .then(
          function() {
            response.json({
              message: 'Your changes have been saved.',
              note: note
            });
          },
          function(result) {
            response.json({ message: 'Oops, something went wrong!' });
          }
        );
    });
});

app.delete('/:id', function(request, response) {
  Note
    .findOneAndRemove({
      _id: request.params.id
    }, function(note) {
      response.json({
        message: 'That note has been deleted.',
        note: note
      });
    });
});

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
