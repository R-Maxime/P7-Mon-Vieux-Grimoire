import { IBook } from '../../../../models/Book';
import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';

/**
 * Represents a command to update a book.
 */
export default interface IPutBookCommand {
  bookRepository: IBookRepository;

  /**
   * Executes the command to update a book.
   * @param bookObject - The book object to update.
   * @param toDelete - Indicates whether the book should be deleted.
   * @returns A promise that resolves to the updated book use case response.
   */
  execute(bookObject: IBook, toDelete: boolean): Promise<String | Error>;
}
