const router = require('express').Router();
const { filterByQuery, findById, createNewNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json')


router.get('/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
  const notesArray = deleteNote(req.params.id, notes);
  delete require.cache[require.resolve('../../db/db.json')];
  notes = require('../../db/db.json').notes;
  res.json(notesArray);
})

module.exports  = router;