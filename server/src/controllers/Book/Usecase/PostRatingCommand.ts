import { IBook } from '../../../models/Book';
import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from '../../Interfaces/Book/Usecase/IBookUseCaseResponse';
import IPostRatingCommand from '../../Interfaces/Book/Usecase/IPostRatingCommand';

export default class PostRatingCommand implements IPostRatingCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(book: IBook): Promise<IBookUseCaseResponse> {
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
