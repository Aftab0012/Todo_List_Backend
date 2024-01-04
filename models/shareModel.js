// This is a just Demo model for future optimizations

const mongoose = require('mongoose');

const noteShareSchema = new mongoose.Schema({
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  },
  sharedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  sharedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const NoteShare = mongoose.model('NoteShare', noteShareSchema);

module.exports = NoteShare;
