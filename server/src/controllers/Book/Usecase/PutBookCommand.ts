import { IBook } from '../../../models/Book';
import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import DeleteImg from '../../../utils/DeleteImg';
import IBookUseCaseResponse from '../../Interfaces/Book/Usecase/IBookUseCaseResponse';
import IPutBookCommand from '../../Interfaces/Book/Usecase/IPutBookCommand';

export default class PutBookCommand implements IPutBookCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookObject: IBook, toDelete: boolean): Promise<IBookUseCaseResponse> {
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
