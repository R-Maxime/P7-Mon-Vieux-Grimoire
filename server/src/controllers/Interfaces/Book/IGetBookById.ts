import { Request, Response } from 'express';
import GetBookByIdQuery from '../../Book/Usecase/GetBookByIdQuery';

/**
 * Represents the interface for getting a book by its ID.
 */
export default interface IGetBookById {
  getByIdQuery: GetBookByIdQuery;

  /**
   * Executes the request to get a book by its ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response object.
   */
  execute(req: Request, res: Response): Promise<Response>;
}
