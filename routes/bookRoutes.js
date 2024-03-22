const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const Book = require('../models/book');

// Маршрут для отримання списку книг
router.get('api/', bookController.getAllBooks);

// Маршрут для отримання конкретної книги
router.get('api/:id', bookController.getBookById);

router.delete('/:id', bookController.deleteBookById);

// Маршрут для показу сторінки зі списком книг
router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); // Отримання всіх книг з бази даних
        res.render('listBooks', { books }); // Передача книг у шаблон EJS для відображення
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Маршрут для відображення форми створення нової книги
router.get('/create', (req, res) => {
    res.render('createBook'); // Відображення шаблону EJS для створення книги
});

// Маршрут для обробки створення нової книги
router.post('/create', bookController.createBook);


module.exports = router;
