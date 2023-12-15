import { Request } from 'express';
import DeleteImg from '../../../utils/DeleteImg';
import IDeleteBookCommand from '../../Interfaces/Book/Usecase/IDeleteBookCommand';
import IBookRepository from '../../../repositories/Interfaces/IBookRepository';

export default class DeleteBookCommand implements IDeleteBookCommand {
  readonly bookRepository: IBookRepository;

  constructor(deleteBook: IBookRepository) {
    this.bookRepository = deleteBook;
  }

  async execute(req: Request): Promise<String | Error> {
    const bookId = req.params.id;

    const book = await this.bookRepository.getBookById(bookId);

    if (!book) {
      return Promise.resolve(new Error('Book not found'));
    }

    const deleted = await this.bookRepository.deleteBook(bookId);

    if (!deleted) {
      return Promise.resolve(new Error('Error while deleting book'));
    }

    DeleteImg(book);

    return Promise.resolve('Book deleted successfully');
  }
}
