import { IBook } from '../../../../models/Book';
import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';

/**
 * Represents a command to post a book.
 */
export default interface IPostBookCommand {
  bookRepository: IBookRepository;

  /**
   * Executes the command to post a book.
   * @param bookObject - The book object to be posted.
   * @param imageUrl - The URL of the book's image.
   * @returns A promise that resolves to the response of the book use case.
   */
  execute(bookObject: IBook, imageUrl: string): Promise<String | Error>;
}
