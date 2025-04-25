const mongoose = require("mongoose");
const Note = require("../Model/NoteModel");

// Create a note
exports.createNote = async (req, res) => {
  const { email, title, date, description, categoryType, keyWords } = req.body;

  try {
    const newNote = new Note({
      email,
      title,
      date,
      description,
      categoryType,
      keyWords,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

// Update note using title and email
exports.updateNoteByTitleAndEmail = async (req, res) => {
  const { email, title } = req.params;
  const updatedFields = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { email, title },
      updatedFields,
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};

// Delete note using title and email
exports.deleteNoteByTitleAndEmail = async (req, res) => {
  const { email, title } = req.params;

  try {
    const deletedNote = await Note.findOneAndDelete({ email, title });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

// Get all notes by email
exports.getNotesByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const notes = await Note.find({ email });

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found for this email" });
    }

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

// Delete note using _id
exports.deleteNoteById = async (req, res) => {
  const { id } = req.params;

  // Validate the ID format first
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID format" });
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting note",
      error: error.message,
    });
  }
};

// UPDATE BY ID
exports.updateNoteById = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID format" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, updatedFields, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
};
