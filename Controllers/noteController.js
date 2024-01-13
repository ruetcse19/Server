const Note = require('../db/note');

exports.postNote = async (req, res) => {
  try {
    const { title, department, course, handnoteBy, description } = req.body;

    const newNote = new Note({
      title,
      department,
      course,
      handnoteBy,
      description,
    });

    const savedNote = await newNote.save();

    res.json(savedNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllNotes = async (req, res) => {
    try {
      const allNotes = await Note.find();
      res.json(allNotes);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };