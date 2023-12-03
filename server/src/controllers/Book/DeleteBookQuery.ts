import { Request } from 'express';
import fs from 'fs';
import { IBookRepository } from '../../models/Book';

export default class DeleteBookQuery {
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

    const filename = book.imageUrl.split('/img/')[1];

    if (fs.existsSync(`public/img/${filename}`)) {
      fs.unlinkSync(`public/img/${filename}`);
    }

    const deleted = await this.bookRepository.deleteBook(bookId);

    if (!deleted) {
      return {
        status: 500,
        message: 'Error while deleting book',
      };
    }

    return {
      status: 200,
      message: 'Book deleted',
    };
  }
}
