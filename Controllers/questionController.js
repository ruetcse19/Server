const Question = require('../db/Question');

const postQuestion = async (req, res) => {
    try {
        const { title, department, course, series, description } = req.body;

        // Create a new question
        const newQuestion = new Question({
            title,
            department,
            course,
            series,
            description,
        });

        // Save the question to the database
        const savedQuestion = await newQuestion.save();

        res.status(201).json({ success: true, question: savedQuestion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
const getAllQuestions = async (req, res) => {
    try {
        // Retrieve all questions from the database
        const questions = await Question.find();

        res.status(200).json({ success: true, questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
module.exports = {
    postQuestion,
    getAllQuestions
};