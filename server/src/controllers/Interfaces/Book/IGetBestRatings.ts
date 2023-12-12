import { Request, Response } from 'express';
import GetBookBestRatingQuery from '../../Book/Usecase/GetBookBestRatingQuery';

/**
 * Represents the interface for getting books with the best ratings.
 */
export default interface IGetBestRatings {
  getBestRatingQuery: GetBookBestRatingQuery;

  /**
   * Executes the request to get books with the best ratings.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response object.
   */
  execute(req: Request, res: Response): Promise<Response>;
}
