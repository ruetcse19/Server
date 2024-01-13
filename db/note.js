const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  handnoteBy: { type: String, required: true },
  description: { type: String, required: true },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
