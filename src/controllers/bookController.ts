import { Request, Response } from 'express';
import BookModel, { IBook } from '../models/book'; // Assuming BookModel is the Mongoose model for Book

class BookController {
    // Controller method to get all books
    public async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const books: IBook[] = await BookModel.find(); // Get all books from the database
            res.render('listBooks', { books }); // Pass books to the EJS template for rendering
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Controller method to get a book by ID
    public async getBookById(req: Request, res: Response): Promise<any> {
        try {
            const book: IBook | null = await BookModel.findById(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.render('bookDetails', { book }); // Render the EJS template with data about the specific book
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Controller method to create a new book
    public async createBook(req: Request, res: Response): Promise<void> {
        try {
            const { title, author, genre } = req.body; // Get book data from the request
            const newBook: IBook = new BookModel({ title, author, genre }); // Create a new book object
            const savedBook: IBook = await newBook.save(); // Save the book to the database
            res.redirect('/books'); // Redirect the user to the page with all books
        } catch (error: any) {
            res.status(400).json({ message: error.message }); // Return an error if there was an error creating the book
        }
    }

    // Controller method to delete a book by ID
    public async deleteBookById(req: Request, res: Response): Promise<any> {
        try {
            const book: IBook | null = await BookModel.findByIdAndDelete(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.redirect('/books');
            res.status(204).end(); // Return a successful status with no response body
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new BookController();
