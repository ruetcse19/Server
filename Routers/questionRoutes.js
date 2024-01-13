const express = require('express');
const questionController = require('../Controllers/questionController');

const router = express.Router();

// POST a new question
router.post('/questions', questionController.postQuestion);
router.get('/questions', questionController.getAllQuestions);

module.exports = router;
