import { IBookRepository, IBook } from '../../models/Book';
import DeleteImg from '../../utils/DeleteImg';

export default class PutBookCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookObject: IBook) {
    const book = await this.bookRepository.updateBook(bookObject);

    if (!book) {
      return {
        status: 500,
        message: 'Error while updating book',
      };
    }

    DeleteImg(book);

    return {
      status: 201,
      message: 'Book updated',
    };
  }
}
