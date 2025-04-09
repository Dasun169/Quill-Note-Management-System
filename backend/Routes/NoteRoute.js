const express = require("express");
const router = express.Router();

const NoteController = require("../Controllers/NoteController");

router.post("/create", NoteController.createNote);
router.put("/update/:email/:title", NoteController.updateNoteByTitleAndEmail);
router.delete(
  "/delete/:email/:title",
  NoteController.deleteNoteByTitleAndEmail
);

module.exports = router;
