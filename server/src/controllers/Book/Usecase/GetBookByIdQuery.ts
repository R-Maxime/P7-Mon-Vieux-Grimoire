import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from '../../Interfaces/Book/Usecase/IBookUseCaseResponse';
import IGetBookByIdQuery from '../../Interfaces/Book/Usecase/IGetBookByIdQuery';

export default class GetBookByIdQuery implements IGetBookByIdQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(id: string): Promise<IBookUseCaseResponse> {
    const book = await this.bookRepository.getBookById(id);

    if (!book) {
      return {
        status: 404,
        message: 'Book not found',
      };
    }

    return {
      status: 200,
      data: book,
    };
  }
}
