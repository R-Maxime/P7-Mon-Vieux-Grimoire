import { IBookRepository } from '../../repositories/IBookRepository';

export default class GetBookByIdQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(id: string) {
    const book = await this.bookRepository.getBookById(id);

    if (!book) {
      return {
        status: 404,
        message: 'Book not found',
      };
    }

    return {
      status: 200,
      data: book,
    };
  }
}
