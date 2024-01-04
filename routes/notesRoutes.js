const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController.js');

// Route to get all notes
router.get('/notes', notesController.getAllNotes);

//Route to get query searched notes
router.get('/notes/search', notesController.getSearchQuery);

// Route to get single route
router.get('/notes/:id', notesController.getNoteById);

//Route to create a note
router.post('/notes/create', notesController.createNote);

//Route to update a note
router.patch('/notes/:id', notesController.updateNoteById);

//Route to delete a note
router.delete('/notes/:id', notesController.deleteNoteById);

//Route to share the notes
router.post('/notes/:id/share', notesController.shareNoteWithUser);

module.exports = router;
