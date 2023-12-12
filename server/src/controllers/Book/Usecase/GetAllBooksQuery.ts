import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from '../../Interfaces/Book/Usecase/IBookUseCaseResponse';
import IGetAllBooksQuery from '../../Interfaces/Book/Usecase/IGetAllBooksQuery';

export default class GetAllBooksQuery implements IGetAllBooksQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(): Promise<IBookUseCaseResponse> {
    const books = await this.bookRepository.getBooks();

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
