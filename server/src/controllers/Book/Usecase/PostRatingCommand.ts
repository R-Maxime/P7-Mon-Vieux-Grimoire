import { IBook } from '../../../models/Book';
import { IBookRepository } from '../../../repositories/IBookRepository';

export default class PostRatingCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(book: IBook) {
    const updated = await this.bookRepository.updateBook(book);

    if (!updated) {
      return {
        status: 500,
        message: 'Error while updating book',
      };
    }

    return {
      status: 201,
      message: 'Book updated',
      data: updated,
    };
  }
}
