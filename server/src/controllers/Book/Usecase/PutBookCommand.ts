import IBookRepository, { MongoIBookRepository } from '../../../repositories/Interfaces/IBookRepository';
import DeleteImg from '../../../utils/DeleteImg';
import IPutBookCommand from '../../Interfaces/Book/Usecase/IPutBookCommand';

export default class PutBookCommand implements IPutBookCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookObject: MongoIBookRepository, toDelete: boolean): Promise<String | Error> {
    const book = await this.bookRepository.updateBook(bookObject);

    if (!book) {
      return Promise.reject(new Error('Book not updated'));
    }

    if (toDelete) {
      DeleteImg(book);
    }

    return Promise.resolve('Book updated successfully');
  }
}
