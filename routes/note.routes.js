var router = require('express').Router();
var Note = require('../models/note');

router.get('/', function(request, response) {
  Note
    .find()
    .sort({ updated_at: -1 })
    .then(function(notes) {
      response.json(notes);
    });
});

router.get('/:id', function(request, response) {
  Note
    .findOne({
      _id: request.params.id
    })
    .then(function(noteData) {
      response.json(noteData);
    });
});

router.post('/', function(request, response) {
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

router.put('/:id', function(request, response) {
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

router.delete('/:id', function(request, response) {
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

module.exports = router;
