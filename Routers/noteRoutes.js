const express = require('express');
const router = express.Router();
const noteController = require('../Controllers/noteController');

// POST a new handnote
router.post('/post-note', noteController.postNote);
router.get('/get-all-notes', noteController.getAllNotes);

module.exports = router;
