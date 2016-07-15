var router = require('express').Router();

router.get('/', (request, response) => {
  response.json(request.user.notes);
});

router.get('/:id', (request, response) => {
  response.json(request.user.notes.id(request.params.id));
});

router.post('/', (request, response) => {
  var note = request.user.notes.create({
    title: request.body.title,
    body_html: request.body.body_html
  });
  request.user.notes.push(note);
  request.user
    .save()
    .then(note => response.json(note));
});

router.put('/:id', (request, response) => {
  var note = request.user.notes.id(request.params.id);
  note.title = request.body.title;
  note.body_html = request.body.body_html;
  note.updated_at = Date.now();

  request.user
    .save()
    .then(
      () => response.json(note),
      result => response.json({ message: 'Oops, something went wrong!' }));
});

router.delete('/:id', (request, response) => {
  var note = request.user.notes.id(request.params.id);
  note.remove();

  request.user
    .save()
    .then(() => response.json(note));
});

module.exports = router;
