const Book = require('../models/book');

// Контролер для отримання всіх книг
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(); // Отримання всіх книг з бази даних
        res.render('listBooks', { books }); // Передача книг у шаблон EJS для відображення
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Контролер для отримання книги за ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book === null) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.render('bookDetails', { book }); // Відображення шаблону EJS з даними про конкретну книгу
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body; // Отримати дані про книгу з запиту
        console.log(req.body)
        const newBook = new Book({ title, author, genre }); // Створити новий об'єкт книги
        const savedBook = await newBook.save(); // Зберегти книгу в базі даних
        res.redirect('/books'); // Перенаправити користувача на сторінку з усіма книгами
    } catch (error) {
        res.status(400).json({ message: error.message }); // Повернути помилку, якщо сталася помилка при створенні книги
    }
};

const deleteBookById = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.redirect('/books');
        res.status(204).end(); // Повертаємо успішний статус без тіла відповіді
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    deleteBookById,
};
