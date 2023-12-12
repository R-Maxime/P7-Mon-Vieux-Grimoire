import { Request } from 'express';
import DeleteImg from '../../../utils/DeleteImg';
import IBookUseCaseResponse from '../../Interfaces/Book/Usecase/IBookUseCaseResponse';
import IDeleteBookCommand from '../../Interfaces/Book/Usecase/IDeleteBookCommand';
import IBookRepository from '../../../repositories/Interfaces/IBookRepository';

export default class DeleteBookCommand implements IDeleteBookCommand {
  readonly bookRepository: IBookRepository;

  constructor(deleteBook: IBookRepository) {
    this.bookRepository = deleteBook;
  }

  async execute(req: Request): Promise<IBookUseCaseResponse> {
    const bookId = req.params.id;

    const book = await this.bookRepository.getBookById(bookId);

    if (!book) {
      return {
        status: 404,
        message: 'Book not found',
      };
    }

    const deleted = await this.bookRepository.deleteBook(bookId);

    if (!deleted) {
      return {
        status: 500,
        message: 'Error while deleting book',
      };
    }

    DeleteImg(book);

    return {
      status: 200,
      message: 'Book deleted',
    };
  }
}
