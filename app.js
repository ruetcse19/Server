const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const projectRoutes = require('./Routers/projectRoutes');
const bookRoutes = require('./Routers/bookRoutes');
const pdfSlideRoutes = require('./Routers/pdfSlideRoutes');
const questionRoutes = require('./Routers/questionRoutes');
const noteRoutes = require('./Routers/noteRoutes');
const userRoutes = require('./Routers/userRoutes');
const app = express();

// middilewares 
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routers

app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/pdfSlides', pdfSlideRoutes);
app.use('/api/v1/question', questionRoutes);
app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/user', userRoutes);

module.exports = app;