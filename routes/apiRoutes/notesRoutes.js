const router = require('express').Router();
const { notes } = require('../../db/db.json');

router.get('/db', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.post('/db', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const newNote = createNewNote(req.body, notes);
    res.json(notes);
  }
});

module.exports  = router;