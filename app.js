require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var User = require('./models/user');
var bodyParser = require('body-parser');
var noteRoutes = require('./routes/note.routes');
var userRoutes = require('./routes/user.routes');
var sessionRoutes = require('./routes/session.routes');
var headers = require('./middleware/headers');

var app = express();

app.use(headers);

app.use(bodyParser.json());

app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/sessions', sessionRoutes);

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
