const fs = require('fs-extra');
const { findById, createNewNote, deleteNote, filterByQuery } = require('../lib/notes');
const { notes } = require('../db/db.json');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();

jest.mock('fs');
test('creates a note object', () => {
  const note = createNewNote({ title: 'Test Note', text: 'Testing: Is this thing on?' }, notes);

  expect(note.title).toBe('Test Note');
  expect(note.text).toBe('Testing: Is this thing on?');
  expect(typeof note.id).toBe('string');
});

test('filter by query', () => {
  const startingNotes = [
    {
      id: uid(),
      title: 'Sample 1',
      text: 'blah'
    },
    {
      id: uid(),
      title: 'Sample 2',
      text: 'blah blah'
    },
    {
      id: uid(),
      title: 'Other 3',
      text: 'details'
    }
  ];
  const query = {"title": "Sample", "text": "blah"};
  const result = filterByQuery(query, startingNotes)
  expect(result.length).toEqual(2);
});

test('finds note by id', () => {
  const id1 = uid();
  const id2 = uid();
  const startingNotes = [
    {
      id: id1,
      title: 'Sample 1',
      text: 'details'
    },
    {
      id: id2,
      title: 'Sample 2',
      species: 'details'
    }
  ];

  const result = findById(id2, startingNotes);
  expect(result.title).toBe('Sample 2');
});


jest.mock('fs');
test('delete a note based on id', () => {
  const id1 = uid();
  const id2 = uid();
  const startingNotes = [
    {
      id: id1,
      title: 'Sample 1',
      text: 'details'
    },
    {
      id: id2,
      title: 'Sample 2',
      species: 'details'
    }
  ];

  const result = deleteNote(id1, startingNotes);

  expect(result.length).toEqual(1);
  expect(result[0].title).toBe('Sample 2');
});