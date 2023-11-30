import { IBookRepository, IBook } from '../../models/Book';

export default class PostBookQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookObject: IBook) {
    const book = await this.bookRepository.createBook(bookObject);

    if (!book) {
      return {
        status: 500,
        message: 'Error while creating book'
      }
    }

    return {
      status: 201,
      message: 'Book created'
    }
  }
}