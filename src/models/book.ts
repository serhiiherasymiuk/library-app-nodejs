import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
}

const bookSchema: Schema<IBook> = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
});

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export default Book;
