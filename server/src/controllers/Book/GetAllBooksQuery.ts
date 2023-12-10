import { IBookRepository } from '../../repositories/IBookRepository';

export default class GetAllBooksQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute() {
    const books = await this.bookRepository.getBooks();

    if (!books) {
      return {
        status: 500,
        message: 'Error while retrieving books',
      };
    }

    return {
      status: 200,
      data: books,
    };
  }
}
