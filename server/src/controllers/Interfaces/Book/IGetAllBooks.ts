import { Request, Response } from 'express';
import GetAllBooksQuery from '../../Book/Usecase/GetAllBooksQuery';

/**
 * Represents the interface for getting all books.
 */
export default interface IGetAllBooks {
  allBooksQuery: GetAllBooksQuery;

  /**
   * Executes the request to get all books.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response object.
   */
  execute(req: Request, res: Response): Promise<Response>;
}
