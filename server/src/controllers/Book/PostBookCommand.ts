import { IBook } from '../../models/Book';
import { IBookRepository } from '../../repositories/IBookRepository';

export default class PostBookCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookObject: IBook) {
    const book = await this.bookRepository.createBook(bookObject);

    if (!book) {
      return {
        status: 500,
        message: 'Error while creating book',
      };
    }

    return {
      status: 201,
      message: 'Book created',
    };
  }
}
