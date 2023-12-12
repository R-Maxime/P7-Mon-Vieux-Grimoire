import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from '../../Interfaces/Book/Usecase/IBookUseCaseResponse';
import IGetBookBestRatingQuery from '../../Interfaces/Book/Usecase/IGetBookBestRatingQuery';

export default class GetBookBestRatingQuery implements IGetBookBestRatingQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(): Promise<IBookUseCaseResponse> {
    const books = await this.bookRepository.getBookBestRating();

    if (!books) {
      return {
        status: 500,
        message: 'Error while retrieving books',
      };
    }

    return {
      status: 200,
      datas: books,
    };
  }
}
