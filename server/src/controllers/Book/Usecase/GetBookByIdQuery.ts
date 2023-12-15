import { IBook } from '../../../models/Book';
import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IGetBookByIdQuery from '../../Interfaces/Book/Usecase/IGetBookByIdQuery';

export default class GetBookByIdQuery implements IGetBookByIdQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(id: string): Promise<IBook | Error> {
    const book = await this.bookRepository.getBookById(id);

    if (!book) {
      return Promise.reject(new Error('Book not found'));
    }

    return Promise.resolve(book);
  }
}
