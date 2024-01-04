const Note = require('../models/noteSchema.js');
const NoteShare = require('../models/shareModel.js');
const User = require('../models/userSchema.js');

// GET /api/notes
const getAllNotes = async (req, res) => {
  // const query = req.query.q;
  const userId = req.user._id;

  try {
    // if (query) {
    //   const searchedNote = await Note.find({
    //     $or: [
    //       { title: { $regex: query, $options: 'i' } },
    //       { content: { $regex: query, $options: 'i' } },
    //     ],
    //   });

    //   res.status(200).json({ message: searchedNote });
    // }

    const notes = await Note.find({ user: userId })
      .populate('user', 'username')
      .populate('sharedWith', 'username');
    if (notes.length === 0) {
      return res
        .status(404)
        .json({ message: 'no notes available for this user' });
    }
    res.status(200).json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSearchQuery = async (req, res) => {
  const query = req.query.q;
  try {
    const searchedNote = await Note.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    });

    if (searchedNote.length === 0) {
      return res.status(404).json({ message: 'No such Notes Exist' });
    }

    res.status(200).json({ message: searchedNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET /api/notes/:id
const getNoteById = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;
    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error('Error fetching note by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/notes
const createNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, content } = req.body;

    const existingNote = await Note.findOne({ title, user: userId });
    if (existingNote) {
      return res.status(409).json({
        message:
          'This note already exists, please use diferent TITLE to create a new note.',
      });
    }

    const newNote = await Note.create({
      title: title,
      content: content,
      user: userId,
    });

    res
      .status(201)
      .json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Internal s Error' });
  }
};

// PUT /api/notes/:id
const updateNoteById = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;
    const { title, content } = req.body;

    const noteExistOrNot = await Note.findOne({ _id: noteId });

    if (!noteExistOrNot) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title, content },
      { new: true }
    );

    res
      .status(200)
      .json({ message: 'Note updated successfully', note: updatedNote });
  } catch (error) {
    console.error('Error updating note by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE /api/notes/:id
const deleteNoteById = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      user: userId,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res
      .status(200)
      .json({ message: 'Note deleted successfully', note: deletedNote });
  } catch (error) {
    console.error('Error deleting note by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const shareNoteWithUser = async (req, res) => {
  const userId = req.user._id;
  const noteId = req.params.id;
  const { sharedWith } = req.body;

  try {
    // Find the note by ID
    const note = await Note.findById(noteId);

    // Check if the note exists
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    console.log(note, userId);

    // Check if the authenticated user is the owner of the note
    if (note.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to share this note' });
    }

    if (note.user.toString() == sharedWith.toString()) {
      return res
        .status(400)
        .json({ error: 'You cannot share the note with yourself.' });
    }

    // Find the user to share the note with
    const userToShareWith = await User.findById(sharedWith);

    // Check if the user to share with exists
    if (!userToShareWith) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the user ID to the note's sharedWith array
    note.sharedWith.push(userToShareWith._id);

    // Save the updated note
    await note.save();

    // Respond with a success message
    res.json({ message: 'Note shared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  getSearchQuery,
  createNote,
  updateNoteById,
  deleteNoteById,
  shareNoteWithUser,
};
