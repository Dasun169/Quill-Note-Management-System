const express = require("express");
const router = express.Router();

const NoteController = require("../Controllers/NoteController");

router.post("/create", NoteController.createNote);
router.get("/all", NoteController.getAllNotes);
router.get("/notes/:email", NoteController.getNotesByEmail);
router.put("/update/:email/:title", NoteController.updateNoteByTitleAndEmail);
router.put("/update-by-id/:id", NoteController.updateNoteById);
router.delete(
  "/delete/:email/:title",
  NoteController.deleteNoteByTitleAndEmail
);
router.delete("/delete-by-id/:id", NoteController.deleteNoteById);

module.exports = router;
