require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var Note = require('./models/note');
var bodyParser = require('body-parser');

var app = express();

app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
});

app.get('/', function(request, response) {
  Note
    .find()
    .then(function(notes) {
      response.json(notes);
    });
});

app.use(bodyParser.json());

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

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
