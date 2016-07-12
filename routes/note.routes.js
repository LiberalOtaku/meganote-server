var router = require('express').Router();
var Note = require('../models/note');

router.get('/', (request, response) => {
  response.json(request.user.notes);
});

router.get('/:id', (request, response) => {
  response.json(request.user.notes.id(request.params.id));
});

router.post('/', (request, response) => {
  var note = request.user.notes.create({
    title: request.body.note.title,
    body_html: request.body.note.body_html
  });
  request.user.notes.push(note);
  request.user
    .save()
    .then(
      userData => {
        response.json({
          message: "Note added successfully!",
          note: note,
        });
      }
    );
});

router.put('/:id', (request, response) => {
  var note = request.user.notes.id(request.params.id);
  note.title = request.body.note.title;
  note.body_html = request.body.note.body_html;
  note.updated_at = Date.now();

  request.user
    .save()
    .then(
      () => {
        response.json({
          message: 'Your changes have been saved.',
          note: note,
        });
      },
      result => {
        response.json({ message: 'Oops, something went wrong!' });
      }
    );
});

router.delete('/:id', (request, response) => {
  var note = request.user.notes.id(request.params.id);
  note.remove();

  request.user
    .save()
    .then(
      () => {
        response.json({
          message: 'That note has been deleted.',
          note: note
        });
      }
    );
});

module.exports = router;
