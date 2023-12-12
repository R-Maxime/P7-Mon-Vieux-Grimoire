import { IBook } from '../../../models/Book';
import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from '../../Interfaces/Book/Usecase/IBookUseCaseResponse';
import IPostBookCommand from '../../Interfaces/Book/Usecase/IPostBookCommand';

export default class PostBookCommand implements IPostBookCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookObject: IBook): Promise<IBookUseCaseResponse> {
    const book = await this.bookRepository.createBook(bookObject);

    if (!book) {
      return {
        status: 500,
        message: 'Error while creating book',
      };
    }

    return {
      status: 201,
      message: 'Book created',
    };
  }
}
