import { IBookRepository } from '../../../repositories/IBookRepository';

export default class GetBookBestRatingQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute() {
    const books = await this.bookRepository.getBookBestRating();

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
