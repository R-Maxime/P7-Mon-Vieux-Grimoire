import { IBook } from '../../../../models/Book';
import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from './IBookUseCaseResponse';

/**
 * Represents a command to post a book.
 */
export default interface IPostBookCommand {
  bookRepository: IBookRepository;
  /**
   * Executes the command to post a book.
   * @param bookObject - The book object to be posted.
   * @returns A promise that resolves to the book use case response.
   */
  execute(bookObject: IBook): Promise<IBookUseCaseResponse>;
}
