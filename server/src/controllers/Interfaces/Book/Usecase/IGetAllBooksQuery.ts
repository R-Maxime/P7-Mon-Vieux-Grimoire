import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from './IBookUseCaseResponse';

/**
 * Represents the interface for the query to get all books.
 */
export default interface IGetAllBooksQuery {
  bookRepository: IBookRepository;

  /**
   * Executes the query to get all books.
   * @returns A promise that resolves to an instance of IBookUseCaseResponse.
   */
  execute(): Promise<IBookUseCaseResponse>;
}
