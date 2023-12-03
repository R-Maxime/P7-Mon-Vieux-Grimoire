import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IBook extends mongoose.Document {
  userId: String, // identifiant MongoDB unique de l'utilisateur qui a créé le livre
  title: String, // titre du livre
  author: String, // auteur du livre
  year: Number, // année de publication du livre
  genre: String, // genre du livre
  imageUrl: String, // illustration/couverture du livre
  ratings: [{
    userId: String // identifiant MongoDB unique de l'utilisateur qui a noté le livre
    grade: Number // note donnée à un livre
  }], // notes données à un livre
  averageRating: Number // note moyenne du livre
}

const bookSchema = new Schema<IBook>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ratings: [{
    userId: { type: String, required: true },
    grade: { type: Number, required: true },
  }],
  averageRating: { type: Number, required: true },
});

bookSchema.plugin(uniqueValidator);
export const MongoIBookModel = mongoose.model<IBook>('Book', bookSchema);

export interface IBookRepository {
  getBooks(): Promise<IBook[]>;
  getBookById(id: string): Promise<IBook | null>;
  saveBook(bookId: string, newBookData: IBook): Promise<IBook | null>;
  deleteBook(bookId: string): Promise<IBook | null>;
  createBook(bookData: IBook): Promise<IBook>;
}

export class MongoDBBookRepository implements IBookRepository {
  private bookRepository: typeof MongoIBookModel;

  constructor() {
    this.bookRepository = MongoIBookModel;
  }

  public async getBooks(): Promise<IBook[]> {
    return this.bookRepository.find();
  }

  public async getBookById(id: string): Promise<IBook | null> {
    return this.bookRepository.findById(id);
  }

  public async saveBook(bookId: string, newBookData: IBook): Promise<IBook | null> {
    return this.bookRepository.findByIdAndUpdate(bookId, newBookData);
  }

  public async deleteBook(bookId: string): Promise<IBook | null> {
    return this.bookRepository.findByIdAndDelete(bookId);
  }

  public async createBook(bookData: IBook): Promise<IBook> {
    return this.bookRepository.create(bookData);
  }
}
