import { IBook, MongoIBookModel } from '../models/Book';
import IBookRepository, { MongoIBookRepository } from './Interfaces/IBookRepository';

export default class MongoDBBookRepository implements IBookRepository {
  readonly bookRepository: typeof MongoIBookModel;

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

  public async getBookBestRating(): Promise<IBook[]> {
    return this.bookRepository.find()
      .sort({ averageRating: -1 })
      .limit(3);
  }

  public async updateBook(bookObject: MongoIBookRepository): Promise<IBook | null> {
    return this.bookRepository.findByIdAndUpdate(bookObject._id, bookObject);
  }
}
