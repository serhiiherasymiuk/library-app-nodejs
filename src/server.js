const express = require('express');
const mongoose = require('./db');
import bookRoutes from './routes/bookRoutes';
const ejs = require('ejs');
const multer = require('multer');

const app = express();
app.set('view engine', 'ejs');

const upload = multer();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/books', bookRoutes);
app.use(upload.none());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
