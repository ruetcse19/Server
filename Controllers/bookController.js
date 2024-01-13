const Book = require('../db/bookModel');

const createBook = async (req, res) => {
    try {
      const { title, department, author, edition, subject, description } = req.body;
  
      // Assuming 'file' is the name attribute of your file input
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Convert the file buffer to base64
      const fileContentBase64 = file.buffer.toString('base64');
  
      // Create a new book instance with the required fields
      const newBook = new Book({
        title,
        department,
        author,
        edition,
        subject,
        description,
        filePath: 'uploads/' + file.originalname, // Set a default or adjust as needed
        fileContentBase64,
      });
  
      // Save the book to the database
      const savedBook = await newBook.save();
  
      res.json({
        message: 'Book successfully created!',
        book: savedBook,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  };
  
  const getAllBooks = async (req, res) => {
    try {
      // Fetch all books from the database
      const books = await Book.find();
  
      // Return the list of books in the response
      res.json({ books });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deleteBookById = async (req, res) => {
    try {
      const bookId = req.params.id;
  
      // Check if the book with the given ID exists
      const existingBook = await Book.findById(bookId);
      if (!existingBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Delete the book from the database
      await existingBook.remove();
  
      res.json({
        message: 'Book successfully deleted!',
        book: existingBook,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  };
module.exports = { createBook,getAllBooks,deleteBookById };
