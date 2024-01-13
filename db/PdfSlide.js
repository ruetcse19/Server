const mongoose = require('mongoose');

const pdfSlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  }
});

const PdfSlide = mongoose.model('PdfSlide', pdfSlideSchema);

module.exports = PdfSlide;
