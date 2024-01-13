// routes/pdfSlideRoutes.js

const express = require('express');
const multer = require('multer');
const pdfSlideController = require('../Controllers/pdfSlideController')

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Route for creating a PDF/Slide
router.post('/pdf-slides', upload.single('file'), pdfSlideController.createPdfSlide);
router.get('/pdfs',pdfSlideController.getAllPDFs);
router.delete('/delete/:id', pdfSlideController.deletePdfSlideById);

module.exports = router;
