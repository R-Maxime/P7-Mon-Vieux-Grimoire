import { IBook } from '../../../models/Book';
import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IPostBookCommand from '../../Interfaces/Book/Usecase/IPostBookCommand';

export default class PostBookCommand implements IPostBookCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookObject: IBook, imageUrl: string): Promise<String | Error> {
    const book = await this.bookRepository.createBook({
      ...bookObject,
      imageUrl,
    });

    if (!book) {
      return Promise.reject(new Error('Book not created'));
    }

    return Promise.resolve('Book created successfully');
  }
}
