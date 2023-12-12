import { Request } from 'express';
import IBookUseCaseResponse from './IBookUseCaseResponse';
import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';

/**
 * Represents the interface for the delete book command.
 */
export default interface IDeleteBookCommand {
  readonly bookRepository: IBookRepository;

  /**
   * Executes the delete book command.
   * @param req - The request object.
   * @returns A promise that resolves to the book use case response.
   */
  execute(req: Request): Promise<IBookUseCaseResponse>
}
