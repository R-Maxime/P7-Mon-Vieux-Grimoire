import { Request } from 'express';
import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';

/**
 * Represents the interface for the delete book command.
 */
/**
 * Represents a command to delete a book.
 */
export default interface IDeleteBookCommand {
  readonly bookRepository: IBookRepository;

  /**
   * Executes the delete book command.
   * @param req - The request object.
   * @returns A promise that resolves to a string or an error.
   */
  execute(req: Request): Promise<String | Error>;
}
