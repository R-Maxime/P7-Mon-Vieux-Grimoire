import { IBook } from '../../../../models/Book';
import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from './IBookUseCaseResponse';

/**
 * Represents a command to post a rating for a book.
 */
export default interface IPostRatingCommand {
  bookRepository: IBookRepository;

  /**
   * Executes the command to post a rating for a book.
   * @param book - The book to post the rating for.
   * @returns A promise that resolves to the book use case response.
   */
  execute(book: IBook): Promise<IBookUseCaseResponse>;
}
