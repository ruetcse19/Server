const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: String,
    department: String,
    course: String,
    series: String,
    description: String,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
