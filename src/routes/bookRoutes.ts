import { Request, Response } from 'express';
import * as express from 'express';
import { Router } from 'express';
import bookController from '../controllers/bookController';
import Book from '../models/book';

const router: Router = express.Router();

// Route to get the list of books
router.get('/api/', bookController.getAllBooks);

// Route to get a specific book
router.get('/api/:id', bookController.getBookById);

// Route to delete a book by ID
router.delete('/:id', bookController.deleteBookById);

// Route to display the page with the list of books
router.get('/', async (req: Request, res: Response) => {
    try {
        const books = await Book.find(); // Get all books from the database
        res.render('listBooks', { books }); // Pass books to the EJS template for rendering
    } catch (error: any) { // Explicitly specify the type of error as 'any'
        res.status(500).json({ message: error.message });
    }
});

// Route to display the form for creating a new book
router.get('/create', (req: Request, res: Response) => {
    res.render('createBook'); // Render the EJS template for creating a book
});

// Route to handle creating a new book
router.post('/create', bookController.createBook);

export default router;
