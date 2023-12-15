import { IBook } from '../../../../models/Book';
import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';

/**
 * Represents the interface for the query to get all books.
 */
/**
 * Represents a query to get all books.
 */
export default interface IGetAllBooksQuery {
  bookRepository: IBookRepository;

  /**
   * Executes the query to get all books.
   * @returns A promise that resolves to an array of books or an Error object.
   */
  execute(): Promise<IBook[] | Error>;
}
