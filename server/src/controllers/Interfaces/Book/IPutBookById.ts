import { Request, Response } from 'express';
import GetBookByIdQuery from '../../Book/Usecase/GetBookByIdQuery';
import PutBookCommand from '../../Book/Usecase/PutBookCommand';

/**
 * Represents the interface for updating a book by its ID.
 */
export default interface IPutBookById {
  getByIdQuery: GetBookByIdQuery;

  putBookCommand: PutBookCommand;

  /**
   * Executes the update book operation.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response object.
   */
  execute(req: Request, res: Response): Promise<Response>;
}
