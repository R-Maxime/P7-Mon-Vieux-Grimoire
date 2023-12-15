import { IBook } from '../../../models/Book';
import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IGetBookBestRatingQuery from '../../Interfaces/Book/Usecase/IGetBookBestRatingQuery';

export default class GetBookBestRatingQuery implements IGetBookBestRatingQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(): Promise<IBook[] | Error> {
    const books = await this.bookRepository.getBookBestRating();

    if (!books) {
      return Promise.reject(new Error('Books not found'));
    }

    return Promise.resolve(books);
  }
}
