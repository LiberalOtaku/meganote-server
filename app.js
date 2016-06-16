require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var Note = require('./models/note');
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

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
