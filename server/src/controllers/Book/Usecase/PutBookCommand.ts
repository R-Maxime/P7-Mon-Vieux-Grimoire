import { IBook } from '../../../models/Book';
import { IBookRepository } from '../../../repositories/IBookRepository';
import DeleteImg from '../../../utils/DeleteImg';

export default class PutBookCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookObject: IBook, toDelete: boolean) {
    const book = await this.bookRepository.updateBook(bookObject);

    if (!book) {
      return {
        status: 500,
        message: 'Error while updating book',
      };
    }

    if (toDelete) {
      DeleteImg(book);
    }

    return {
      status: 201,
      message: 'Book updated',
    };
  }
}
