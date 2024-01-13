const PdfSlide = require('../db/PdfSlide');

const createPdfSlide = async (req, res) => {
    try {
      const { title, department, teacher, course, resourceType, description } = req.body;
  
      // Create a new PdfSlide instance without file-related code
      const newPdfSlide = new PdfSlide({
        title,
        department,
        teacher,
        course,
        resourceType,
        description,
      });
  
      // Save the PdfSlide to the database
      const savedPdfSlide = await newPdfSlide.save();
  
      res.json({
        message: 'PDF/Slide successfully created!',
        pdfSlide: savedPdfSlide,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  };

  const getAllPDFs = async (req, res) => {
    try {
      // Fetch all PDFs from the database
      const pdfs = await PdfSlide.find();
  
      res.json({
        pdfs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  };
  
const deletePdfSlideById = async (req, res) => {
  try {
    const pdfSlideId = req.params.id;

    // Check if the PDF/Slide with the given ID exists
    const existingPdfSlide = await PdfSlide.findById(pdfSlideId);
    if (!existingPdfSlide) {
      return res.status(404).json({ error: 'PDF/Slide not found' });
    }

    // Delete the PDF/Slide from the database
    await existingPdfSlide.remove();

    res.json({
      message: 'PDF/Slide successfully deleted!',
      pdfSlide: existingPdfSlide,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};
module.exports = {
  createPdfSlide,
  getAllPDFs,
  deletePdfSlideById
};
