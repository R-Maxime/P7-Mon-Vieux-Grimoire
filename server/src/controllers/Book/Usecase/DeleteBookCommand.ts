import { Request } from 'express';
import { IBookRepository } from '../../../repositories/IBookRepository';
import DeleteImg from '../../../utils/DeleteImg';

export default class DeleteBookCommand {
  private readonly bookRepository: IBookRepository;

  constructor(deleteBook: IBookRepository) {
    this.bookRepository = deleteBook;
  }

  async execute(req: Request) {
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
