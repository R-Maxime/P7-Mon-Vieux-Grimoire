import { IBook } from '../../../../models/Book';
import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';

/**
 * Represents the interface for the query to get books with the best rating.
 */
/**
 * Represents a query to get books with the best rating.
 */
export default interface IGetBookBestRatingQuery {
  bookRepository: IBookRepository;

  /**
   * Executes the query and returns a promise that resolves to an array of books or an error.
   * @returns A promise that resolves to an array of books or an error.
   */
  execute(): Promise<IBook[] | Error>;
}
