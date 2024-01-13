const express = require('express');
const multer = require('multer');
const bookController = require('../Controllers/bookController');

const router = express.Router();
const storage = multer.memoryStorage(); // or use disk storage as needed
const upload = multer({ storage: storage }); // Set the destination folder for file uploads
router.delete('/delete/:id', bookController.deleteBookById);

router.post('/books', upload.single('file'), bookController.createBook);
router.get('/books', bookController.getAllBooks);

module.exports = router;
