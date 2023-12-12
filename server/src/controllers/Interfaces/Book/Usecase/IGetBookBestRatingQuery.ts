import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from './IBookUseCaseResponse';

/**
 * Represents the interface for the query to get books with the best rating.
 */
export default interface IGetBookBestRatingQuery {
  bookRepository: IBookRepository;

  /**
   * Executes the query to get books with the best rating.
   * @returns A promise that resolves to the book use case response.
   */
  execute(): Promise<IBookUseCaseResponse>
}
