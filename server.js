const express = require('express');
const mongoose = require('./db');
const bookRoutes = require('./routes/bookRoutes');
const ejs = require('ejs');
const multer = require('multer');

const app = express();
app.set('view engine', 'ejs'); // Встановлюємо шаблонізатор EJS

// Підключення middleware multer для обробки FormData
const upload = multer();

const methodOverride = require('method-override');

// Додайте цей middleware перед обробкою маршрутів
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Додаткова настройка для розширеної обробки URL-кодованих даних
app.use('/books', bookRoutes);
app.use(upload.none()); // Використання multer для обробки FormData

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
