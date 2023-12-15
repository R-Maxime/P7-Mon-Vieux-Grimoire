import { IBook } from '../../../models/Book';
import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IGetAllBooksQuery from '../../Interfaces/Book/Usecase/IGetAllBooksQuery';

export default class GetAllBooksQuery implements IGetAllBooksQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(): Promise<IBook[] | Error> {
    const books = await this.bookRepository.getBooks();

    if (!books) {
      return Promise.reject(new Error('Books not found'));
    }

    return Promise.resolve(books);
  }
}
