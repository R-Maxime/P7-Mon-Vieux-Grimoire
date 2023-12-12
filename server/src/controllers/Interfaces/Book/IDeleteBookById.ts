import { Request, Response } from 'express';
import DeleteBookCommand from '../../Book/Usecase/DeleteBookCommand';

/**
 * Represents the interface for deleting a book by its ID.
 */
export default interface IDeleteBookById {
  deleteBookCommand: DeleteBookCommand;

  /**
   * Executes the delete book operation.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response object.
   */
  execute(req: Request, res: Response): Promise<Response>;
}
