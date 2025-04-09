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
